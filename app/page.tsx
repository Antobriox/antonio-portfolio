export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5]">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#F59E0B]">
          Full Stack Developer
        </p>

        <h1 className="text-5xl font-bold md:text-7xl">
          Antonio Briones
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          Diseño y desarrollo aplicaciones web que combinan rendimiento,
          escalabilidad y una experiencia de usuario intuitiva.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="rounded-full bg-[#DC2626] px-6 py-3 font-medium text-white">
            Ver proyectos
          </button>

          <button className="rounded-full border border-zinc-700 px-6 py-3 font-medium text-white">
            Contactar
          </button>
        </div>
      </section>
    </main>
  );
}