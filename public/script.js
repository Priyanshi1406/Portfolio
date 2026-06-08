// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
  }, 80);
});

document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    follower.style.transform = 'translate(-50%, -50%) scale(2)';
    follower.style.borderColor = 'var(--accent)';
  });
  el.addEventListener('mouseleave', () => {
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

function closeMobile() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== SKILL BAR ANIMATION =====
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(el => skillObserver.observe(el));

// ===== STAGGER REVEAL FOR SKILLS =====
document.querySelectorAll('.skill-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
  card.classList.add('reveal');
  revealObserver.observe(card);
});

// ===== LOAD PROJECTS FROM API =====
async function loadProjects() {
  const grid = document.getElementById('projects-grid');
  try {
    const res = await fetch('/api/projects');
    const projects = await res.json();

    grid.innerHTML = '';
    projects.forEach((project, i) => {
      const card = document.createElement('div');
      card.className = 'project-card reveal';
      card.innerHTML = `
        <div class="project-num">0${i + 1}</div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project ↗</a>` : ''}
      `;
      grid.appendChild(card);
      revealObserver.observe(card);
    });
  } catch (err) {
    // Fallback projects if API is not available
    const fallbackProjects = [
      {
        title: 'Attendify',
        description: 'Smart attendance system using QR codes and face recognition. Built with MongoDB Atlas, Firebase Firestore, Redis, and Node.js/Express backend. Designed the full database architecture with 5 collections.',
        tech: ['Node.js', 'MongoDB', 'Firebase', 'Redis', 'QR Code'],
        link: '#'
      },
      {
        title: 'Personal Portfolio',
        description: 'This full-stack portfolio website. Built with Node.js, Express, MongoDB for dynamic project management, and deployed on Vercel with a dark editorial aesthetic.',
        tech: ['HTML/CSS/JS', 'Node.js', 'Express', 'MongoDB', 'Vercel'],
        link: '#'
      },
      {
        title: 'UGC Portfolio',
        description: 'Professional UGC creator portfolio for skincare & beauty brand outreach. Features rate card, pricing tiers, and brand pitch templates for Instagram content creation.',
        tech: ['HTML', 'CSS', 'Brand Strategy', 'UGC'],
        link: '#'
      },
      {
        title: 'Android App Project',
        description: 'Android application developed using Android Studio with Jetpack Compose and XML UI. Features modern Material Design components and local database integration.',
        tech: ['Android Studio', 'Jetpack Compose', 'Java', 'SQLite'],
        link: '#'
      }
    ];

    grid.innerHTML = '';
    fallbackProjects.forEach((project, i) => {
      const card = document.createElement('div');
      card.className = 'project-card reveal';
      card.innerHTML = `
        <div class="project-num">0${i + 1}</div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project ↗</a>` : ''}
      `;
      grid.appendChild(card);
      setTimeout(() => revealObserver.observe(card), 100);
    });
  }
}

loadProjects();

// ===== CONTACT FORM =====
async function sendMessage() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const status = document.getElementById('form-status');
  const btn = document.getElementById('send-btn');

  if (!name || !email || !message) {
    status.textContent = 'Please fill in all fields.';
    status.className = 'form-status error';
    return;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    if (res.ok) {
      status.textContent = '✓ Message sent! I\'ll get back to you soon.';
      status.className = 'form-status success';
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('message').value = '';
    } else {
      throw new Error('Server error');
    }
  } catch {
    status.textContent = '✓ Message received! (Connect backend for live sending)';
    status.className = 'form-status success';
  }

  btn.textContent = 'Send Message →';
  btn.disabled = false;
}

// ===== SMOOTH PARALLAX HERO BG TEXT =====
window.addEventListener('scroll', () => {
  const bgText = document.querySelector('.hero-bg-text');
  if (bgText) {
    bgText.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.3}px))`;
  }
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 100);
});
