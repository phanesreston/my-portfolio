/* ============================================================
   Navigation — scroll shadow + mobile toggle
   ============================================================ */
const navHeader = document.getElementById('nav-header');
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navHeader.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ============================================================
   Smooth active nav link highlighting
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function setActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const anchor = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!anchor) return;
    if (scrollY >= top && scrollY < top + height) {
      navAnchors.forEach(a => a.classList.remove('active'));
      anchor.classList.add('active');
    }
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

/* ============================================================
   Fade-in on scroll (IntersectionObserver)
   ============================================================ */
const fadeTargets = document.querySelectorAll(
  '.stat-card, .skill-group, .project-card, .blog-card, .contact-form, .contact-info, .about-text, .about-stats'
);

fadeTargets.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeTargets.forEach(el => fadeObserver.observe(el));

/* ============================================================
   Skill bar animation
   ============================================================ */
const skillBars = document.querySelectorAll('.skill-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => barObserver.observe(bar));

/* ============================================================
   Contact form (demo — logs to console; wire up to your backend)
   ============================================================ */
const contactForm = document.getElementById('contact-form');
const formStatus  = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all required fields.';
    formStatus.style.color = '#dc2626';
    return;
  }

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  // Simulate async send (replace with real fetch/API call)
  await new Promise(resolve => setTimeout(resolve, 1200));

  formStatus.textContent = 'Message sent! I\'ll be in touch soon.';
  formStatus.style.color = '#16a34a';
  contactForm.reset();
  submitBtn.disabled = false;
  submitBtn.textContent = 'Send Message';
});

/* ============================================================
   Typed/rotating role text in hero (optional flair)
   ============================================================ */
const roles = [
  'Full Stack Developer & UI Designer',
  'React & Node.js Enthusiast',
  'Open Source Contributor',
  'Problem Solver',
];
const roleEl = document.querySelector('.hero-role');

if (roleEl) {
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let pause = false;

  function typeRole() {
    if (pause) return;

    const current = roles[roleIndex];
    const display = deleting
      ? current.substring(0, charIndex--)
      : current.substring(0, charIndex++);

    // Preserve the divider span
    const divider = roleEl.querySelector('.role-divider');
    roleEl.textContent = display;
    if (divider && !deleting && charIndex > current.indexOf('&') + 1) {
      // re-inject span
    }

    if (!deleting && charIndex > current.length) {
      pause = true;
      setTimeout(() => { deleting = true; pause = false; }, 2200);
    } else if (deleting && charIndex < 0) {
      deleting = false;
      charIndex = 0;
      roleIndex = (roleIndex + 1) % roles.length;
      pause = true;
      setTimeout(() => { pause = false; }, 400);
    }

    const speed = deleting ? 40 : 65;
    setTimeout(typeRole, speed);
  }

  // Start after a short delay
  setTimeout(typeRole, 1000);
}
