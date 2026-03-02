/* ============================================================
   Navigation — scroll state + mobile toggle
   ============================================================ */
const nav       = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

/* ============================================================
   Active nav link on scroll
   ============================================================ */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-menu a[href^="#"]');

function setActiveLink() {
  const y = window.scrollY + 90;
  sections.forEach(sec => {
    const anchor = document.querySelector(`.nav-menu a[href="#${sec.id}"]`);
    if (!anchor) return;
    const active = y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight;
    anchor.style.color = active ? 'var(--text)' : '';
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

/* ============================================================
   Fade-in on scroll
   ============================================================ */
const fadeEls = document.querySelectorAll(
  '.work-card, .photo-cell, .about-stat, .contact-list li, .writing-item'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const fadeObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      fadeObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => fadeObs.observe(el));

/* ============================================================
   Section scroll-next buttons
   ============================================================ */
document.querySelectorAll('.scroll-next').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.next);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ============================================================
   Contact form
   ============================================================ */
const form       = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formStatus.style.color = '#f87171';
    formStatus.textContent = 'Please fill in your name, email, and message.';
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled    = true;
  btn.textContent = 'Sending…';
  formStatus.style.color  = 'var(--text-2)';
  formStatus.textContent  = 'Sending your message…';

  await new Promise(r => setTimeout(r, 1200));

  formStatus.style.color  = 'var(--accent)';
  formStatus.textContent  = '✓ Message sent! I\'ll reply within 24 hours.';
  form.reset();
  btn.disabled    = false;
  btn.textContent = 'Send Message';
});
