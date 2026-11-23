// Recorrido por la infografía (src/pages/infografia.astro).
// - Pantallas anchas: la sección es alta y el escenario queda fijo; el avance
//   del scroll dentro de la sección decide qué parte está activa.
// - Pantallas angostas: la lámina queda fija arriba y cada parte es una
//   tarjeta; la que cruza el centro de la pantalla es la activa.
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

  const root = document.querySelector<HTMLElement>('[data-ig]');
  initLightbox();
  if (!root) return;

  controller = new AbortController();
  const { signal } = controller;

  const canvas = root.querySelector<HTMLElement>('[data-ig-canvas]');
  const badge = root.querySelector<HTMLElement>('[data-ig-badge]');
  const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-ig-step]'));
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-ig-dot]'));
  if (!canvas || steps.length === 0) return;

  const wide = window.matchMedia(WIDE);
  let active = -1;

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
    if (badge) {
      badge.textContent = step.dataset.label ?? '';
      badge.dataset.layer = step.dataset.layer ?? 'general';
    }
    root.dataset.layer = step.dataset.layer ?? 'general';
  };

  // ── Pantallas anchas: avance del scroll dentro de la sección ──
  const range = () => {
    const rect = root.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const stage = root.querySelector<HTMLElement>('.ig__stage');
    const span = root.offsetHeight - (stage?.offsetHeight ?? window.innerHeight);
    return { top: top - topOffset(), span: Math.max(1, span) };
  };

  let ticking = false;
  const onScroll = () => {
    if (!wide.matches || ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
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
        for (const e of entries) {
          if (e.isIntersecting) activate(Number((e.target as HTMLElement).dataset.igStep));
        }
      },
      { rootMargin: '-50% 0px -45% 0px' }
    );
    steps.forEach((el) => observer!.observe(el));
  };

  const setMode = () => {
    active = -1;
    if (wide.matches) {
      observer?.disconnect();
      observer = null;
      onScroll();
      if (active === -1) activate(0);
    } else {
      observeCards();
      activate(0);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true, signal });
  window.addEventListener('resize', onScroll, { passive: true, signal });
  wide.addEventListener('change', setMode, { signal });

  dots.forEach((dot) => {
    dot.addEventListener(
      'click',
      () => {
        const i = Number(dot.dataset.igDot);
        const smooth = document.documentElement.getAttribute('data-effects') !== 'off';
        const behavior: ScrollBehavior = smooth ? 'smooth' : 'auto';
        if (wide.matches) {
          const { top, span } = range();
          window.scrollTo({ top: top + ((i + 0.5) / steps.length) * span, behavior });
        } else {
          const el = steps[i];
          const y = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.45;
          window.scrollTo({ top: y, behavior });
        }
      },
      { signal }
    );
  });

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
