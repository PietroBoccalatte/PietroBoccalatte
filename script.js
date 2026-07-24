// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll reveal — elements fade and rise into view as the page is scrolled
const revealEls = document.querySelectorAll('.reveal');

// Stagger cards that share a row/grid so they don't all pop in at once
let staggerIndex = 0;
let lastParent = null;
revealEls.forEach(el => {
  if (el.parentElement !== lastParent) {
    staggerIndex = 0;
    lastParent = el.parentElement;
  }
  el.style.transitionDelay = `${Math.min(staggerIndex, 4) * 90}ms`;
  staggerIndex++;
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
} else {
  // Fallback: no IntersectionObserver support — just show everything
  revealEls.forEach(el => el.classList.add('is-visible'));
}
