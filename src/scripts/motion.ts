// Preferencia de efectos del sitio.
// 'auto' (predeterminado) sigue prefers-reduced-motion del sistema; 'on' y
// 'off' la fuerzan. Se refleja en <html data-effects="on|off"> para que el
// CSS y los scripts lean el mismo valor. El atributo inicial lo pone un
// script inline en <head> (sin parpadeo); aquí se gestiona el cambio en vivo.
const KEY = 'effects';
export type EffectsPref = 'auto' | 'on' | 'off';

export function readPref(): EffectsPref {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'on' || v === 'off' ? v : 'auto';
  } catch {
    return 'auto';
  }
}

export function resolve(pref: EffectsPref): 'on' | 'off' {
  if (pref !== 'auto') return pref;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'off' : 'on';
}

/** ¿Se permiten animaciones e interacciones de movimiento ahora mismo? */
export function motionAllowed(): boolean {
  return document.documentElement.getAttribute('data-effects') !== 'off';
}

/** ¿Hay puntero fino (mouse/trackpad)? */
export function finePointer(): boolean {
  return window.matchMedia('(pointer: fine)').matches;
}

export function applyPref(pref: EffectsPref): void {
  try {
    if (pref === 'auto') localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, pref);
  } catch {
    /* ignore */
  }
  document.documentElement.setAttribute('data-effects', resolve(pref));
  document.dispatchEvent(new CustomEvent('effects:change'));
}

export function initEffectsToggle(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-effects-toggle]');
  const sync = () => {
    const on = motionAllowed();
    buttons.forEach((b) => {
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.title = on ? 'Efectos activados (clic para desactivar)' : 'Efectos desactivados (clic para activar)';
    });
  };
  buttons.forEach((btn) => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      applyPref(motionAllowed() ? 'off' : 'on');
      sync();
    });
  });
  sync();
}
