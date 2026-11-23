// Recorrido por la infografía (src/pages/infografia.astro).
// - Pantallas anchas: la sección es alta y el escenario queda fijo; el avance
//   del scroll dentro de la sección decide qué parte está activa.
// - Pantallas angostas: la lámina queda fija arriba y cada parte es una
//   tarjeta; la que cruza el centro de la pantalla es la activa.
// - Pantalla completa: el escenario cubre toda la pantalla (y, si el navegador
//   lo permite, pasa a pantalla completa de verdad) con letra más grande. Ahí
//   ya no manda el scroll: se avanza con flechas, teclado, rueda o deslizando.
//   Al salir, la página queda en la parte en la que se iba.
// La parte activa mueve la lámina (escala y desplazamiento en CSS) y muestra
// sus notas. Además: puntos para saltar a una parte y la lámina completa en
// un <dialog>.

const WIDE = '(min-width: 1200px)';

let controller: AbortController | null = null;
let observer: IntersectionObserver | null = null;

export function initInfografia(): void {
  controller?.abort();
  observer?.disconnect();
  observer = null;
  // Si se navegó estando en pantalla completa, no dejar la página bloqueada
  if (document.documentElement.classList.contains('ig-presenting')) {
    document.documentElement.classList.remove('ig-presenting');
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }

  const root = document.querySelector<HTMLElement>('[data-ig]');
  initLightbox();
  if (!root) return;

  controller = new AbortController();
  const { signal } = controller;

  const stage = root.querySelector<HTMLElement>('.ig__stage');
  const canvas = root.querySelector<HTMLElement>('[data-ig-canvas]');
  const badge = root.querySelector<HTMLElement>('[data-ig-badge]');
  const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-ig-step]'));
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-ig-dot]'));
  const prev = root.querySelector<HTMLButtonElement>('[data-ig-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-ig-next]');
  const toggles = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-ig-present]'));
  if (!stage || !canvas || steps.length === 0) return;

  const wide = window.matchMedia(WIDE);
  let active = -1;
  let presenting = false;

  const activate = (i: number) => {
    if (i === active || i < 0 || i >= steps.length) return;
    active = i;
    const step = steps[i];
    canvas.style.setProperty('--s', step.dataset.s ?? '1');
    canvas.style.setProperty('--tx', `${step.dataset.tx ?? 0}%`);
    canvas.style.setProperty('--ty', `${step.dataset.ty ?? 0}%`);
    steps.forEach((el, j) => el.classList.toggle('is-active', j === i));
    dots.forEach((el, j) => {
      el.classList.toggle('is-active', j === i);
      el.classList.toggle('is-past', j < i);
      if (j === i) el.setAttribute('aria-current', 'step');
      else el.removeAttribute('aria-current');
    });
    if (prev) prev.disabled = i === 0;
    if (next) next.disabled = i === steps.length - 1;
    if (badge) {
      badge.textContent = step.dataset.label ?? '';
      badge.dataset.layer = step.dataset.layer ?? 'general';
    }
    root.dataset.layer = step.dataset.layer ?? 'general';
    // En pantalla completa angosta, la nota nueva empieza desde arriba
    if (presenting) step.scrollTop = 0;
  };

  // ── Pantallas anchas: avance del scroll dentro de la sección ──
  const range = () => {
    const rect = root.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const span = root.offsetHeight - (stage.offsetHeight || window.innerHeight);
    return { top: top - topOffset(), span: Math.max(1, span) };
  };

  let ticking = false;
  const onScroll = () => {
    if (!wide.matches || ticking || presenting) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      if (presenting) return;
      const { top, span } = range();
      const p = Math.min(0.9999, Math.max(0, (window.scrollY - top) / span));
      activate(Math.floor(p * steps.length));
    });
  };

  // ── Pantallas angostas: la tarjeta que cruza el centro ──
  const observeCards = () => {
    observer?.disconnect();
    observer = new IntersectionObserver(
      (entries) => {
        if (presenting) return;
        for (const e of entries) {
          if (e.isIntersecting) activate(Number((e.target as HTMLElement).dataset.igStep));
        }
      },
      { rootMargin: '-50% 0px -45% 0px' }
    );
    steps.forEach((el) => observer!.observe(el));
  };

  const setMode = () => {
    if (wide.matches) {
      observer?.disconnect();
      observer = null;
    } else {
      observeCards();
    }
    // Entrar a pantalla completa puede cruzar el límite de 1200 px: no perder la parte
    if (presenting) return;
    active = -1;
    if (wide.matches) {
      onScroll();
      if (active === -1) activate(0);
    } else {
      activate(0);
    }
  };

  /** Lleva la página (o la pantalla completa) a la parte i */
  const goTo = (i: number, behavior?: ScrollBehavior) => {
    i = Math.max(0, Math.min(steps.length - 1, i));
    if (presenting) {
      activate(i);
      return;
    }
    const smooth = document.documentElement.getAttribute('data-effects') !== 'off';
    behavior ??= smooth ? 'smooth' : 'auto';
    if (wide.matches) {
      const { top, span } = range();
      window.scrollTo({ top: top + ((i + 0.5) / steps.length) * span, behavior });
    } else {
      const el = steps[i];
      const y = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.45;
      window.scrollTo({ top: y, behavior });
    }
  };

  // ── Pantalla completa ──
  const syncToggles = () => {
    toggles.forEach((t) => {
      t.setAttribute('aria-pressed', String(presenting));
      const label = t.querySelector('[data-ig-present-label]');
      if (label) label.textContent = presenting ? 'Salir' : 'Pantalla completa';
    });
  };

  const enter = () => {
    if (presenting) return;
    presenting = true;
    const current = Math.max(0, active);
    document.documentElement.classList.add('ig-presenting');
    stage.classList.add('is-presenting');
    stage.setAttribute('role', 'dialog');
    stage.setAttribute('aria-modal', 'true');
    stage.setAttribute('aria-label', root.getAttribute('aria-label') ?? 'Recorrido');
    stage.tabIndex = -1;
    stage.focus({ preventScroll: true });
    syncToggles();
    active = -1;
    activate(current);
    if (document.fullscreenEnabled && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  const exit = () => {
    if (!presenting) return;
    presenting = false;
    const current = Math.max(0, active);
    document.documentElement.classList.remove('ig-presenting');
    stage.classList.remove('is-presenting');
    stage.removeAttribute('role');
    stage.removeAttribute('aria-modal');
    stage.removeAttribute('aria-label');
    stage.removeAttribute('tabindex');
    steps.forEach((el) => (el.scrollTop = 0));
    syncToggles();
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    // Dejar la página en la parte en la que se iba
    goTo(current, 'auto');
    active = -1;
    activate(current);
    toggles.find((t) => root.contains(t))?.focus({ preventScroll: true });
  };

  toggles.forEach((t) => t.addEventListener('click', () => (presenting ? exit() : enter()), { signal }));

  document.addEventListener(
    'fullscreenchange',
    () => {
      // Esc o el botón del navegador cierran la pantalla completa nativa
      if (!document.fullscreenElement && presenting) exit();
    },
    { signal }
  );

  document.addEventListener(
    'keydown',
    (e) => {
      if (!presenting || e.altKey || e.ctrlKey || e.metaKey) return;
      const forward = ['ArrowRight', 'ArrowDown', 'PageDown', ' '];
      const back = ['ArrowLeft', 'ArrowUp', 'PageUp'];
      if (forward.includes(e.key)) goTo(active + 1);
      else if (back.includes(e.key)) goTo(active - 1);
      else if (e.key === 'Home') goTo(0);
      else if (e.key === 'End') goTo(steps.length - 1);
      else if (e.key === 'Escape') exit();
      else return;
      e.preventDefault();
    },
    { signal }
  );

  // Rueda: una parte por gesto, salvo que la nota tenga texto por desplazar
  let wheelLock = 0;
  stage.addEventListener(
    'wheel',
    (e) => {
      if (!presenting) return;
      const note = (e.target as HTMLElement).closest<HTMLElement>('.ig-note, .ig-step');
      if (note && note.scrollHeight > note.clientHeight + 1) {
        const atTop = note.scrollTop <= 0;
        const atEnd = note.scrollTop + note.clientHeight >= note.scrollHeight - 1;
        if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atTop)) return;
      }
      e.preventDefault();
      const now = performance.now();
      if (Math.abs(e.deltaY) < 12 || now < wheelLock) return;
      wheelLock = now + 650;
      goTo(active + (e.deltaY > 0 ? 1 : -1));
    },
    { passive: false, signal }
  );

  // Deslizar sobre la lámina en pantallas táctiles
  let touchX: number | null = null;
  let touchY = 0;
  stage.addEventListener(
    'touchstart',
    (e) => {
      if (!presenting || e.touches.length !== 1) return;
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
    },
    { passive: true, signal }
  );
  stage.addEventListener(
    'touchend',
    (e) => {
      if (!presenting || touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      const dy = e.changedTouches[0].clientY - touchY;
      touchX = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(active + (dx < 0 ? 1 : -1));
    },
    { passive: true, signal }
  );

  window.addEventListener('scroll', onScroll, { passive: true, signal });
  window.addEventListener('resize', onScroll, { passive: true, signal });
  wide.addEventListener('change', setMode, { signal });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => goTo(Number(dot.dataset.igDot)), { signal });
  });
  prev?.addEventListener('click', () => goTo(active - 1), { signal });
  next?.addEventListener('click', () => goTo(active + 1), { signal });

  setMode();
}

/** Alto de la barra superior fija, que tapa el borde de arriba */
function topOffset(): number {
  const bar = document.getElementById('topbar');
  return bar ? bar.offsetHeight : 0;
}

function initLightbox(): void {
  const dialog = document.querySelector<HTMLDialogElement>('[data-ig-dialog]');
  const open = document.querySelector<HTMLButtonElement>('[data-ig-open]');
  if (!dialog || !open || dialog.dataset.bound) return;
  dialog.dataset.bound = 'true';

  open.addEventListener('click', () => dialog.showModal());
  dialog.querySelector('[data-ig-close]')?.addEventListener('click', () => dialog.close());
  // Clic fuera de la imagen (en el fondo del diálogo) también cierra
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog || (e.target as HTMLElement).classList.contains('ig-lightbox__scroll')) {
      dialog.close();
    }
  });
}
