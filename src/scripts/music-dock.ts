// Reproductor fijo con la canción de cada integrante.
// - Empieza plegado y en silencio. Al abrirlo por primera vez suena la
//   canción seleccionada (la primera es la de Angel).
// - Cada canción tiene su propio embed de Spotify, creado una sola vez (al
//   pasar el cursor por el reproductor o al abrirlo) y apilado en el mismo
//   recuadro. Cambiar de pestaña no recarga nada: muestra el embed que ya
//   está listo, pausa el anterior y reproduce el nuevo con la Spotify iFrame
//   API. Cambiar el `src` de un iframe, en cambio, vacía y redibuja el
//   reproductor, y eso se veía como si «reapareciera».
// - Plegar solo oculta el bloque; la música sigue.
// - [data-play-track="ID"] en cualquier página (chip «Mi canción» de Equipo)
//   abre el reproductor y hace sonar esa pista.

const API_SRC = 'https://open.spotify.com/embed/iframe-api/v1';
const PLAYER_HEIGHT = 152;

interface PlaybackUpdate {
  data: { isPaused: boolean };
}

interface EmbedController {
  play(): void;
  pause(): void;
  addListener(event: 'ready', cb: () => void): void;
  addListener(event: 'playback_update', cb: (e: PlaybackUpdate) => void): void;
}

interface SpotifyIframeApi {
  createController(
    el: HTMLElement,
    options: { uri: string; width?: string; height?: number; theme?: 'dark' },
    cb: (controller: EmbedController) => void
  ): void;
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
  }
}

let apiPromise: Promise<SpotifyIframeApi> | null = null;

function loadApi(): Promise<SpotifyIframeApi> {
  apiPromise ??= new Promise((resolve, reject) => {
    window.onSpotifyIframeApiReady = resolve;
    const script = document.createElement('script');
    script.src = API_SRC;
    script.async = true;
    script.onerror = () => {
      apiPromise = null;
      reject(new Error('No se pudo cargar la Spotify iFrame API'));
    };
    document.head.appendChild(script);
  });
  return apiPromise;
}

export function initMusicDock(): void {
  // El dock vive fuera de [data-app] y no se reemplaza al navegar: basta con
  // enlazarlo una vez.
  const dock = document.querySelector<HTMLElement>('[data-music-dock]');
  if (!dock || dock.dataset.bound) return;
  dock.dataset.bound = '1';

  const toggle = dock.querySelector<HTMLButtonElement>('[data-music-toggle]');
  const titleEl = dock.querySelector<HTMLElement>('[data-music-title]');
  const artistEl = dock.querySelector<HTMLElement>('[data-music-artist]');
  const memberEl = dock.querySelector<HTMLElement>('[data-music-member]');
  const tabs = Array.from(dock.querySelectorAll<HTMLButtonElement>('[data-music-track]'));
  const slots = Array.from(dock.querySelectorAll<HTMLElement>('[data-music-slot]'));
  if (slots.length === 0) return;

  const controllers = new Map<string, EmbedController>();
  const ready = new Set<string>();
  let playersRequested = false;
  let activeId = slots.find((s) => s.classList.contains('is-active'))?.dataset.musicSlot ?? '';
  let opened = false;
  // Pasa a true cuando alguien pide música (abrir el dock, elegir pista)
  let wantsToPlay = false;
  let playingId: string | null = null;

  const hasSlot = (id: string) => slots.some((s) => s.dataset.musicSlot === id);

  const syncPlaying = () => {
    dock.classList.toggle('is-playing', playingId !== null && playingId === activeId);
  };

  const playActive = () => {
    wantsToPlay = true;
    controllers.forEach((c, id) => {
      if (id !== activeId) c.pause();
    });
    if (ready.has(activeId)) controllers.get(activeId)?.play();
  };

  const createPlayers = () => {
    if (playersRequested) return;
    playersRequested = true;
    loadApi()
      .then((api) => {
        slots.forEach((slot) => {
          const id = slot.dataset.musicSlot ?? '';
          const mount = slot.querySelector<HTMLElement>('[data-music-mount]');
          if (!id || !mount) return;
          api.createController(
            mount,
            { uri: `spotify:track:${id}`, width: '100%', height: PLAYER_HEIGHT, theme: 'dark' },
            (controller) => {
              controllers.set(id, controller);
              const frame = slot.querySelector('iframe');
              frame?.setAttribute('title', slot.dataset.label ?? 'Spotify');
              // La API los crea con loading="lazy": plegado, el dock está fuera
              // de pantalla y no se precargarían
              frame?.setAttribute('loading', 'eager');
              controller.addListener('ready', () => {
                ready.add(id);
                slot.classList.add('is-ready');
                if (wantsToPlay && id === activeId) controller.play();
              });
              controller.addListener('playback_update', (e) => {
                if (!e.data.isPaused) playingId = id;
                else if (playingId === id) playingId = null;
                syncPlaying();
              });
            }
          );
        });
      })
      .catch(() => {
        playersRequested = false;
      });
  };

  const setCollapsed = (collapsed: boolean) => {
    dock.classList.toggle('is-collapsed', collapsed);
    toggle?.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  };

  const select = (id: string) => {
    if (!hasSlot(id)) return;
    activeId = id;
    tabs.forEach((b) => {
      const on = b.dataset.musicTrack === id;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    slots.forEach((s) => s.classList.toggle('is-active', s.dataset.musicSlot === id));
    const tab = tabs.find((b) => b.dataset.musicTrack === id);
    if (tab) {
      if (titleEl) titleEl.textContent = tab.dataset.title ?? '';
      if (artistEl) artistEl.textContent = tab.dataset.artist ?? '';
      if (memberEl) memberEl.textContent = tab.dataset.member ?? '';
    }
    syncPlaying();
  };

  toggle?.addEventListener('click', () => {
    if (!dock.classList.contains('is-collapsed')) {
      setCollapsed(true);
      return;
    }
    setCollapsed(false);
    createPlayers();
    if (!opened) {
      opened = true;
      playActive();
    }
  });

  // Precarga: el cursor sobre el reproductor anticipa que se va a abrir
  dock.addEventListener('pointerenter', createPlayers, { once: true });
  dock.addEventListener('focusin', createPlayers, { once: true });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('is-active')) return;
      select(tab.dataset.musicTrack ?? '');
      playActive();
    });
  });

  // Chips de canción en otras páginas (delegación: sobrevive a la navegación)
  document.addEventListener('pointerover', (e) => {
    if (!playersRequested && (e.target as HTMLElement).closest?.('[data-play-track]')) createPlayers();
  });
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-play-track]');
    const id = el?.dataset.playTrack ?? '';
    if (!el || !hasSlot(id)) return;
    e.preventDefault();
    select(id);
    opened = true;
    setCollapsed(false);
    createPlayers();
    playActive();
    dock.classList.add('is-pulse');
    window.setTimeout(() => dock.classList.remove('is-pulse'), 900);
  });
}
