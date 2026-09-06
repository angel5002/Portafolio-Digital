# Brújula Ética — Portafolio digital HUM-010 (UCSUR)

## Resumen

Portafolio digital de identidad ética profesional del curso **Ética y Deontología Profesional** (HUM-010, Universidad Científica del Sur, ciclo 2026-2). Trabajo grupal del equipo **Los Estoicos** (6 integrantes, Ingeniería Empresarial y de Sistemas).

El sitio reutiliza el diseño y las funcionalidades del blog de Realidad Nacional (`../pagina-rn-main`): Astro 5 + MDX + Sass, sidebar con navegación, tema claro/oscuro con cross-fade, reveal on scroll, reproductor de música por entrada, tarjetas con portada. Se eliminaron el buscador y el rail derecho. Sobre esa base se añadió una atmósfera propia: **oscuro por defecto**, cielo nocturno índigo con estrellas (canvas en `src/scripts/starfield.ts`), acentos cálidos dorado/ámbar, píldoras con trazo degradado, tipografía Inter Tight + acentos en Instrument Serif itálica. El logo UCSUR se invierte por CSS en tema oscuro.

## Estructura exigida por el curso (plantilla del docente)

| Sección | Ruta | Módulo / semanas | Estado |
|---|---|---|---|
| Inicio (hero + resumen) | `/` | — | listo |
| Equipo | `/equipo` | — | listo (faltan datos, ver abajo) |
| Manifiesto de Identidad Ética | `/manifiesto` | I · sem. 1–5 | AC1–AC3 integrados; AC4 pendiente |
| Podcast de Dilema Moral | `/podcast` | II · sem. 6–7 | desactivada (plantilla en `src/pages-disabled/`) |
| Video-reacción crítico | `/video-reaccion` | III · sem. 9–12 | desactivada (plantilla en `src/pages-disabled/`) |
| Infografía de Integridad y Sostenibilidad | `/infografia` | IV · sem. 13–15 | desactivada (plantilla en `src/pages-disabled/`) |

Extras heredados del blog: `/bitacora` (una entrada MDX por aprendizaje colaborativo), `/tags`, `/sobre` (curso, módulos, evaluaciones y hoja de ruta).

## Dónde se edita cada cosa

- `src/lib/team.ts` — integrantes: nombre, código, reseña, LinkedIn, foto (`src/assets/images/equipo/`). Quien no tiene foto usa `placeholder.svg`. `photoPos` ajusta el encuadre.
- `src/lib/portfolio.ts` — datos del curso (`COURSE.teacher` está en `null` = "por confirmar"), secciones, estados (`done | wip | todo`) y hoja de ruta (AC1…EC3).
- `src/lib/manifiesto.ts` — todo el texto del Manifiesto (metáfora, propósito, poblaciones vulnerables, tablas de Scheler por integrante, tensión, declaración).
- `src/content/bitacora/*.mdx` — entradas semanales. Frontmatter igual al blog RN (`cover`, `gallery`, `music.spotify`/`music.youtube`, `tags`).
- `src/pages-disabled/podcast.astro`, `video-reaccion.astro`, `infografia.astro` — plantillas de las secciones aún no publicadas. Para activar una: mover el archivo a `src/pages/` y cambiar su `status` a `wip` o `done` en `portfolio.ts` (eso habilita el enlace en el sidebar, la tarjeta de Inicio y la hoja de ruta). Cuando exista el material, usar `<Music />`, `<Video />` o un iframe de Genially/Canva.
- `src/components/MusicDock.astro` — reproductor fijo de Spotify (canción en `SOUNDTRACK`, `portfolio.ts`). No se corta al navegar porque `BaseLayout` define un swap personalizado de `<ClientRouter />` que solo reemplaza `[data-app]`; el dock, el canvas de estrellas y los halos viven fuera y no se tocan (un iframe re-insertado en el DOM se recarga). Los scripts se re-enlazan en `astro:page-load`.
- `src/scripts/starfield.ts` — estrellas con deriva, paralaje (puntero y scroll), constelación alrededor del cursor y estrellas fugaces. `src/scripts/interactions.ts` — barra de progreso de lectura, contadores (`data-count`), botones magnéticos (`data-magnetic`) y linterna que sigue al cursor. Todo respeta `prefers-reduced-motion`, pero el usuario puede forzarlo con el botón «Efectos» del sidebar (`src/scripts/motion.ts` guarda `effects=on|off` en localStorage y lo refleja en `<html data-effects>`; el CSS usa `html[data-effects='off']` en vez de la media query). En Windows, «Efectos de animación» desactivado en Accesibilidad hace que Edge/Chrome reporten reduce.
- Animaciones de tarjetas: `src/scripts/tilt.ts` (inclinación 3D + foco de luz) sobre elementos con `data-tilt`.
- Sin notas internas ni textos "pendiente" en la web: lo que falta simplemente no se muestra (bio, foto, LinkedIn, docente).
- `src/styles/tokens.scss` (paleta y temas) y `src/styles/portfolio.scss` (componentes nuevos). `global.scss` es el heredado del blog RN. Tema claro: papel frío (#f4f5f9), tinta índigo (#3b4a8a) y bronce (#8c6a1f); el canvas dibuja motas de tinta en claro y estrellas en oscuro.
- Rendimiento: evitar `filter: blur()` animado y `backdrop-filter` en elementos grandes (causaban lag del cursor). El canvas usa sprites pre-renderizados, ~30 fps, máx. 170 estrellas y DPR ≤ 1.5.
- Redacción: el Manifiesto abre con un ensayo reflexivo (`purposeEssay` en `manifiesto.ts`) y conserva el texto literal de la ficha AC1 como «Así lo escribimos en la primera sesión». Tono: reflexivo en Manifiesto, directo en Inicio.
- LinkedIn solo aparece en las tarjetas de Equipo (no hay botones de compartir ni correo).

## Pendientes de contenido

- Reseñas de Grecia Vergara y José Vigil; fotos de Angel Vargas y José Vigil; LinkedIn de todos.
- Nombre del docente.
- AC4 (mapa crítico profesional), podcast, video-reacción, infografía.
- Banda sonora de AC1 y AC3 (`music:` en el frontmatter).
- Reemplazar las canciones de Siamés del reproductor fijo cuando el equipo decida las definitivas.

## Comandos

Para probar un tema sin tocar localStorage: añadir `?theme=light` o `?theme=dark` a la URL.

## Comandos (npm)

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

Despliegue: repositorio `https://github.com/angel5002/Portafolio-Digital` (rama `main`, raíz = esta carpeta). Cada push dispara el workflow de GitHub Pages en `.github/workflows/deploy.yml` (Pages configurado en modo *GitHub Actions*; `BASE=/Portafolio-Digital/`). Sitio publicado: **https://angel5002.github.io/Portafolio-Digital/**.

Banda sonora del reproductor fijo: lista `SOUNDTRACK` en `src/lib/portfolio.ts` (hoy: Siamés — Mr. Fear, As You Get High). Para cambiar canciones basta editar esa lista con el ID de Spotify (`open.spotify.com/track/<ID>`).

## Convenciones

- Idioma: español. Textos del Manifiesto transcritos de las fichas AC1–AC3 con correcciones mínimas de tipeo; no reescribirlos sin acuerdo del equipo.
- Mantener el tema oscuro como predeterminado; el claro debe seguir funcionando (tokens en `tokens.scss`).
- No introducir dependencias nuevas sin necesidad; el sitio es estático.
