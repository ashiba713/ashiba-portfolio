
// Simple static portfolio script

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // ===== Skills =====
  const skillsGrid = document.getElementById('skillsGrid');
  if (skillsGrid) {
    skillsGrid.innerHTML = `
      <div class="skill-card"><h3>Python</h3></div>
      <div class="skill-card"><h3>Machine Learning</h3></div>
      <div class="skill-card"><h3>Data Science</h3></div>
      <div class="skill-card"><h3>JavaScript</h3></div>
      <div class="skill-card"><h3>HTML & CSS</h3></div>
      <div class="skill-card"><h3>MongoDB</h3></div>
    `;
  }

  // ===== Projects =====
  const projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid) {
    projectsGrid.innerHTML = `
      <div class="project-card">
        <h3>Helpzy</h3>
        <p>AI-powered smart service booking platform for Kanyakumari.</p>
      </div>

      <div class="project-card">
        <h3>Near-Miss Intelligence Platform</h3>
        <p>Computer vision system that detects traffic near-miss events and visualizes high-risk zones.</p>
      </div>

      <div class="project-card">
        <h3>Sepsis Early Detection</h3>
        <p>Clinical AI system for predicting early sepsis risk using healthcare data.</p>
      </div>
    `;
  }

  // ===== Experience =====
  const timeline = document.getElementById('timeline');
  if (timeline) {
    timeline.innerHTML = `
      <div class="timeline-item">
        <h3>AI Intern — FlyRank</h3>
        <p>Worked on machine learning workflows, GitHub collaboration, and AI-powered automation projects.</p>
      </div>
    `;
  }

  // ===== Research =====
  const researchGrid = document.getElementById('researchGrid');
  if (researchGrid) {
    researchGrid.innerHTML = `
      <div class="research-card">
        <h3>Journal Publications</h3>
        <p>Co-authored two peer-reviewed research papers in AI and healthcare analytics.</p>
      </div>

      <div class="research-card">
        <h3>Patents Filed</h3>
        <p>Filed three innovation-focused patent applications related to AI-driven systems.</p>
      </div>
    `;
  }

  // ===== Certifications =====
  const certGrid = document.getElementById('certGrid');
  if (certGrid) {
    certGrid.innerHTML = `
      <div class="cert-card"><h3>Python for Data Science</h3></div>
      <div class="cert-card"><h3>Machine Learning Fundamentals</h3></div>
      <div class="cert-card"><h3>Web Development Basics</h3></div>
    `;
  }

  // ===== Contact Form =====
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (formStatus) {
        formStatus.textContent =
          'Thanks! Your message has been received.';
      }

      contactForm.reset();
    });
  }
});

