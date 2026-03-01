/* ============================================================
   Navigation — scroll border + mobile toggle
   ============================================================ */
const navHeader = document.getElementById('nav-header');
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

// Nav already has a border; nothing extra needed on scroll for terminal style.
// Keep toggle for mobile.
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ============================================================
   Active nav link on scroll
   ============================================================ */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function setActiveLink() {
  const y = window.scrollY + 80;
  sections.forEach(sec => {
    const anchor = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
    if (!anchor) return;
    const active = y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight;
    anchor.style.color = active ? 'var(--bright)' : '';
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

/* ============================================================
   Fade-in on scroll
   ============================================================ */
const fadeEls = document.querySelectorAll(
  '.stat-card, .ls-row, .project-card, .git-entry, .about-text, .about-stats, .contact-info'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const fadeObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      // Stagger siblings slightly
      setTimeout(() => e.target.classList.add('visible'), i * 40);
      fadeObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

fadeEls.forEach(el => fadeObs.observe(el));

/* ============================================================
   Skill bar animation
   ============================================================ */
const bars = document.querySelectorAll('.skill-fill');
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('animated');
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
bars.forEach(b => barObs.observe(b));

/* ============================================================
   Hero terminal — type-in effect
   ============================================================ */
(function heroType() {
  const term = document.getElementById('hero-term');
  if (!term) return;

  // Lines are already rendered in HTML; we reveal them progressively.
  const lines = term.querySelectorAll('.t-line, .t-out');
  lines.forEach(l => { l.style.opacity = '0'; });

  let delay = 300;
  lines.forEach(line => {
    setTimeout(() => {
      line.style.transition = 'opacity 0.2s ease';
      line.style.opacity    = '1';
    }, delay);
    delay += line.classList.contains('t-out') ? 250 : 120;
  });
})();

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
    formStatus.style.color = 'var(--red)';
    formStatus.textContent = '> Error: name, email, and message are required.';
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled     = true;
  btn.textContent  = '$ sending...';
  formStatus.style.color  = 'var(--muted)';
  formStatus.textContent  = '> Connecting to mail server...';

  await new Promise(r => setTimeout(r, 1200));

  formStatus.style.color  = 'var(--green)';
  formStatus.textContent  = '> ✓ Message sent! I\'ll reply within 24 hours.';
  form.reset();
  btn.disabled    = false;
  btn.textContent = '$ send --message ↵';
});
