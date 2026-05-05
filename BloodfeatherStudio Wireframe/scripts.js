/* BloodFeather Studio — shared scripts */
'use strict';

// ── Nav scroll behavior ───────────────────────────────
const nav = document.querySelector('.nav');
if (nav) {
  const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });
}

// ── Mobile hamburger ──────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const drawer    = document.querySelector('.nav-drawer');
if (hamburger && drawer) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    drawer.classList.toggle('open');
    document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
  });
  drawer.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    })
  );
}

// ── Active nav link ───────────────────────────────────
const path = window.location.pathname;
document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
  const href = a.getAttribute('href') || '';
  if (href && path.includes(href.replace('../', '').replace('/', ''))) {
    a.classList.add('active');
  }
});

// ── Scroll reveal ─────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const ro = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });
  revealEls.forEach(el => ro.observe(el));
}

// ── Contact form ──────────────────────────────────────
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn  = form.querySelector('[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Sent!';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = orig; btn.disabled = false; form.reset(); }, 3000);
  });
}

// ── Subtle parallax on hero feather ──────────────────
const heroFeather = document.querySelector('.hero-feather-bg');
if (heroFeather) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY * 0.18;
    heroFeather.style.transform = `translateY(calc(-50% + ${y}px))`;
  }, { passive: true });
}
