# Stockade — Spanish Legal Pages, Reviewer Packet

**Status: draft, pending professional legal review. Not live anywhere on the site.**

This packet contains AI-generated first-draft Spanish translations of Stockade's three legal
pages — Privacy Policy, Terms of Service, and Disclaimer — combined into one document for handoff
to a reviewer. Please read this section before the translations themselves.

## Context for the reviewer

- **Why AI-drafted, and why review at all.** Stockade's marketing and blog content is translated
  by AI and published directly. Legal pages were deliberately routed through a different process:
  drafted by AI for a head start, but held for professional review before anything goes live, given
  the liability exposure of legal text. That is the review this packet is requesting.
- **Source of truth.** Each translation was produced directly from the live English page
  (`/privacy`, `/terms`, `/disclaimer` on stockademarketsim.com) at the time of drafting
  (2026-09-01). If the English pages have changed since, please flag that — the translation should
  track whichever English text is authoritative at review time.
- **No "this translation is not authoritative" notice.** The site's owner was asked whether the
  live Spanish legal pages should carry a notice that the English version governs in case of
  conflict, and explicitly declined one. Please raise it again if, on reviewing the substance, you
  think that decision should be revisited.
- **Voice and terminology.** The site uses plural editorial "we" ("nosotros"/"nuestro") throughout,
  including on legal pages, and keeps a handful of English trading/technical terms as loanwords
  elsewhere on the site (e.g. "stop-loss," "slippage," "drawdown") — none of those appear in the
  legal pages themselves, but flagging the convention in case it affects word choice elsewhere.
- **What happens after approval.** Once approved (with whatever edits the review produces), each
  section below becomes its own page at `src/pages/es/{privacy,terms,disclaimer}.astro`, mirroring
  the structure of the existing English `.astro` files. The exact title/description/meta values and
  routing steps are noted at the start of each section below, for whoever implements it — that part
  needs no legal input, just a record of what's already decided.
- **Scope of this review.** Please review for legal accuracy and adequacy in Spanish (and for the
  target jurisdiction(s), if that affects wording), not for translation style — stylistic
  consistency with the rest of the site was handled separately.

