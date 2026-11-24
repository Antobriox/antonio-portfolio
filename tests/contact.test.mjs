import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import test from "node:test";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const valid = { name: "Test User", email: "test@example.com", message: "A synthetic contact message." };

// Compile the real modules in memory. Only external I/O and configuration are replaced.
function harness({ send = async () => ({ data: { id: "test-id" }, error: null }), fetch, configured = true } = {}) {
  const cache = new Map();
  const calls = [];
  function load(path) {
    const filename = resolve(root, path);
    if (cache.has(filename)) return cache.get(filename).exports;
    const loadedModule = { exports: {} };
    cache.set(filename, loadedModule);
    const code = ts.transpileModule(readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    const customRequire = (id) => {
      if (id.startsWith("@/")) return load(`${id.slice(2)}.ts`);
      if (id === "next/server") return { NextResponse: Response };
      if (id === "resend") return { Resend: class {
        emails = { send: async (mail) => { calls.push(mail); return send(mail); } };
      } };
      return require(id);
    };
    vm.runInNewContext(code, {
      module: loadedModule, exports: loadedModule.exports, require: customRequire,
      process: { env: configured ? { RESEND_API_KEY: "synthetic-test-key", CONTACT_TO_EMAIL: "owner@example.com" } : {} },
      TextDecoder, Uint8Array, fetch, AbortSignal,
    }, { filename });
    return loadedModule.exports;
  }
  return { load, calls };
}

function request(body = valid, headers = {}) {
  return new Request("https://portfolio.example/api/contact", {
    method: "POST", headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("only provider acceptance returns success and sends validated content", async () => {
  const { load, calls } = harness();
  const response = await load("app/api/contact/route.ts").POST(request({ ...valid, name: "  Test User  " }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].subject, "Nuevo contacto de Test User");
  assert.equal(calls[0].replyTo, valid.email);
});

test("provider error, missing acceptance id and rejection never report success or leak details", async () => {
  for (const send of [
    async () => ({ data: null, error: { message: "private provider detail" } }),
    async () => ({ data: null, error: null }),
    async () => { throw new Error("private provider detail"); },
  ]) {
    const { POST } = harness({ send }).load("app/api/contact/route.ts");
    const response = await POST(request());
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { error: "Unable to send message" });
  }
});

test("missing configuration returns generic 503 without calling provider", async () => {
  const { load, calls } = harness({ configured: false });
  const response = await load("app/api/contact/route.ts").POST(request());
  assert.equal(response.status, 503);
  assert.equal(calls.length, 0);
  assert.doesNotMatch(await response.text(), /RESEND_API_KEY/);
});

test("invalid, whitespace-only, overlong and header-injection inputs are rejected before sending", async () => {
  for (const body of ["{", null, { ...valid, name: "   " }, { ...valid, message: "             " },
    { ...valid, email: "invalid" }, { ...valid, name: "x".repeat(101) },
    { ...valid, email: `${"x".repeat(250)}@example.com` },
    { ...valid, message: "x".repeat(5001) }, { ...valid, name: "Test\r\nBcc: victim" }]) {
    const { load, calls } = harness();
    assert.equal((await load("app/api/contact/route.ts").POST(request(body))).status, 400);
    assert.equal(calls.length, 0);
  }
});

test("body byte limit rejects missing or dishonest Content-Length and oversized declared length", async () => {
  for (const headers of [{}, { "Content-Length": "2" }, { "Content-Length": "40000" }]) {
    const { load, calls } = harness();
    assert.equal((await load("app/api/contact/route.ts").POST(request("x".repeat(32769), headers))).status, 413);
    assert.equal(calls.length, 0);
  }
});

test("rejects non-JSON content type", async () => {
  const { load, calls } = harness();
  assert.equal((await load("app/api/contact/route.ts").POST(request(valid, { "Content-Type": "text/plain" }))).status, 415);
  assert.equal(calls.length, 0);
});

test("global budget stops concurrent sends and cannot be bypassed with spoofed IP headers", async () => {
  const { load, calls } = harness();
  const { POST } = load("app/api/contact/route.ts");
  const responses = await Promise.all(Array.from({ length: 12 }, (_, index) => POST(request(valid, {
    "X-Forwarded-For": `192.0.2.${index}`, "X-Real-IP": `192.0.2.${index}`,
  }))));
  assert.equal(calls.length, 10);
  assert.equal(responses.filter((r) => r.status === 200).length, 10);
  for (const response of responses.slice(10)) {
    assert.equal(response.status, 429);
    assert.ok(Number(response.headers.get("Retry-After")) > 0);
  }
});

test("budget resets after window expires", () => {
  const budget = harness().load("lib/contact-server.ts").createContactBudget();
  for (let count = 0; count < 10; count++) assert.equal(budget(1000), 0);
  assert.equal(budget(1000), 600);
  assert.equal(budget(601000), 0);
});

test("browser submission handles offline, timeout, HTTP failure and malformed acknowledgements", async () => {
  for (const fetch of [
    async () => { throw new TypeError("Offline"); },
    async () => { throw new DOMException("Timed out", "TimeoutError"); },
    async () => new Response("{}", { status: 502 }),
    async () => new Response("{}", { status: 429 }),
    async () => new Response("not JSON"),
    async () => Response.json({ ok: false }),
    async () => Response.json({}),
  ]) assert.equal(await harness({ fetch }).load("lib/contact.ts").submitContact(valid), false);
  assert.equal(await harness({ fetch: async () => Response.json({ ok: true }) }).load("lib/contact.ts").submitContact(valid), true);
});
