# ⚠️ DRAFT — PENDING PROFESSIONAL LEGAL REVIEW — DO NOT ROUTE OR DEPLOY

This is an AI-generated first draft of a Spanish translation of `/privacy`, produced per an
explicit decision (2026-09-01) to get legal pages professionally/reviewed-translated rather than
run through the same AI-translation process used for marketing copy and the blog. **Do not**
create `src/pages/es/privacy.astro` from this content until a qualified reviewer has checked it.
No "this translation is not authoritative, English governs" notice was requested for the eventual
live page — that was asked and declined.

Once reviewed and approved, this becomes `src/pages/es/privacy.astro`, following the exact
structure of `src/pages/privacy.astro` (same `<style>` block, same `.prose-legal` classes) with:
- `title="Política de Privacidad | Stockade"`
- `description="Descubre cómo Stockade gestiona tus datos. No recopilamos información personal — todo el estado de la simulación se guarda localmente en tu navegador."`
- Add `PRIVACY_ALTERNATES = { en: '/privacy/', es: '/es/privacy/' }` to `src/i18n/alternates.ts` and its `REGISTRY` (see the checklist in `CLAUDE.md`'s `## i18n` section), and pass it as `alternates` to both this page and the English one.
- "Last updated" date: carry over as-is, or bump if the reviewer edits substance.

---

## Resumen

Stockade ("nosotros" o "nuestro") opera el sitio web stockademarketsim.com (el "Servicio"). Esta
página te informa sobre nuestras políticas respecto a la recopilación, uso y divulgación de datos
personales cuando usas nuestro Servicio. Estamos comprometidos con proteger tu privacidad. En
resumen: **no recopilamos ninguna información de identificación personal** y no tenemos cuentas de
usuario.

## Datos que recopilamos

### No se requiere cuenta

Stockade no requiere registro, inicio de sesión ni dirección de correo electrónico. Puedes usar
todas las funciones de la plataforma sin proporcionarnos ninguna información personal.

### Almacenamiento local (solo del lado del cliente)

El estado de tu simulación de trading — incluyendo el saldo de tu portafolio virtual, el
historial de operaciones, preferencias como el modo claro/oscuro, y otras configuraciones — se
guarda exclusivamente en el `localStorage` de tu navegador. Estos datos nunca salen de tu
dispositivo y nunca se transmiten a nuestros servidores. Puedes borrarlos en cualquier momento
eliminando los datos del sitio en tu navegador.

### Datos de uso

Podemos recopilar datos de uso anonimizados y agregados (como vistas de página y conteo de
sesiones) mediante herramientas estándar de análisis web. Estos datos no pueden usarse para
identificarte y se usan únicamente para entender cómo se usa el Servicio y mejorarlo.

## Servicios de terceros

### Google Fonts

Stockade usa fuentes (Inter y JetBrains Mono) servidas por Google Fonts. Cuando tu navegador
solicita estas fuentes, tu dirección IP se envía a los servidores de Google. Consulta la
[Política de Privacidad de Google](https://policies.google.com/privacy) para más detalles sobre
cómo manejan esos datos.

### Google Analytics

Usamos Google Analytics para entender cómo se usa el Servicio de forma agregada, reportando
métricas anonimizadas como vistas de página y conteo de sesiones. Solo guarda cookies analíticas
si das tu consentimiento. Consulta la
[Política de Privacidad de Google](https://policies.google.com/privacy).

### Google AdSense

Usamos Google AdSense para mostrar publicidad. Las cookies publicitarias se guardan, y se muestran
anuncios personalizados, solo si das tu consentimiento. Consulta la sección
[Publicidad y cookies](#publicidad-y-cookies) más abajo para saber cómo funcionan las cookies
publicitarias y cómo desactivar los anuncios personalizados.

### Google Consent Mode

Comunicamos tu elección de cookies a Google mediante Google Consent Mode. Tu decisión se aplica al
almacenamiento analítico, al almacenamiento publicitario, a la personalización publicitaria y al
uso compartido de datos de usuario para anuncios. Hasta que aceptes, los cuatro están configurados
como denegados.

### Alojamiento

El sitio está alojado en un proveedor externo de alojamiento web. Los registros estándar del
servidor web (dirección IP, tipo de navegador, URL de referencia, marca de tiempo) pueden ser
conservados por el proveedor de alojamiento conforme a su propia política de privacidad.

## Cookies

Las cookies son pequeños archivos de texto que un sitio web guarda en tu dispositivo para recordar
información sobre ti entre visitas. Tecnologías similares — como `localStorage` y los web beacons
— funcionan de forma parecida.

### Uso esencial

Stockade usa el almacenamiento local del navegador para el funcionamiento del propio Servicio: tu
portafolio virtual, historial de operaciones, preferencia de tema y tu elección de consentimiento
de cookies. Estas son estrictamente necesarias para que el sitio funcione como se espera y nunca
se usan para rastrearte en otros sitios web.

### Publicidad y análisis

Stockade también usa cookies para análisis y publicidad. Estas no son esenciales para el
funcionamiento del sitio, así que no se activan a menos que des tu consentimiento. En tu primera
visita verás un banner de consentimiento. Hasta que aceptes, nuestros proveedores de publicidad y
análisis funcionan en un modo restringido en el que no guardan cookies en tu dispositivo, no
construyen un perfil publicitario a partir de tu actividad, y solo muestran anuncios no
personalizados.

### Tu elección

Si rechazas, ese modo restringido permanece vigente de forma permanente: no se guardan cookies de
análisis ni publicidad y no se muestra publicidad personalizada. Aun así podrías ver anuncios no
personalizados, elegidos según el contenido de la página en lugar de tu historial de navegación.

Puedes cambiar de opinión en cualquier momento eliminando los datos del sitio de
stockademarketsim.com en tu navegador, lo que hará que el banner de consentimiento vuelva a
aparecer en tu próxima visita. También puedes bloquear o eliminar cookies desde la configuración
de tu navegador, aunque hacerlo puede afectar el funcionamiento de algunas partes del Servicio.

## Publicidad y cookies {#publicidad-y-cookies}

Este sitio usa proveedores externos, incluyendo Google, para mostrar anuncios basados en las
visitas previas de un usuario a este sitio web o a otros sitios web. El uso de cookies
publicitarias por parte de Google permite que Google y sus socios muestren anuncios basados en tus
visitas a este sitio y/o a otros sitios en internet.

Proveedores externos, incluyendo Google, usan cookies para mostrar anuncios basados en las visitas
previas de un usuario a este sitio web o a otros sitios web. El uso de cookies publicitarias por
parte de Google le permite a Google y a sus socios mostrar anuncios a los usuarios basados en su
visita a este sitio y/o a otros sitios en internet.

Estas cookies permiten a las redes publicitarias reconocer tu navegador o dispositivo entre
visitas, y construir un perfil de tus intereses basado en tu actividad de navegación, con el fin
de mostrarte anuncios más relevantes para ti.

### Cómo desactivar

Los usuarios pueden desactivar la publicidad personalizada visitando la
[Configuración de anuncios de Google](https://adssettings.google.com/). Alternativamente, los
usuarios pueden desactivar el uso de cookies de algunos proveedores externos para publicidad
personalizada visitando [www.aboutads.info](https://www.aboutads.info/choices/) o la
[página de exclusión de Network Advertising Initiative](https://optout.networkadvertising.org/).

### Alcance

Esta Política de Privacidad cubre nuestro propio uso de cookies. No cubre el uso de cookies u
otras tecnologías de rastreo por parte de anunciantes o redes publicitarias externas.

## Privacidad de menores

Nuestro Servicio no está dirigido a personas menores de 13 años. No recopilamos a sabiendas
información de identificación personal de menores de 13 años. Si eres madre, padre o tutor y crees
que tu hijo o hija nos ha proporcionado datos personales, por favor contáctanos.

## Enlaces a otros sitios

Nuestro Servicio puede contener enlaces a sitios web de terceros. No tenemos control ni asumimos
responsabilidad alguna por el contenido, las políticas de privacidad o las prácticas de ningún
sitio o servicio de terceros.

## Cambios a esta política

Podemos actualizar esta Política de Privacidad de vez en cuando. Te notificaremos de cualquier
cambio actualizando la fecha de "Última actualización" en la parte superior de esta página. Te
recomendamos revisar esta página periódicamente.

## Contacto

Si tienes preguntas sobre esta Política de Privacidad, contáctanos en
[hello@stockademarketsim.com](mailto:hello@stockademarketsim.com).