Three documents follow: [Privacy Policy](#política-de-privacidad), [Terms of Service](#términos-de-servicio),
and [Disclaimer](#descargo-de-responsabilidad).

---

## Política de Privacidad

**Implementation, once approved** — becomes `src/pages/es/privacy.astro`, mirroring
`src/pages/privacy.astro`'s structure (same `<style>` block, same `.prose-legal` classes):
- `title="Política de Privacidad | Stockade"`
- `description="Descubre cómo Stockade gestiona tus datos. No recopilamos información personal — todo el estado de la simulación se guarda localmente en tu navegador."`
- Add `PRIVACY_ALTERNATES = { en: '/privacy/', es: '/es/privacy/' }` to `src/i18n/alternates.ts` and its `REGISTRY` (see the checklist in `CLAUDE.md`'s `## i18n` section), and pass it as `alternates` to both this page and the English one.
- "Last updated" date: carry over as-is, or bump if the reviewer edits substance.

### Resumen

Stockade ("nosotros" o "nuestro") opera el sitio web stockademarketsim.com (el "Servicio"). Esta
página te informa sobre nuestras políticas respecto a la recopilación, uso y divulgación de datos
personales cuando usas nuestro Servicio. Estamos comprometidos con proteger tu privacidad. En
resumen: **no recopilamos ninguna información de identificación personal** y no tenemos cuentas de
usuario.

### Datos que recopilamos

#### No se requiere cuenta

Stockade no requiere registro, inicio de sesión ni dirección de correo electrónico. Puedes usar
todas las funciones de la plataforma sin proporcionarnos ninguna información personal.

#### Almacenamiento local (solo del lado del cliente)

El estado de tu simulación de trading — incluyendo el saldo de tu portafolio virtual, el
historial de operaciones, preferencias como el modo claro/oscuro, y otras configuraciones — se
guarda exclusivamente en el `localStorage` de tu navegador. Estos datos nunca salen de tu
dispositivo y nunca se transmiten a nuestros servidores. Puedes borrarlos en cualquier momento
eliminando los datos del sitio en tu navegador.

#### Datos de uso

Podemos recopilar datos de uso anonimizados y agregados (como vistas de página y conteo de
sesiones) mediante herramientas estándar de análisis web. Estos datos no pueden usarse para
identificarte y se usan únicamente para entender cómo se usa el Servicio y mejorarlo.

### Servicios de terceros

#### Google Fonts

Stockade usa fuentes (Inter y JetBrains Mono) servidas por Google Fonts. Cuando tu navegador
solicita estas fuentes, tu dirección IP se envía a los servidores de Google. Consulta la
[Política de Privacidad de Google](https://policies.google.com/privacy) para más detalles sobre
cómo manejan esos datos.

#### Google Analytics

Usamos Google Analytics para entender cómo se usa el Servicio de forma agregada, reportando
métricas anonimizadas como vistas de página y conteo de sesiones. Solo guarda cookies analíticas
si das tu consentimiento. Consulta la
[Política de Privacidad de Google](https://policies.google.com/privacy).

#### Google AdSense

Usamos Google AdSense para mostrar publicidad. Las cookies publicitarias se guardan, y se muestran
anuncios personalizados, solo si das tu consentimiento. Consulta la sección
[Publicidad y cookies](#publicidad-y-cookies) más abajo para saber cómo funcionan las cookies
publicitarias y cómo desactivar los anuncios personalizados.

#### Google Consent Mode

Comunicamos tu elección de cookies a Google mediante Google Consent Mode. Tu decisión se aplica al
almacenamiento analítico, al almacenamiento publicitario, a la personalización publicitaria y al
uso compartido de datos de usuario para anuncios. Hasta que aceptes, los cuatro están configurados
como denegados.

#### Alojamiento

El sitio está alojado en un proveedor externo de alojamiento web. Los registros estándar del
servidor web (dirección IP, tipo de navegador, URL de referencia, marca de tiempo) pueden ser
conservados por el proveedor de alojamiento conforme a su propia política de privacidad.

### Cookies

Las cookies son pequeños archivos de texto que un sitio web guarda en tu dispositivo para recordar
información sobre ti entre visitas. Tecnologías similares — como `localStorage` y los web beacons
— funcionan de forma parecida.

#### Uso esencial

Stockade usa el almacenamiento local del navegador para el funcionamiento del propio Servicio: tu
portafolio virtual, historial de operaciones, preferencia de tema y tu elección de consentimiento
de cookies. Estas son estrictamente necesarias para que el sitio funcione como se espera y nunca
se usan para rastrearte en otros sitios web.

#### Publicidad y análisis

Stockade también usa cookies para análisis y publicidad. Estas no son esenciales para el
funcionamiento del sitio, así que no se activan a menos que des tu consentimiento. En tu primera
visita verás un banner de consentimiento. Hasta que aceptes, nuestros proveedores de publicidad y
análisis funcionan en un modo restringido en el que no guardan cookies en tu dispositivo, no
construyen un perfil publicitario a partir de tu actividad, y solo muestran anuncios no
personalizados.

#### Tu elección

Si rechazas, ese modo restringido permanece vigente de forma permanente: no se guardan cookies de
análisis ni publicidad y no se muestra publicidad personalizada. Aun así podrías ver anuncios no
personalizados, elegidos según el contenido de la página en lugar de tu historial de navegación.

Puedes cambiar de opinión en cualquier momento eliminando los datos del sitio de
stockademarketsim.com en tu navegador, lo que hará que el banner de consentimiento vuelva a
aparecer en tu próxima visita. También puedes bloquear o eliminar cookies desde la configuración
de tu navegador, aunque hacerlo puede afectar el funcionamiento de algunas partes del Servicio.

### Publicidad y cookies {#publicidad-y-cookies}

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

#### Cómo desactivar

Los usuarios pueden desactivar la publicidad personalizada visitando la
[Configuración de anuncios de Google](https://adssettings.google.com/). Alternativamente, los
usuarios pueden desactivar el uso de cookies de algunos proveedores externos para publicidad
personalizada visitando [www.aboutads.info](https://www.aboutads.info/choices/) o la
[página de exclusión de Network Advertising Initiative](https://optout.networkadvertising.org/).

#### Alcance

Esta Política de Privacidad cubre nuestro propio uso de cookies. No cubre el uso de cookies u
otras tecnologías de rastreo por parte de anunciantes o redes publicitarias externas.

### Privacidad de menores

Nuestro Servicio no está dirigido a personas menores de 13 años. No recopilamos a sabiendas
información de identificación personal de menores de 13 años. Si eres madre, padre o tutor y crees
que tu hijo o hija nos ha proporcionado datos personales, por favor contáctanos.

### Enlaces a otros sitios

Nuestro Servicio puede contener enlaces a sitios web de terceros. No tenemos control ni asumimos
responsabilidad alguna por el contenido, las políticas de privacidad o las prácticas de ningún
sitio o servicio de terceros.

### Cambios a esta política

Podemos actualizar esta Política de Privacidad de vez en cuando. Te notificaremos de cualquier
cambio actualizando la fecha de "Última actualización" en la parte superior de esta página. Te
recomendamos revisar esta página periódicamente.

### Contacto

Si tienes preguntas sobre esta Política de Privacidad, contáctanos en
[hello@stockademarketsim.com](mailto:hello@stockademarketsim.com).

---

## Términos de Servicio

**Implementation, once approved** — becomes `src/pages/es/terms.astro`, mirroring
`src/pages/terms.astro`'s structure:
- `title="Términos de Servicio | Stockade"`
- `description="Lee los Términos de Servicio de Stockade. Al usar nuestro simulador de trading gratuito, aceptas estos términos. Sin dinero real, sin asesoría financiera."`
- Add a `TERMS_ALTERNATES` entry to `src/i18n/alternates.ts` + its `REGISTRY`, same pattern as above.

### Aceptación de los términos

Al acceder o usar Stockade ("el Servicio") en stockademarketsim.com, aceptas quedar sujeto a
estos Términos de Servicio. Si no estás de acuerdo con alguna parte de estos términos, no debes
usar el Servicio. Nos reservamos el derecho de actualizar estos términos en cualquier momento; el
uso continuado del Servicio después de los cambios constituye la aceptación de los términos
revisados.

### Descripción del servicio

Stockade es un **simulador de trading de acciones y criptomonedas gratuito, basado en el
navegador**. El Servicio está destinado únicamente a fines educativos y de entretenimiento. Todas
las operaciones en Stockade se realizan con dinero virtual y simulado, sin valor monetario real.
Ningún activo, moneda o instrumento financiero real se compra, vende o transfiere a través del
Servicio.

Stockade no requiere registro y puede usarse de inmediato por cualquier persona con un navegador
web compatible. Los datos de tu simulación se guardan localmente en tu navegador y no se
almacenan en nuestros servidores.

### No es asesoría financiera

**Nada en Stockade constituye asesoría financiera, de inversión, legal o fiscal.** El Servicio
está diseñado únicamente para ayudar a los usuarios a aprender sobre la mecánica del trading en un
entorno simulado sin riesgo. Cualquier estrategia, técnica o resultado observado dentro del
simulador no representa un consejo para operar en mercados financieros reales, y el rendimiento
simulado pasado no es indicativo de resultados reales futuros.

Debes consultar a un asesor financiero autorizado antes de tomar cualquier decisión de inversión
real.

### Uso permitido

Puedes usar el Servicio para fines lícitos, personales y no comerciales. Aceptas no:

- Usar el Servicio para ningún propósito ilícito o en violación de leyes aplicables.
- Intentar realizar ingeniería inversa, extraer datos mediante scraping o extraer sistemáticamente
  datos del Servicio.
- Introducir malware, virus o cualquier código malicioso en el Servicio.
- Presentar resultados simulados como rendimiento real de trading con fines de lucro comercial o
  para engañar a otros.
- Usar bots o scripts automatizados para interactuar con el Servicio de una forma que interrumpa
  su funcionamiento normal.

### Moneda virtual

El saldo virtual (con un inicio equivalente a $100,000 USD) provisto dentro del simulador no
tiene absolutamente ningún valor monetario y no puede retirarse, transferirse, intercambiarse ni
canjearse por dinero real ni por ningún otro activo. Acumular ganancias virtuales dentro de
Stockade no otorga ningún derecho o prestación financiera de ningún tipo.

### Exención de garantías

El Servicio se proporciona **"tal cual"** y **"según disponibilidad"** sin garantías de ningún
tipo, expresas o implícitas, incluyendo entre otras las garantías implícitas de comerciabilidad,
idoneidad para un propósito particular o no infracción. No garantizamos que el Servicio será
ininterrumpido o estará libre de errores.

Los datos de precios simulados usados en Stockade se generan algorítmicamente y no representan
precios reales de mercado. Cualquier parecido con movimientos reales del mercado es coincidencia.

### Limitación de responsabilidad

En la máxima medida permitida por la ley, Stockade y sus operadores no serán responsables por
ningún daño indirecto, incidental, especial, consecuente o punitivo derivado de tu uso, o
imposibilidad de uso, del Servicio — incluyendo entre otros cualquier pérdida financiera incurrida
en mercados reales como resultado de estrategias probadas en el simulador.

### Terminación

Nos reservamos el derecho de suspender o discontinuar el Servicio en cualquier momento, con o sin
previo aviso, por cualquier motivo, incluyendo mantenimiento, actualizaciones o cierre permanente.
Dado que no se almacena ninguna cuenta ni dato personal en nuestros servidores, no hay datos que
eliminar tras la terminación.

### Ley aplicable

Estos Términos se rigen e interpretan de acuerdo con las leyes aplicables, sin dar efecto a sus
disposiciones sobre conflicto de leyes. Cualquier disputa derivada de estos Términos o del
Servicio estará sujeta a la jurisdicción exclusiva de los tribunales competentes en la
jurisdicción aplicable.

### Contacto

Las preguntas sobre estos Términos de Servicio pueden enviarse a
[hello@stockademarketsim.com](mailto:hello@stockademarketsim.com).

---

## Descargo de Responsabilidad

**Implementation, once approved** — becomes `src/pages/es/disclaimer.astro`, mirroring
`src/pages/disclaimer.astro`'s structure, including the highlighted amber notice box from the
English page:
- `title="Descargo de Responsabilidad | Stockade"`
- `description="Stockade es un simulador de trading solo con fines educativos. Todas las operaciones usan dinero virtual. Esto no es asesoría financiera. Lee nuestro descargo completo."`
- Add a `DISCLAIMER_ALTERNATES` entry to `src/i18n/alternates.ts` + its `REGISTRY`, same pattern as above.

**Aviso destacado (banner ámbar en la página original):**

> **Importante:** Stockade es una plataforma de simulación de paper trading. Todas las
> operaciones se realizan únicamente con dinero virtual. Nada en este sitio web constituye
> asesoría financiera. Nunca inviertas dinero real basándote en resultados o estrategias
> observados dentro de un simulador.

### Solo simulación — sin dinero real

Stockade ofrece un entorno de trading simulado que usa **datos de precios ficticios generados
algorítmicamente**. Todos los saldos, ganancias y pérdidas mostrados dentro de la plataforma son
completamente virtuales y no tienen valor monetario. Ningún activo, criptomoneda, par de divisas,
contrato de futuros ni ningún otro instrumento financiero real se compra o vende a través de este
Servicio.

Cualquier ganancia virtual obtenida dentro de Stockade no puede retirarse, convertirse en moneda
real, ni usarse para comprar bienes o servicios.

### No es asesoría financiera

La información, herramientas, estrategias, indicadores y resultados simulados provistos en
Stockade son **únicamente con fines educativos y de entretenimiento**. No constituyen ni deben
interpretarse como:

- Asesoría financiera, de inversión o de trading
- Una recomendación para comprar o vender cualquier instrumento financiero
- Asesoría legal o fiscal
- Un respaldo a cualquier estrategia o enfoque de trading en particular

Busca siempre el consejo de un profesional financiero calificado y autorizado antes de tomar
cualquier decisión real de inversión o trading.

### Rendimiento simulado ≠ resultados reales

Los resultados de trading simulados o hipotéticos tienen limitaciones conocidas. A diferencia del
trading real, los resultados simulados no toman en cuenta factores del mundo real como:

- Liquidez del mercado y slippage
- Comisiones, spreads y tarifas de corretaje
- La presión psicológica de operar con capital real
- Retrasos en la ejecución, ejecuciones parciales y rechazo de órdenes
- Descubrimiento de precios en tiempo real e impacto en el mercado

**El rendimiento simulado pasado no es indicativo de resultados reales futuros.** Una estrategia
que funciona bien en un simulador puede desempeñarse de forma significativamente distinta — o
producir pérdidas — al aplicarse en mercados reales con dinero real.

### Divulgación de riesgos

Operar e invertir en mercados financieros reales implica un **riesgo sustancial de pérdida**,
incluyendo la posible pérdida de todo el capital invertido. Productos apalancados como los
futuros y el forex pueden amplificar tanto las ganancias como las pérdidas y podrían no ser
adecuados para todos los inversionistas.

Debes considerar cuidadosamente tu situación financiera, tu tolerancia al riesgo y tus objetivos
de inversión antes de operar con instrumentos financieros reales. Stockade no acepta ninguna
responsabilidad por pérdidas financieras reales sufridas por usuarios que apliquen en mercados en
vivo estrategias o técnicas practicadas dentro del simulador.

### Exactitud de la información

Aunque nos esforzamos por ofrecer una experiencia de simulación precisa y realista, Stockade no
hace ninguna declaración ni garantía sobre la exactitud, integridad o idoneidad de la información
y los materiales de esta plataforma. Los datos de precios, la mecánica del mercado y el
comportamiento de los activos dentro del simulador son aproximaciones y pueden diferir
sustancialmente de las condiciones reales del mercado.

### Enlaces a terceros

Este sitio web puede contener enlaces a sitios o recursos externos. Stockade no tiene control
sobre el contenido de esos sitios y no acepta responsabilidad alguna por ellos ni por cualquier
pérdida o daño que pueda surgir del uso que hagas de ellos.

### Cambios a este descargo de responsabilidad

Nos reservamos el derecho de actualizar este Descargo de Responsabilidad en cualquier momento.
Los cambios se reflejarán actualizando la fecha de "Última actualización" arriba. Tu uso
continuado del Servicio después de cualquier cambio constituye tu aceptación del Descargo
revisado.

### Contacto

Para preguntas sobre este Descargo de Responsabilidad, contáctanos en
[hello@stockademarketsim.com](mailto:hello@stockademarketsim.com).
