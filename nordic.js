document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (!header) return;

  header.innerHTML = `
    <div class="main-header">
      <div class="logo">Nordic Appael</div>

      <nav class="main-nav">
        <a href="index.html">Start sidan</a>
        <a href="produktkatalog.html">Produktkatalog</a>
        <a href="inspiration.html">Inspiration</a>
        <a href="galleri.html">Galleri</a>
        <a href="kund.html">Kundservice</a>
        <a href="info.html">Om oss</a>
         <a href="kassa.html">Kassa</a>
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
function changeImage(thumbnail) {
  const mainImg = document.getElementById('mainImage');
  mainImg.src = thumbnail.src;
  
  document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
  thumbnail.classList.add('active');
}

function selectSize(button) {
  document.querySelectorAll('.size-option').forEach(b => b.classList.remove('selected'));
  button.classList.add('selected');
}

function selectColor(colorDiv) {
  document.querySelectorAll('.color-option').forEach(c => c.classList.remove('selected'));
  colorDiv.classList.add('selected');
}

function addToCart() {
  const titleEl = document.querySelector('.product-title');
  const priceEl = document.querySelector('.product-price');
  const mainImg = document.getElementById('mainImage');
  const sizeEl = document.querySelector('.size-option.selected');
  const colorEl = document.querySelector('.color-option.selected');

  if (!titleEl || !priceEl || !mainImg) {
    alert('Kan inte lägga till: produktsida saknar nödvändig info.');
    return;
  }

  const name = titleEl
    ? (titleEl.dataset.productName || titleEl.textContent.trim())
    : (document.querySelector('[data-product-name]')?.dataset.productName || mainImg.alt || 'Produkt');
  const price = parseInt(priceEl.textContent.replace(/[^0-9]/g,''), 10) || 0;
  const image = mainImg.src;
  const size = sizeEl ? sizeEl.textContent.trim() : 'One size';
  const color = colorEl ? (colorEl.title || colorEl.getAttribute('data-color') || '') : '';

  const existing = cartData.find(i => i.name === name && i.size === size && i.color === color);
  if (existing) {
    existing.quantity += 1;
  } else {
    cartData.push({ id: Date.now(), name, price, image, size, color, quantity: 1 });
  }

  saveCart();
  renderCart();
  alert('Produkten lades till i varukorgen ✅');
}
// Ladda/spara korg från localStorage så korgen inte förifylls
function loadCart() {
  const data = localStorage.getItem('cartData');
  try {
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Kunde inte läsa cartData från localStorage', e);
    return [];
  }
}
function saveCart() {
  localStorage.setItem('cartData', JSON.stringify(cartData));
}

let cartData = loadCart();

  let discountApplied = false;
  let discountAmount = 0;

  function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cartData.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart">
          <h2>Din varukorg är tom</h2>
          <p>Lägg till produkter för att fortsätta</p>
          <a href="produktkatalog.html" class="continue-shopping">Fortsätt shoppa</a>
        </div>
      `;
      updateSummary();
      return;
    }

    cartItemsContainer.innerHTML = cartData.map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="item-details">
          <h3>${item.name}</h3>
          <p>Storlek: ${item.size} | Färg: ${item.color}</p>
          <div class="quantity-controls">
            <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
            <span class="qty-display">${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
          </div>
        </div>
        <div>
          <p class="item-price">${item.price * item.quantity} kr</p>
          <button class="remove-btn" onclick="removeItem(${index})">✕</button>
        </div>
      </div>
    `).join('');

    updateSummary();
  }

  function updateQuantity(index, change) {
    cartData[index].quantity += change;
    
    if (cartData[index].quantity <= 0) {
      removeItem(index);
      return;
    }
    
    saveCart();
    renderCart();
  }

  function removeItem(index) {
    cartData.splice(index, 1);
    saveCart();
    renderCart();
  }

  function updateSummary() {
    const subtotal = cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = subtotal >= 500 ? 0 : 49;
    const finalDiscount = discountApplied ? discountAmount : 0;
    const total = subtotal + shippingCost - finalDiscount;

    document.getElementById('subtotal').textContent = subtotal + ' kr';
    document.getElementById('shipping').textContent = shippingCost === 0 ? 'Gratis!' : shippingCost + ' kr';
    document.getElementById('total').textContent = total + ' kr';

    if (discountApplied) {
      document.getElementById('discountRow').style.display = 'flex';
      document.getElementById('discount').textContent = '-' + finalDiscount + ' kr';
    }

   
    const freeShippingBar = document.getElementById('freeShippingBar');
    const freeShippingText = document.getElementById('freeShippingText');
    
    if (subtotal > 0 && subtotal < 500) {
      const remaining = 500 - subtotal;
      freeShippingBar.style.display = 'block';
      freeShippingText.textContent = `Handla för ${remaining} kr till för fri frakt! 🚚`;
    } else if (subtotal >= 500) {
      freeShippingBar.style.display = 'block';
      freeShippingText.textContent = '🎉 Grattis! Du har fri frakt!';
    } else {
      freeShippingBar.style.display = 'none';
    }
  }

  function applyDiscount() {
    const code = document.getElementById('discountInput').value.toUpperCase();
    
    const validCodes = {
      'NORDIC10': 50,
      'WELCOME': 100,
      'VIP20': 150
    };

    if (validCodes[code]) {
      discountApplied = true;
      discountAmount = validCodes[code];
      alert(`Rabattkod tillagd! Du sparar ${discountAmount} kr`);
      document.getElementById('discountInput').value = '';
      updateSummary();
    } else if (code) {
      alert('Ogiltig rabattkod. Försök igen.');
    }
  }

  function proceedToCheckout() {
    if (cartData.length === 0) {
      alert('Din varukorg är tom!');
      return;
    }
    
    alert('Tack för ditt köp! ');
    // In a real application, redirect to checkout page
    // window.location.href = 'checkout.html';
  }

  // Initialize cart
  renderCart();
function toggleFAQ(element) {
  const answer = element.nextElementSibling;
  const isActive = element.classList.contains('active');
  
  // Stäng alla andra FAQ
  document.querySelectorAll('.faq-question').forEach(q => {
    q.classList.remove('active');
    q.nextElementSibling.classList.remove('active');
  });
  
  // Öppna klickad FAQ om den inte redan var öppen
  if (!isActive) {
    element.classList.add('active');
    answer.classList.add('active');
  }
}

function submitForm(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  alert(`Tack för ditt meddelande, ${name}!\n\nVi har mottagit din förfrågan och återkommer så snart som möjligt till ${email}.`);
  
  // Rensa formuläret
  event.target.reset();
}