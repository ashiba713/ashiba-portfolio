// ============================================
//  ASHIBA PORTFOLIO — main.js
//  Fetches all content from REST API endpoints
// ============================================

// ---- NAV SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- HAMBURGER ----
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ---- ACTIVE NAV ----
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
});

// ---- SCROLL REVEAL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function applyReveal() {
  document.querySelectorAll('.skill-group, .project-card, .timeline-item, .research-card, .cert-item, .stat-card').forEach(el => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    }
  });
}

// ============================================
//  API HELPERS
// ============================================
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// ============================================
//  RENDER: SKILLS
// ============================================
async function loadSkills() {
  const grid = document.getElementById('skillsGrid');
  try {
    const { data } = await fetchJSON('/api/skills');
    grid.innerHTML = data.map(skill => `
      <div class="skill-group">
        <div class="skill-group-icon">${skill.icon}</div>
        <h3>${skill.category}</h3>
        <div class="skill-tags">
          ${skill.items.map(item => `<span>${item}</span>`).join('')}
        </div>
      </div>
    `).join('');
  } catch (err) {
    grid.innerHTML = '<p class="loading-msg">Could not load skills.</p>';
  }
  applyReveal();
}

// ============================================
//  RENDER: PROJECTS
// ============================================
async function loadProjects() {
  const grid = document.getElementById('projectsGrid');
  try {
    const { data } = await fetchJSON('/api/projects');
    grid.innerHTML = data.map(p => `
      <div class="project-card ${p.featured ? 'featured' : ''}">
        <div class="project-tag">${p.tag}</div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-stack">
          ${p.stack.map(s => `<span>${s}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${p.githubUrl}" target="_blank" rel="noopener" class="project-link">GitHub →</a>
          ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noopener" class="project-link" style="margin-left:1rem;">Live Demo →</a>` : ''}
        </div>
      </div>
    `).join('');
  } catch (err) {
    grid.innerHTML = '<p class="loading-msg">Could not load projects.</p>';
  }
  applyReveal();
}

// ============================================
//  RENDER: EXPERIENCE
// ============================================
async function loadExperience() {
  const timeline = document.getElementById('timeline');
  try {
    const { data } = await fetchJSON('/api/profile');
    timeline.innerHTML = data.experience.map(exp => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-meta">${exp.period}</div>
          <h3>${exp.role}</h3>
          <p class="timeline-company">${exp.company} · ${exp.location}</p>
          <ul>
            ${exp.points.map(pt => `<li>${pt}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  } catch (err) {
    timeline.innerHTML = '<p class="loading-msg">Could not load experience.</p>';
  }
  applyReveal();
}

// ============================================
//  RENDER: PATENTS + PUBLICATIONS
// ============================================
async function loadResearch() {
  const grid = document.getElementById('researchGrid');
  try {
    const { data } = await fetchJSON('/api/profile');

    const patentsHTML = `
      <div class="research-col">
        <h3 class="research-col-title">Patents Filed</h3>
        ${data.patents.map(p => `
          <div class="research-card">
            <div class="research-type">Patent · ${p.date}</div>
            <h4>${p.title}</h4>
            <p>${p.description} <span class="app-num">App. No. ${p.appNo}</span></p>
            <span class="role-badge">${p.role}</span>
          </div>
        `).join('')}
      </div>
    `;

    const pubsHTML = `
      <div class="research-col">
        <h3 class="research-col-title">Publications</h3>
        ${data.publications.map(p => `
          <div class="research-card">
            <div class="research-type">Journal · ${p.date}</div>
            <h4>${p.title}</h4>
            <p>${p.description}</p>
            <span class="role-badge pub">${p.publisher}</span>
          </div>
        `).join('')}
      </div>
    `;

    grid.innerHTML = patentsHTML + pubsHTML;
  } catch (err) {
    grid.innerHTML = '<p class="loading-msg">Could not load research.</p>';
  }
  applyReveal();
}

// ============================================
//  RENDER: CERTIFICATIONS
// ============================================
async function loadCertifications() {
  const grid = document.getElementById('certGrid');
  try {
    const { data } = await fetchJSON('/api/profile');
    grid.innerHTML = data.certifications.map(c => `
      <div class="cert-item">
        <span class="cert-org">${c.org}</span>
        <span class="cert-name">${c.name}</span>
      </div>
    `).join('');
  } catch (err) {
    grid.innerHTML = '<p class="loading-msg">Could not load certifications.</p>';
  }
  applyReveal();
}

// ============================================
//  CONTACT FORM
// ============================================
const form      = document.getElementById('contactForm');
const statusDiv = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Clear previous errors
  document.querySelectorAll('.form-group input, .form-group textarea')
    .forEach(el => el.classList.remove('error'));

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Client-side validation
  let hasError = false;
  if (!name)    { markError('name');    hasError = true; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { markError('email'); hasError = true; }
  if (!subject) { markError('subject'); hasError = true; }
  if (!message || message.length < 10) { markError('message'); hasError = true; }

  if (hasError) {
    showStatus('Please fill in all fields correctly.', 'error');
    return;
  }

  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  try {
    const res  = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    });
    const data = await res.json();

    if (res.ok && data.success) {
      showStatus("Message sent! I'll get back to you soon 🙌", 'success');
      form.reset();
    } else {
      const errMsg = data.errors ? data.errors.join(' ') : 'Something went wrong.';
      showStatus(errMsg, 'error');
    }
  } catch {
    showStatus('Network error. Please try again later.', 'error');
  } finally {
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  }
});

function markError(id) {
  document.getElementById(id).classList.add('error');
}
function showStatus(msg, type) {
  statusDiv.textContent = msg;
  statusDiv.className   = `form-status ${type}`;
  setTimeout(() => { statusDiv.textContent = ''; statusDiv.className = 'form-status'; }, 6000);
}

// ============================================
//  INIT — load all sections
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  loadSkills();
  loadProjects();
  loadExperience();
  loadResearch();
  loadCertifications();

  // Static reveal for hero stats
  document.querySelectorAll('.stat-card, .section-label, .section-title, .about-grid, .contact-grid').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
});
