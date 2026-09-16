const navbar = document.getElementById('navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = [...document.querySelectorAll('.nav-menu a')];
const sections = [...document.querySelectorAll('main section[id]')];

// Footer year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Mobile navigation
menuToggle?.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.innerHTML = open ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
});

navLinks.forEach(link => link.addEventListener('click', () => {
  navMenu.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) menuToggle.innerHTML = '<i class="bi bi-list"></i>';
}));

// Navbar + active section
function updateScrollState() {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  let current = 'home';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

// Reveal-on-scroll animations
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Subtle pointer movement for hero visual
const visual = document.querySelector('.hero-visual');
if (visual && window.matchMedia('(pointer:fine)').matches) {
  visual.addEventListener('mousemove', e => {
    const rect = visual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const card = visual.querySelector('.profile-card');
    if (card) card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
  });
  visual.addEventListener('mouseleave', () => {
    const card = visual.querySelector('.profile-card');
    if (card) card.style.transform = '';
  });
}
