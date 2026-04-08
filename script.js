const CART_KEY = 'nornorna_cart_count';

const cartBtn = document.getElementById('cart');
const toastRegion = document.getElementById('toastRegion');

function getCartCount() {
  const n = Number.parseInt(localStorage.getItem(CART_KEY) ?? '0', 10);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function setCartCount(count) {
  localStorage.setItem(CART_KEY, String(count));
  if (cartBtn) cartBtn.textContent = `Cart (${count})`;
}

function toast(title, message) {
  if (!toastRegion) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<strong>${title}</strong><div>${message}</div>`;
  toastRegion.appendChild(el);
  window.setTimeout(() => {
    el.remove();
  }, 2600);
}

// Init cart UI
setCartCount(getCartCount());

// Add to cart (product buttons on shop / collections page)
document.querySelectorAll('.add-to-cart').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const next = getCartCount() + 1;
    setCartCount(next);
    const item = btn.getAttribute('data-item') || 'Item';
    toast('Added to cart', item);
  });
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

function setNavOpen(open) {
  if (!navLinks || !navToggle) return;
  navLinks.dataset.open = open ? 'true' : 'false';
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.dataset.open === 'true';
    setNavOpen(!open);
  });

  navLinks.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setNavOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setNavOpen(false);
  });
}

// Lightbox for Instagram tiles
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(imgEl) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = imgEl.currentSrc || imgEl.src;
  lightboxImg.alt = imgEl.alt || 'Preview image';
  if (lightboxCaption) lightboxCaption.textContent = imgEl.alt || '';
  lightbox.dataset.open = 'true';
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.dataset.open = 'false';
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.insta-tile').forEach((tile) => {
  tile.addEventListener('click', () => {
    const img = tile.querySelector('img');
    if (img) openLightbox(img);
  });
});

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    const target = e.target;
    if (target instanceof HTMLElement && target.classList.contains('lightbox-backdrop')) {
      closeLightbox();
    }
  });
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});