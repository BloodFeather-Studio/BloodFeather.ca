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
const drawer = document.querySelector('.nav-drawer');
if (hamburger && drawer) {
  hamburger.setAttribute('aria-controls', drawer.id || 'mobile-navigation');
  if (!drawer.id) drawer.id = 'mobile-navigation';
  hamburger.setAttribute('aria-expanded', 'false');

  const setDrawer = (open) => {
    hamburger.classList.toggle('open', open);
    drawer.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  hamburger.addEventListener('click', () => setDrawer(!drawer.classList.contains('open')));
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setDrawer(false)));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setDrawer(false);
  });
}

// ── Active nav link ───────────────────────────────────
const currentPath = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '');
const currentSection = currentPath.split('/').filter(Boolean).pop() || 'home';
document.querySelectorAll('.nav-links a, .nav-drawer a, .footer-nav a').forEach(a => {
  const linkPath = new URL(a.getAttribute('href') || '.', window.location.href).pathname
    .replace(/\/index\.html$/, '')
    .replace(/\/$/, '');
  const linkSection = linkPath.split('/').filter(Boolean).pop() || 'home';
  if (linkSection === currentSection) {
    a.classList.add('active');
    a.setAttribute('aria-current', 'page');
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

// ── Contact form: static-site safe mailto handoff ─────
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const data = new FormData(contactForm);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const subjectValue = String(data.get('subject') || 'general');
    const subjectSelect = contactForm.querySelector('#subject');
    const subjectLabel = subjectSelect?.selectedOptions?.[0]?.textContent?.trim() || 'General Message';
    const message = String(data.get('message') || '').trim();
    const wantsUpdates = data.get('wishlist') ? 'Yes' : 'No';

    const mailSubject = `[BloodFeather Studio] ${subjectLabel}`;
    const mailBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Topic: ${subjectLabel} (${subjectValue})`,
      `Neon Steel updates: ${wantsUpdates}`,
      '',
      message
    ].join('\n');

    const mailto = `mailto:bloodfeatherstudio@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    window.location.href = mailto;

    const success = document.getElementById('form-success');
    if (success) {
      success.classList.add('show');
      success.querySelector('h3').textContent = 'Message Ready';
      success.querySelector('p').textContent = 'Your email app should open with the message filled in. Review it, then send it from there.';
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

// ── Subtle parallax on hero feather ──────────────────
const heroFeather = document.querySelector('.hero-feather-bg');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (heroFeather && !reduceMotion) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY * 0.18;
    heroFeather.style.transform = `translateY(calc(-50% + ${y}px))`;
  }, { passive: true });
}
