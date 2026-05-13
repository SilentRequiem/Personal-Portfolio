// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Water reveals with GSAP
if (window.gsap){
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.water-mask').forEach((el) => {
    const dir = el.dataset.direction || 'down';
    let from, to;
    switch (dir){
      case 'down':  from = 'inset(0 0 100% 0)'; to = 'inset(0 0 0 0)'; break;
      case 'up':    from = 'inset(100% 0 0 0)'; to = 'inset(0 0 0 0)'; break;
      case 'left':  from = 'inset(0 100% 0 0)'; to = 'inset(0 0 0 0)'; break;
      case 'right': from = 'inset(0 0 0 100%)'; to = 'inset(0 0 0 0)'; break;
    }
    gsap.fromTo(el, { clipPath: from }, {
      clipPath: to, ease: 'power2.out', duration: 1.0,
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
    });
  });

  gsap.utils.toArray('.card, .rope__node').forEach((item) => {
    gsap.from(item, { y: 30, opacity: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: item, start: 'top 85%' } });
  });
}

// Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('is-done'), 400);
});

// Background music control
const audioEl   = document.getElementById('bgm');
const toggleBtn = document.getElementById('soundToggle');

const saved = localStorage.getItem('bgm');
if (saved === 'on') {
  audioEl.muted = false;
  document.addEventListener('pointerdown', armPlayOnce, { once:true });
  toggleBtn.setAttribute('aria-pressed', 'true');
  toggleBtn.textContent = '🔊';
} else {
  audioEl.muted = true;
  toggleBtn.setAttribute('aria-pressed', 'false');
  toggleBtn.textContent = '🔈';
}

function armPlayOnce() {
  audioEl.play().catch(()=>{});
}

toggleBtn.addEventListener('click', () => {
  const willPlay = toggleBtn.getAttribute('aria-pressed') !== 'true';
  toggleBtn.setAttribute('aria-pressed', String(willPlay));
  if (willPlay) {
    audioEl.muted = false;
    audioEl.play().catch(()=>{});
    localStorage.setItem('bgm', 'on');
    toggleBtn.textContent = '🔊';
  } else {
    audioEl.pause();
    audioEl.muted = true;
    localStorage.setItem('bgm', 'off');
    toggleBtn.textContent = '🔈';
  }
});

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  localStorage.setItem('bgm', 'off');
  toggleBtn.setAttribute('aria-pressed', 'false');
  audioEl.pause(); audioEl.muted = true;
}
