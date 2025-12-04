document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (!header) return;

  header.innerHTML = `
    <div class="main-header">
      <div class="logo">Nordic Appael</div>

      <nav class="main-nav">
        <a href="index.html">Start</a>
        <a href="#products">Produktkatalog</a>
        <a href="#inspiration">Inspiration</a>
        <a href="#gallery">Galleri</a>
        <a href="#support">Kundservice</a>
        <a href="info.html">Om oss</a>
        <button class="cta-btn"> <a href="info.html">shoppa nu</a></button>
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



