/* ================================================================
   MOBILE NAV TOGGLE
   ================================================================ */
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close the menu automatically once a link is tapped
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ================================================================
   SCROLL REVEAL
   ================================================================ */
const REVEAL_THRESHOLD = 0.15;   // 0 = as soon as 1px is visible, 1 = fully visible
const REVEAL_STAGGER_MS = 90;    // delay between cards in the same row/group
const REVEAL_STAGGER_MAX = 4;    // cap the stagger so long lists don't take forever

const revealEls = document.querySelectorAll('.reveal');

// Give cards that share a parent (e.g. all cards in one grid) a
// slightly increasing delay, so they cascade in one after another
// instead of all appearing at the exact same instant.
let staggerIndex = 0;
let lastParent = null;
revealEls.forEach(el => {
  if (el.parentElement !== lastParent) {
    staggerIndex = 0;
    lastParent = el.parentElement;
  }
  el.style.transitionDelay = `${Math.min(staggerIndex, REVEAL_STAGGER_MAX) * REVEAL_STAGGER_MS}ms`;
  staggerIndex++;
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // only animate in once
      }
    });
  }, { threshold: REVEAL_THRESHOLD, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
} else {
  // Very old browsers without IntersectionObserver: just show everything
  revealEls.forEach(el => el.classList.add('is-visible'));
}

/* ================================================================
   HERO CURSOR-TRACKING GLOW (homepage banner only)
   ================================================================ */
const heroSection = document.querySelector('.hero');

if (heroSection) {
  heroSection.addEventListener('mousemove', (event) => {
    const bounds = heroSection.getBoundingClientRect();
    const xPercent = ((event.clientX - bounds.left) / bounds.width) * 100;
    const yPercent = ((event.clientY - bounds.top) / bounds.height) * 100;
    heroSection.style.setProperty('--mx', `${xPercent}%`);
    heroSection.style.setProperty('--my', `${yPercent}%`);
  });
}
