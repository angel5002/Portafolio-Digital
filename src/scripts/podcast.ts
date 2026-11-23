// Reproductor del podcast (src/pages/podcast.astro).
// - Un <audio> nativo hace el trabajo (sin JavaScript, la página muestra el
//   reproductor del navegador dentro de <noscript>).
// - La forma de onda es real (src/lib/podcast.ts): se colorea hasta donde va
//   el episodio y sirve para saltar (clic, arrastre o flechas del teclado).
// - Capítulos y botones «Escuchar desde…» ([data-pc-seek]) saltan y reproducen.
//   La parte de la página que suena se marca con .is-live.
// - Si el reproductor sale de la pantalla mientras suena, aparece un mini
//   reproductor abajo para seguir leyendo la escena.
// - Al sonar, avisa a la banda sonora (music-dock.ts) para que se pause, y se
//   pausa si la banda sonora empieza a sonar.

const RATES = [1, 1.25, 1.5, 0.75];

let controller: AbortController | null = null;
let visibility: IntersectionObserver | null = null;

export function initPodcast(): void {
  controller?.abort();
  visibility?.disconnect();
  visibility = null;

  const root = document.querySelector<HTMLElement>('[data-pc]');
  const audio = root?.querySelector<HTMLAudioElement>('[data-pc-audio]');
  if (!root || !audio) {
    // Al salir de la página, que el episodio no siga sonando sin controles
    document.querySelectorAll<HTMLAudioElement>('audio[data-pc-audio]').forEach((a) => a.pause());
    return;
  }

  controller = new AbortController();
  const { signal } = controller;

  const wave = root.querySelector<HTMLElement>('[data-pc-wave]');
  const done = root.querySelector<HTMLElement>('[data-pc-done]');
  const hover = root.querySelector<HTMLElement>('[data-pc-hover]');
  const current = root.querySelector<HTMLElement>('[data-pc-current]');
  const rateBtn = root.querySelector<HTMLButtonElement>('[data-pc-rate]');
  const mini = document.querySelector<HTMLElement>('[data-pc-mini]');
  const miniChapter = document.querySelector<HTMLElement>('[data-pc-mini-chapter]');
  const miniTime = document.querySelector<HTMLElement>('[data-pc-mini-time]');
  const miniBar = document.querySelector<HTMLElement>('[data-pc-mini-bar]');
  const playBtns = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-pc-play]'));
  const chapterBtns = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-pc-chapter]'));
  const parts = Array.from(document.querySelectorAll<HTMLElement>('[data-pc-part]'));
  const starts = chapterBtns.map((b) => Number(b.dataset.pcSeek ?? 0));
  const titles = chapterBtns.map((b) => b.querySelector('.pc-chapter__title')?.textContent ?? '');

  const duration = () =>
    Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : Number(wave?.getAttribute('aria-valuemax') ?? 1);

  const clock = (sec: number) => {
    const s = Math.max(0, Math.floor(sec));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  };

  let chapter = -1;
  const render = () => {
    const t = audio.currentTime;
    const pct = Math.min(100, (t / duration()) * 100);
    done?.style.setProperty('--p', `${pct}%`);
    if (miniBar) miniBar.style.width = `${pct}%`;
    if (current) current.textContent = clock(t);
    if (miniTime) miniTime.textContent = `${clock(t)} / ${clock(duration())}`;
    wave?.setAttribute('aria-valuenow', String(Math.round(t)));
    wave?.setAttribute('aria-valuetext', `${clock(t)} de ${clock(duration())}`);

    let c = 0;
    starts.forEach((s, i) => {
      if (t >= s - 0.25) c = i;
    });
    if (c !== chapter) {
      chapter = c;
      chapterBtns.forEach((b, i) => b.classList.toggle('is-current', i === c));
      if (miniChapter) miniChapter.textContent = titles[c] ?? '';
    }
    syncLive();
  };

  const playing = () => !audio.paused && !audio.ended;

  const syncLive = () => {
    parts.forEach((p) => p.classList.toggle('is-live', playing() && Number(p.dataset.pcPart) === chapter));
  };

  const syncPlaying = () => {
    const on = playing();
    root.classList.toggle('is-playing', on);
    mini?.classList.toggle('is-playing', on);
    playBtns.forEach((b) => {
      b.setAttribute('aria-label', on ? 'Pausar el episodio' : 'Reproducir el episodio');
      b.setAttribute('aria-pressed', String(on));
    });
    syncLive();
    syncMini();
  };

  const play = () => {
    audio.play().catch(() => {});
  };

  const seek = (t: number) => {
    audio.currentTime = Math.max(0, Math.min(duration() - 0.1, t));
    render();
  };

  playBtns.forEach((b) => b.addEventListener('click', () => (audio.paused ? play() : audio.pause()), { signal }));

  root.querySelectorAll<HTMLButtonElement>('[data-pc-skip]').forEach((b) =>
    b.addEventListener('click', () => seek(audio.currentTime + Number(b.dataset.pcSkip ?? 0)), { signal })
  );

  document.querySelectorAll<HTMLButtonElement>('[data-pc-seek]').forEach((b) =>
    b.addEventListener(
      'click',
      () => {
        seek(Number(b.dataset.pcSeek ?? 0));
        play();
      },
      { signal }
    )
  );

  rateBtn?.addEventListener(
    'click',
    () => {
      const i = (RATES.indexOf(audio.playbackRate) + 1) % RATES.length;
      audio.playbackRate = RATES[i];
      rateBtn.textContent = `${String(RATES[i]).replace('.', ',')}×`;
    },
    { signal }
  );

  // ── Forma de onda: clic, arrastre y teclado ──
  if (wave) {
    const timeAt = (clientX: number) => {
      const r = wave.getBoundingClientRect();
      return Math.min(1, Math.max(0, (clientX - r.left) / r.width)) * duration();
    };
    let dragging = false;
    wave.addEventListener(
      'pointerdown',
      (e) => {
        dragging = true;
        wave.setPointerCapture(e.pointerId);
        seek(timeAt(e.clientX));
      },
      { signal }
    );
    wave.addEventListener(
      'pointermove',
      (e) => {
        const t = timeAt(e.clientX);
        if (hover) {
          hover.textContent = clock(t);
          hover.style.left = `${(t / duration()) * 100}%`;
        }
        if (dragging) seek(t);
      },
      { signal }
    );
    const stop = () => (dragging = false);
    wave.addEventListener('pointerup', stop, { signal });
    wave.addEventListener('pointercancel', stop, { signal });
    wave.addEventListener(
      'keydown',
      (e) => {
        const step = e.shiftKey ? 30 : 5;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') seek(audio.currentTime + step);
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') seek(audio.currentTime - step);
        else if (e.key === 'Home') seek(0);
        else if (e.key === 'End') seek(duration());
        else if (e.key === ' ' || e.key === 'Enter') audio.paused ? play() : audio.pause();
        else return;
        e.preventDefault();
      },
      { signal }
    );
  }

  // ── Mini reproductor ──
  let playerVisible = true;
  const syncMini = () => {
    if (!mini) return;
    const show = !playerVisible && (playing() || audio.currentTime > 0);
    mini.classList.toggle('is-visible', show);
    mini.setAttribute('aria-hidden', String(!show));
    mini.querySelectorAll('button').forEach((b) => (b.tabIndex = show ? 0 : -1));
  };
  visibility = new IntersectionObserver(
    ([entry]) => {
      playerVisible = entry.isIntersecting;
      syncMini();
    },
    { threshold: 0.15 }
  );
  visibility.observe(root);
  mini?.addEventListener(
    'click',
    (e) => {
      // Clic en el texto del mini reproductor: volver al reproductor grande
      if ((e.target as HTMLElement).closest('button')) return;
      root.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
    { signal }
  );

  // ── Eventos del audio ──
  audio.addEventListener('timeupdate', render, { signal });
  audio.addEventListener('loadedmetadata', render, { signal });
  audio.addEventListener(
    'play',
    () => {
      document.dispatchEvent(new CustomEvent('portfolio:audio-play'));
      syncPlaying();
    },
    { signal }
  );
  audio.addEventListener('pause', syncPlaying, { signal });
  audio.addEventListener('ended', syncPlaying, { signal });
  document.addEventListener('portfolio:music-play', () => audio.pause(), { signal });

  // Al navegar a otra página el <audio> se va con ella: dejarlo en pausa
  document.addEventListener('astro:before-swap', () => audio.pause(), { signal, once: true });

  // Las meninas: el foco sigue al cursor
  document.querySelectorAll<HTMLElement>('[data-pc-spot]').forEach((el) => {
    el.addEventListener(
      'pointermove',
      (e) => {
        const media = el.querySelector<HTMLElement>('.art__media');
        if (!media) return;
        const r = media.getBoundingClientRect();
        media.style.setProperty('--mx', `${e.clientX - r.left}px`);
        media.style.setProperty('--my', `${e.clientY - r.top}px`);
      },
      { signal }
    );
  });

  render();
  syncPlaying();
}
