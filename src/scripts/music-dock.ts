// Reproductor fijo: plegar/desplegar y cambiar de canción.
// Plegar solo oculta el bloque (el iframe sigue vivo, la música no se corta).
// Cambiar de canción sí recarga el embed: es lo esperado.
// Cualquier elemento de la página con [data-play-track="ID"] (por ejemplo el
// chip de canción en las tarjetas de Equipo) selecciona esa pista en el dock.
const KEY_STATE = 'music-dock';
const KEY_TRACK = 'music-dock-track';

let delegationBound = false;

export function initMusicDock(): void {
  const dock = document.querySelector<HTMLElement>('[data-music-dock]');
  if (!dock) return;

  const toggle = dock.querySelector<HTMLButtonElement>('[data-music-toggle]');
  const frame = dock.querySelector<HTMLIFrameElement>('[data-music-frame]');
  const titleEl = dock.querySelector<HTMLElement>('[data-music-title]');
  const artistEl = dock.querySelector<HTMLElement>('[data-music-artist]');
  const memberEl = dock.querySelector<HTMLElement>('[data-music-member]');
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

  let collapsed = dock.classList.contains('is-collapsed');
  const applyCollapsed = (c: boolean) => {
    collapsed = c;
    dock.classList.toggle('is-collapsed', c);
    toggle?.setAttribute('aria-expanded', c ? 'false' : 'true');
  };

  const select = (btn: HTMLButtonElement, load: boolean) => {
    tracks.forEach((b) => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    if (titleEl) titleEl.textContent = btn.dataset.title ?? '';
    if (artistEl) artistEl.textContent = btn.dataset.artist ?? '';
    if (memberEl) memberEl.textContent = btn.dataset.member ?? '';
    const id = btn.dataset.musicTrack ?? '';
    if (load && frame) {
      frame.src = `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`;
      frame.title = `${btn.dataset.title} — ${btn.dataset.artist}`;
    }
    write(KEY_TRACK, id);
  };

  const selectById = (id: string) => {
    const btn = tracks.find((b) => b.dataset.musicTrack === id);
    if (!btn) return false;
    if (!btn.classList.contains('is-active')) select(btn, true);
    return true;
  };

  if (!dock.dataset.bound) {
    dock.dataset.bound = '1';
    applyCollapsed(read(KEY_STATE) === 'collapsed');
    toggle?.addEventListener('click', () => {
      applyCollapsed(!collapsed);
      write(KEY_STATE, collapsed ? 'collapsed' : 'open');
    });

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

  // Delegación global: chips de canción en otras páginas (sobrevive a la navegación)
  if (!delegationBound) {
    delegationBound = true;
    document.addEventListener('click', (e) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-play-track]');
      if (!el) return;
      const id = el.dataset.playTrack ?? '';
      if (selectById(id)) {
        e.preventDefault();
        if (collapsed) {
          applyCollapsed(false);
          write(KEY_STATE, 'open');
        }
        dock.classList.add('is-pulse');
        window.setTimeout(() => dock.classList.remove('is-pulse'), 900);
      }
    });
  }
}
