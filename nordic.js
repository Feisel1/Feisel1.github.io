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



document.addEventListener('DOMContentLoaded', () => {

  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    let bgBox = document.querySelector('div.bg-box');
    
    
    if (!bgBox) {
      const main = document.querySelector('main');
      if (main) {
        bgBox = document.createElement('div');
        bgBox.className = 'bg-box';
        main.insertBefore(bgBox, main.firstChild);
      }
    }

    if (bgBox) {
      
      const title = document.createElement('h1');
      title.textContent = 'Välkommen till Nordic Appeal';
      title.className = 'hero-title';

      
      bgBox.appendChild(title);
    }
  }
});