const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const parallax = document.querySelectorAll('[data-parallax]');
const reveal = document.querySelectorAll('.reveal');

if (!reduceMotion) {
  let queued = false;
  const updateParallax = () => {
    const y = window.scrollY;
    parallax.forEach((el) => {
      el.style.transform = `translate3d(0, ${y * Number(el.dataset.parallax)}px, 0)`;
    });
    queued = false;
  };
  window.addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(updateParallax); }
  }, { passive: true });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('in'); });
}, { threshold: .16 });
reveal.forEach((el) => observer.observe(el));

/* Números: animação que roda e para no valor final (padrão site + mídia kit) */
const numObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting || entry.target.dataset.done) return;
    entry.target.dataset.done = '1';
    const node = entry.target;
    const target = Number(node.dataset.number);
    const suffix = node.dataset.suffix || '';
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / 1600);
      const eased = 1 - Math.pow(1 - p, 3);
      let v = target * eased;
      if (p < 1) { v = Math.max(0, v + (Math.random() * .3 - .15) * (1 - p)); requestAnimationFrame(tick); }
      else { v = target; }
      node.innerHTML = `${v.toFixed(1).replace('.', ',')}<em>${suffix}</em>`;
    };
    requestAnimationFrame(tick);
  });
}, { threshold: .5 });
document.querySelectorAll('[data-number]').forEach((node) => numObs.observe(node));

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { event.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* Formatos: clique expande com animação */
document.querySelectorAll('.format-row').forEach((row) => {
  row.addEventListener('click', () => {
    const wasOpen = row.classList.contains('open');
    document.querySelectorAll('.format-row.open').forEach((r) => r.classList.remove('open'));
    if (!wasOpen) row.classList.add('open');
  });
});

/* Carrossel automático das simulações no mobile (rola só a fita, só quando visível) */
(function () {
  const strip = document.querySelector('.campaign-strip');
  if (!strip || !window.matchMedia('(max-width: 760px)').matches || reduceMotion) return;
  const items = [...strip.children];
  if (items.length < 2) return;
  let idx = 0, paused = false, visible = false, resumeTimer;
  new IntersectionObserver((entries) => { visible = entries[0].isIntersecting; }, { threshold: 0.35 }).observe(strip);
  const advance = () => {
    if (paused || !visible) return;
    idx = (idx + 1) % items.length;
    const item = items[idx];
    strip.scrollTo({ left: item.offsetLeft - (strip.clientWidth - item.offsetWidth) / 2, behavior: 'smooth' });
  };
  setInterval(advance, 3600);
  ['pointerdown', 'touchstart', 'wheel'].forEach((ev) =>
    strip.addEventListener(ev, () => {
      paused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { paused = false; }, 6000);
    }, { passive: true })
  );
})();
