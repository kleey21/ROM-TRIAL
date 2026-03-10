/* =========================================
   GIRLFRIEND PROPOSAL — Shared JS
   ========================================= */

// ——— Floating Hearts ———
function createHeartsContainer() {
  const container = document.createElement('div');
  container.className = 'hearts-container';
  document.body.prepend(container);

  const EMOJIS = ['❤️', '💕', '💗', '💖', '💝', '🌸', '✨', '💫'];
  const count = 18;

  function spawnHeart() {
    const el = document.createElement('span');
    el.className = 'floating-heart';
    el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    el.style.left = Math.random() * 100 + 'vw';
    const dur = 7 + Math.random() * 10;
    const size = 0.8 + Math.random() * 1.6;
    el.style.fontSize = size + 'rem';
    el.style.animationDuration = dur + 's';
    el.style.animationDelay = Math.random() * 6 + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + 6) * 1000);
  }

  for (let i = 0; i < count; i++) spawnHeart();
  setInterval(() => spawnHeart(), 1800);
}

// ——— Sparkle on Click ———
function initSparkles() {
  document.addEventListener('click', (e) => {
    const SPARKS = ['✨', '💫', '⭐', '🌟', '💥'];
    for (let i = 0; i < 5; i++) {
      const el = document.createElement('span');
      el.className = 'sparkle';
      el.textContent = SPARKS[Math.floor(Math.random() * SPARKS.length)];
      const angle = (Math.PI * 2 / 5) * i;
      const dist = 30 + Math.random() * 40;
      el.style.left = (e.clientX + Math.cos(angle) * dist) + 'px';
      el.style.top = (e.clientY + Math.sin(angle) * dist) + 'px';
      el.style.position = 'fixed';
      el.style.pointerEvents = 'none';
      el.style.zIndex = 9999;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 700);
    }
  });
}

// ——— Particle Canvas ———
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 0.5 + Math.random() * 1.5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    alpha: 0.2 + Math.random() * 0.5,
    hue: 340 + Math.floor(Math.random() * 30)
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${p.alpha})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
}


// ——— Init All ———
document.addEventListener('DOMContentLoaded', () => {
  createHeartsContainer();
  initSparkles();
  initParticles();
});
