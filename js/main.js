/**
 * MonPortfolio - main.js
 * Entry point for site interactivity.
 */

const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

function closeMenu() {
  navLinks.classList.remove('nav__links--open');
  navLinks.inert = true;
  navToggle.classList.remove('nav__toggle--active');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Ouvrir le menu');
}

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('nav__links--open');
  navLinks.inert = !isOpen;
  navToggle.classList.toggle('nav__toggle--active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

const themeToggle = document.querySelector('.theme-toggle');

function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-label', theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair');
}

const storedTheme = localStorage.getItem('theme');
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
applyTheme(storedTheme || (systemPrefersLight ? 'light' : 'dark'));

themeToggle.addEventListener('click', () => {
  const nextTheme = getCurrentTheme() === 'light' ? 'dark' : 'light';
  applyTheme(nextTheme);
  localStorage.setItem('theme', nextTheme);
});

const siteHeader = document.querySelector('.site-header');
let scrollTicking = false;

function updateHeaderState() {
  siteHeader.classList.toggle('site-header--scrolled', window.scrollY > 20);
  scrollTicking = false;
}

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(updateHeaderState);
    scrollTicking = true;
  }
});

updateHeaderState();

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal--visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((section) => {
  section.classList.add('reveal--pending');
  revealObserver.observe(section);
});

function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}

function renderProjectCard(project) {
  const name = escapeHtml(project.name);
  const description = escapeHtml(project.description || 'Pas de description disponible.');
  const url = escapeHtml(project.url);
  const updatedAt = new Date(project.updatedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const tags = project.language
    ? `<ul class="project-card__tags" role="list"><li class="project-card__tag">${escapeHtml(project.language)}</li></ul>`
    : '';

  return `
    <article class="project-card">
      <div class="project-card__banner"></div>
      <h3 class="project-card__title"><a href="${url}" target="_blank" rel="noopener">${name}<span class="sr-only"> (nouvel onglet)</span></a></h3>
      <p class="project-card__description">${description}</p>
      <p class="project-card__date">Mis à jour le ${updatedAt}</p>
      ${tags}
      <a href="${url}" class="project-card__link" aria-label="Voir sur GitHub : ${name} (nouvel onglet)" target="_blank" rel="noopener">Voir sur GitHub</a>
    </article>
  `;
}

async function loadProjects() {
  const grid = document.querySelector('.projects__grid');
  if (!grid) {
    return;
  }

  try {
    const response = await fetch('data/projects.json');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const projects = await response.json();
    grid.innerHTML = projects.map(renderProjectCard).join('');
  } catch (error) {
    grid.innerHTML = '<p class="projects__status">Impossible de charger les projets pour le moment.</p>';
    console.error('Erreur de chargement des projets :', error);
  }
}

loadProjects();

const CONTACT_EMAIL = 'fmamalet@gmail.com';
const contactForm = document.querySelector('.contact-form');
const contactStatus = document.querySelector('.contact-form__status');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const name = contactForm.elements.name.value.trim();
    const email = contactForm.elements.email.value.trim();
    const message = contactForm.elements.message.value.trim();

    const subject = encodeURIComponent(`Contact depuis le portfolio - ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    if (contactStatus) {
      contactStatus.textContent = 'Votre client mail va s\'ouvrir avec votre message pré-rempli.';
    }
  });
}
