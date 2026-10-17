# Correcciones de revisión — 2026-10-13

## Requirements

Autorización: Antonio solicitó «arregla todo» después de la revisión de cinco hallazgos. Raíz efectiva: `Projects/PortafolioWEB/antonio-portfolio`. Alcance: código de contacto, navegación, movimiento y pruebas relacionadas. Sin publicación ni cambios de credenciales.

- R1: responder éxito únicamente cuando el proveedor acepte el mensaje; conservar formulario ante fallos.
- R2: navegar a secciones mediante teclado con enlaces nativos y foco visible.
- R3: informar fallos de red sin perder los datos introducidos.
- R4: acotar tamaño y frecuencia de solicitudes; documentar límites del control local.
- R5: respetar movimiento reducido, incluido cambio de preferencia durante la sesión, conservando la experiencia animada habitual.

## Design

Mantener Next.js y las dependencias existentes. Validar la respuesta de Resend y capturar errores en ambos extremos. Limitar lectura del cuerpo antes de parsearlo y aplicar un presupuesto local de envíos sin confiar en cabeceras IP arbitrarias. Los límites de memoria no equivalen a protección distribuida.

Usar enlaces hash nativos y adaptar cada motor de movimiento a la preferencia del sistema. Separar validación automática, inspección estática y verificación real en navegador.

## Tasks

| ID | Resultado | Responsable / área | Validación | Estado |
|---|---|---|---|---|
| T1 | R1, R3 y R4 | Especialista contacto: API, formulario y pruebas | Proveedor simulado, entradas y límites, red fallida | Completada |
| T2 | R2 y R5 | Especialista interfaz: navegación y animaciones | Tipos, lint y navegador | Completada |
| T3 | Integración y evidencia | Principal: revisión, documentación y comprobaciones | Regresiones, build y diff | Completada |

## Verification

Verificado el 2026-10-17 en Windows, Node 26.2.0 y Next.js 16.2.7:

| Criterio | Evidencia | Resultado |
|---|---|---|
| R1, R3, R4 | `node --test tests/contact.test.mjs`; nueve casos con proveedor y red simulados | Pasa |
| R2 | Edge local: Tab alcanza el enlace principal, Enter navega a `#contacto`; Escape cierra menú móvil y restaura foco | Pasa |
| R5 | Edge local: con movimiento reducido no aparece Canvas y el scroll es inmediato; cambiar la preferencia monta y desmonta Canvas | Pasa |
| Responsive focalizado | Edge local a 390 × 844: menú operativo y sin desbordamiento horizontal | Pasa |
| Integración | `npm run lint`, `node node_modules/typescript/bin/tsc --noEmit --incremental false`, `npm run build`, `git diff --check` | Pasa |

La prueba en Edge se realizó contra la build local y datos sintéticos. No se enviaron correos reales. No se verificó lector de pantalla, contraste cuantitativo, zoom/reflow completo ni entrega final del correo en producción. La aceptación del proveedor no demuestra recepción. El presupuesto de envíos en memoria no cubre varias instancias; para producción se necesitan límites en plataforma/proveedor como describe [[Projects/PortafolioWEB/antonio-portfolio/docs/contact-security|Contacto: controles y verificación]].
