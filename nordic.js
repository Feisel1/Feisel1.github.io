document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (!header) return;

  header.innerHTML = `
    <div class="main-header">
      <div class="logo">Nordic Appael</div>

      <nav class="main-nav">
        <a href="index.html">Start sidan</a>
        <a href="produktkatalog.html">Produktkatalog</a>
        <a href="#inspiration">Inspiration</a>
        <a href="#gallery">Galleri</a>
        <a href="#support">Kundservice</a>
        <a href="info.html">Om oss</a>
        <button class="cta-btn"><a href="produktkatalog.html">shoppa nu</a></button>
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



document.addEventListener('DOMContentLoaded', () => {
 
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
