// Reproductor fijo: plegar/desplegar y cambiar de canción.
// Plegar solo oculta el bloque (el iframe sigue vivo, la música no se corta).
// Cambiar de canción sí recarga el embed: es lo esperado.
const KEY_STATE = 'music-dock';
const KEY_TRACK = 'music-dock-track';

export function initMusicDock(): void {
  const dock = document.querySelector<HTMLElement>('[data-music-dock]');
  if (!dock || dock.dataset.bound) return;
  dock.dataset.bound = '1';

  const toggle = dock.querySelector<HTMLButtonElement>('[data-music-toggle]');
  const frame = dock.querySelector<HTMLIFrameElement>('[data-music-frame]');
  const titleEl = dock.querySelector<HTMLElement>('[data-music-title]');
  const artistEl = dock.querySelector<HTMLElement>('[data-music-artist]');
  const tracks = Array.from(dock.querySelectorAll<HTMLButtonElement>('[data-music-track]'));

  const read = (k: string) => {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  };
  const write = (k: string, v: string) => {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* ignore */
    }
  };

  // ── plegado
  const applyCollapsed = (collapsed: boolean) => {
    dock.classList.toggle('is-collapsed', collapsed);
    toggle?.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  };
  let collapsed = read(KEY_STATE) === 'collapsed';
  applyCollapsed(collapsed);
  toggle?.addEventListener('click', () => {
    collapsed = !collapsed;
    applyCollapsed(collapsed);
    write(KEY_STATE, collapsed ? 'collapsed' : 'open');
  });

  // ── selección de canción
  const select = (btn: HTMLButtonElement, load: boolean) => {
    tracks.forEach((b) => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    if (titleEl) titleEl.textContent = btn.dataset.title ?? '';
    if (artistEl) artistEl.textContent = btn.dataset.artist ?? '';
    const id = btn.dataset.musicTrack ?? '';
    if (load && frame) {
      frame.src = `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`;
      frame.title = `${btn.dataset.title} — ${btn.dataset.artist}`;
    }
    write(KEY_TRACK, id);
  };

  const remembered = read(KEY_TRACK);
  const initial = tracks.find((b) => b.dataset.musicTrack === remembered);
  if (initial && initial !== tracks[0]) select(initial, true);

  tracks.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('is-active')) return;
      select(btn, true);
    });
  });
}
