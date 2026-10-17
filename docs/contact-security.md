# Contacto: controles y verificación

Autorización: petición «arregla todo» del 2026-10-13, sobre los hallazgos de la revisión del formulario. Riesgo medio: endpoint público que procesa datos de contacto y consume un proveedor de correo.

Requisitos y diseño: solo confirmar éxito cuando Resend devuelve un identificador sin error; conservar el formulario ante errores de red, tiempo de espera y proveedor; validar en cliente y servidor; acotar consumo sin servicios nuevos. La aceptación por Resend no garantiza entrega en la bandeja del destinatario.

- Nombre: 2–100 caracteres, sin saltos de línea; correo válido: hasta 254; mensaje: 12–5000. Nombre y mensaje se recortan antes de validar.
- Solo JSON y máximo 32 KiB medidos durante lectura, también sin `Content-Length` o con una longitud falsa. No se registra contenido ni respuestas privadas del proveedor.
- Presupuesto compartido de 10 solicitudes JSON por 10 minutos **por proceso**, incluidas solicitudes inválidas y envíos fallidos. Responde 429 y `Retry-After`. No utiliza cabeceras IP manipulables ni almacena direcciones personales.
- El navegador espera como máximo 15 segundos; ante fallo conserva los campos y anuncia el error. Una interrupción después de que el proveedor acepte el mensaje puede dejar el resultado incierto; reintentar puede duplicarlo.

Configuración existente: `RESEND_API_KEY` y opcionalmente `CONTACT_TO_EMAIL`. No se leyeron ni modificaron secretos. El remitente sigue siendo `Portfolio <onboarding@resend.dev>`; las restricciones del remitente de prueba de Resend siguen aplicando.

Límite residual: el presupuesto de memoria se reinicia al reiniciar el proceso y se multiplica con cada instancia serverless. Un atacante puede agotar la ventana compartida y afectar a visitantes legítimos. Es una protección local contra consumo ilimitado, no un control distribuido de identidad, un CAPTCHA ni protección DDoS. Antes de producción con varias instancias, el responsable del alojamiento debe aplicar cuotas persistentes/rate limiting en la plataforma y límites de consumo del proveedor; requiere conocer el despliegue. El proxy también debe limitar tiempo de lectura y tamaño de peticiones. Revisar estos controles al preparar despliegue.

Regresión reproducible sin red, secretos reales ni correo: `node --test tests/contact.test.mjs`. Cubre aceptación, errores y excepciones del proveedor, configuración ausente, validación, cuerpos excesivos, tipo de contenido, concurrencia, cabeceras IP falsas, expiración del presupuesto y respuestas/red del cliente. El runner transpila los módulos reales en memoria y sustituye únicamente configuración y fronteras de E/S. La comprobación de lector de pantalla y entrega real requiere validación separada.
