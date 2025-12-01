document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (!header) return;

  header.innerHTML = `
    <div class="main-header">
      <div class="logo">Nordic Apparel</div>

      <nav class="main-nav">
        <a href="index.html">Start</a>
        <a href="#products">Produktkatalog</a>
        <a href="#inspiration">Inspiration</a>
        <a href="#gallery">Galleri</a>
        <a href="#support">Kundservice</a>
        <a href="info.html">Om oss</a>
        <button class="cta-btn">Shoppa nu</button>
      </nav>
    </div>
  `;
});

const div = document.addEventListener(´'div.bg-box', ()  => {
  const div = document.querySelector('div.bg-box');
  if (!div) return;

  div.innerHTML = `
    <div class="bg-box"></div>
  `;
});