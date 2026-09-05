// Cielo estrellado de fondo (canvas fijo).
// - Estrellas en tres profundidades que titilan y derivan muy despacio.
// - Paralaje con el puntero y con el scroll (las más cercanas se mueven más).
// - Cerca del cursor, las estrellas se unen con líneas finas: una constelación
//   que sigue a quien navega.
// - Estrella fugaz ocasional.
// Solo se dibuja en tema oscuro; respeta prefers-reduced-motion (estático).

interface Star {
  x: number;
  y: number;
  r: number;
  depth: number; // 0 lejos … 1 cerca
  base: number;
  phase: number;
  speed: number;
  vx: number;
  vy: number;
  warm: boolean;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
}

const LINK_RADIUS = 150;
const PARALLAX_MOUSE = 22; // px máximos de desplazamiento por puntero
const PARALLAX_SCROLL = 0.06; // fracción del scroll que se traslada

export function initStarfield(): void {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-starfield]');
  if (!canvas || canvas.dataset.ready) return;
  canvas.dataset.ready = '1';
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;

  let stars: Star[] = [];
  let meteors: Meteor[] = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let raf = 0;
  let last = 0;
  let nextMeteor = 5000 + Math.random() * 6000;

  // Puntero (normalizado -1…1) con suavizado
  let targetPx = 0;
  let targetPy = 0;
  let px = 0;
  let py = 0;
  let mouseX = -9999;
  let mouseY = -9999;
  let scrollY = window.scrollY;

  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

  function resize(): void {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
    draw(performance.now());
  }

  function seed(): void {
    const count = Math.round((width * height) / 8500);
    stars = Array.from({ length: count }, () => {
      const depth = Math.pow(Math.random(), 1.6); // mayoría lejanas
      const ang = Math.random() * Math.PI * 2;
      const sp = 0.015 + depth * 0.05;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.4 + depth * 1.3,
        depth,
        base: 0.22 + depth * 0.6,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.1,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp,
        warm: Math.random() < 0.28
      };
    });
  }

  function spawnMeteor(): void {
    const fromLeft = Math.random() < 0.5;
    const speed = 9 + Math.random() * 5;
    meteors.push({
      x: fromLeft ? Math.random() * width * 0.4 : width * 0.6 + Math.random() * width * 0.4,
      y: Math.random() * height * 0.35,
      vx: fromLeft ? speed : -speed,
      vy: speed * 0.45,
      life: 0,
      max: 38 + Math.random() * 20
    });
  }

  // Posición en pantalla de una estrella con paralaje aplicado
  function screenPos(s: Star): [number, number] {
    const k = 0.25 + s.depth * 0.75;
    const ox = px * PARALLAX_MOUSE * k;
    const oy = py * PARALLAX_MOUSE * k - scrollY * PARALLAX_SCROLL * k;
    let x = s.x + ox;
    let y = s.y + oy;
    // envolver para que el paralaje de scroll no deje huecos
    y = ((y % height) + height) % height;
    x = ((x % width) + width) % width;
    return [x, y];
  }

  function draw(now: number): void {
    ctx!.clearRect(0, 0, width, height);
    if (!isDark()) return;

    const t = now / 1000;
    const near: [number, number, number][] = []; // x, y, alpha (para constelación)

    for (const s of stars) {
      const tw = reduce ? 1 : 0.65 + 0.35 * Math.sin(t * s.speed + s.phase);
      const a = s.base * tw;
      const [x, y] = screenPos(s);

      ctx!.beginPath();
      ctx!.arc(x, y, s.r, 0, Math.PI * 2);
      ctx!.fillStyle = s.warm ? `rgba(240, 213, 154, ${a})` : `rgba(238, 236, 246, ${a})`;
      ctx!.fill();

      if (s.r > 1.3) {
        const g = ctx!.createRadialGradient(x, y, 0, x, y, s.r * 6);
        g.addColorStop(0, `rgba(240, 213, 154, ${a * 0.35})`);
        g.addColorStop(1, 'rgba(240, 213, 154, 0)');
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(x, y, s.r * 6, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (fine && !reduce) {
        const dx = x - mouseX;
        const dy = y - mouseY;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK_RADIUS * LINK_RADIUS) {
          near.push([x, y, 1 - Math.sqrt(d2) / LINK_RADIUS]);
        }
      }
    }

    // Constelación alrededor del cursor: líneas entre estrellas cercanas
    if (near.length > 1) {
      ctx!.lineWidth = 0.7;
      for (let i = 0; i < near.length; i++) {
        const [ax, ay, aa] = near[i];
        // línea tenue hacia el cursor
        ctx!.strokeStyle = `rgba(230, 192, 121, ${0.22 * aa})`;
        ctx!.beginPath();
        ctx!.moveTo(ax, ay);
        ctx!.lineTo(mouseX, mouseY);
        ctx!.stroke();
        for (let j = i + 1; j < near.length; j++) {
          const [bx, by, ba] = near[j];
          const dx = ax - bx;
          const dy = ay - by;
          if (dx * dx + dy * dy < 110 * 110) {
            ctx!.strokeStyle = `rgba(240, 213, 154, ${0.35 * Math.min(aa, ba)})`;
            ctx!.beginPath();
            ctx!.moveTo(ax, ay);
            ctx!.lineTo(bx, by);
            ctx!.stroke();
          }
        }
      }
      // punto luminoso en el cursor
      const g = ctx!.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 18);
      g.addColorStop(0, 'rgba(246, 241, 230, 0.35)');
      g.addColorStop(1, 'rgba(246, 241, 230, 0)');
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.arc(mouseX, mouseY, 18, 0, Math.PI * 2);
      ctx!.fill();
    }

    if (reduce) return;

    for (const m of meteors) {
      const p = m.life / m.max;
      const alpha = p < 0.2 ? p / 0.2 : 1 - (p - 0.2) / 0.8;
      const len = 90;
      const g = ctx!.createLinearGradient(m.x, m.y, m.x - m.vx * (len / 10), m.y - m.vy * (len / 10));
      g.addColorStop(0, `rgba(246, 241, 230, ${0.9 * alpha})`);
      g.addColorStop(1, 'rgba(246, 241, 230, 0)');
      ctx!.strokeStyle = g;
      ctx!.lineWidth = 1.2;
      ctx!.beginPath();
      ctx!.moveTo(m.x, m.y);
      ctx!.lineTo(m.x - m.vx * (len / 10), m.y - m.vy * (len / 10));
      ctx!.stroke();
      m.x += m.vx;
      m.y += m.vy;
      m.life += 1;
    }
    meteors = meteors.filter((m) => m.life < m.max);
  }

  function step(dt: number): void {
    // deriva lenta de las estrellas
    for (const s of stars) {
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      if (s.x < -4) s.x = width + 4;
      else if (s.x > width + 4) s.x = -4;
      if (s.y < -4) s.y = height + 4;
      else if (s.y > height + 4) s.y = -4;
    }
    // suavizado del paralaje
    px += (targetPx - px) * 0.06;
    py += (targetPy - py) * 0.06;
  }

  function loop(now: number): void {
    if (!reduce && document.visibilityState === 'visible') {
      const dt = Math.min(now - last, 80);
      if (dt > 30) {
        last = now;
        step(dt / 16.7);
        nextMeteor -= dt;
        if (nextMeteor <= 0 && isDark()) {
          spawnMeteor();
          nextMeteor = 8000 + Math.random() * 9000;
        }
        draw(now);
      }
    }
    raf = window.requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  if (fine) {
    window.addEventListener('pointermove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      targetPx = (e.clientX / width) * 2 - 1;
      targetPy = (e.clientY / height) * 2 - 1;
    }, { passive: true });
    window.addEventListener('pointerleave', () => { mouseX = -9999; mouseY = -9999; });
  }

  // Redibuja cuando cambia el tema
  const observer = new MutationObserver(() => draw(performance.now()));
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  if (!reduce) raf = window.requestAnimationFrame(loop);
  window.addEventListener('beforeunload', () => window.cancelAnimationFrame(raf));
}
