document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (!header) return;

  header.innerHTML = `
    <div class="main-header">
      <div class="logo">Nordic Appael</div>

      <nav class="main-nav">
        <a href="index.html">Start</a>
        <a href="produktkatalog.html">Produktkatalog</a>
        <a href="#inspiration">Inspiration</a>
        <a href="#gallery">Galleri</a>
        <a href="#support">Kundservice</a>
        <a href="info.html">Om oss</a>
        <button class="cta-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket" viewBox="0 0 16 16">
  <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5"/>
</svg> <a href="info.html">shoppa nu</a></button>
      </nav>
    </div>
  `;
});

document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('footer');
  if (!footer) return;

  footer.innerHTML = `
    <p class="p-fotter">&copy; Feisel production</p>
    <p>Call us: +46700123456</p>
  `;
});


// Add interactivity to existing .style elements and observe .reveal elements
document.addEventListener('DOMContentLoaded', () => {
  // Make .style elements interactive (toggle .active on click/keyboard)
  const styleElements = document.querySelectorAll('.style');
  styleElements.forEach((el) => {
    el.classList.add('hero-title');
    el.tabIndex = el.tabIndex || 0;
    el.addEventListener('click', () => el.classList.toggle('active'));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.classList.toggle('active');
      }
    });
  });

  // Reveal-on-scroll: observe elements with .reveal and add .visible when in viewport
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if (prefersReduced) {
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  reveals.forEach(el => observer.observe(el));
});



