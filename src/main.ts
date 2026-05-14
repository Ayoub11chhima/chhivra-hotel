import './style.css';

// === Preloader ===
window.addEventListener('load', () => {
    setTimeout(() => {
          document.getElementById('preloader')?.classList.add('hidden');
    }, 2500);
});

// === Header scroll effect ===
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 80);
});

// === Mobile nav toggle ===
const menuToggle = document.getElementById('menu-toggle');
const navOverlay = document.getElementById('nav-overlay');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('[data-nav]');

menuToggle?.addEventListener('click', () => navOverlay?.classList.add('active'));
navClose?.addEventListener('click', () => navOverlay?.classList.remove('active'));
navLinks.forEach(link => link.addEventListener('click', () => navOverlay?.classList.remove('active')));

// === Scroll animations ===
const animateElements = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
          if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                  observer.unobserve(entry.target);
          }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
animateElements.forEach(el => observer.observe(el));

// === Counter anim
