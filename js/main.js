/* ====================================================
   SHIVAM PARAB PORTFOLIO — MAIN JS
   ==================================================== */

// ─── PAGE LOADER ───────────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1000);
  }
});

// ─── AOS INIT ──────────────────────────────────────────
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 80
});

// ─── NAV SCROLL ────────────────────────────────────────
const nav = document.getElementById('nav');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (nav) {
    const scrolled = window.scrollY > 60;
    nav.classList.toggle('scrolled', scrolled);
  }
  if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
  updateActiveNavLink();
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── MOBILE NAV ────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    const bars = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  });

  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(b => {
        b.style.transform = '';
        b.style.opacity = '';
      });
    });
  });
}

// ─── ACTIVE NAV LINK ───────────────────────────────────
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const links = document.querySelectorAll('.nav__link');
  let current = '';

  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ─── CUSTOM CURSOR ─────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

if (cursor && cursorFollower && window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateCursor() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const interactableSelector = 'a, button, .project-card, .skill-group, .edu-card, .case-panel';
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactableSelector)) {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.8)';
      cursorFollower.style.borderColor = 'rgba(168, 85, 247, 0.8)';
    }
  });

  document.addEventListener('mouseout', (e) => {
    const parentContainer = e.target.closest(interactableSelector);
    if (parentContainer) {
      if (!e.relatedTarget || !parentContainer.contains(e.relatedTarget)) {
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.borderColor = 'rgba(168, 85, 247, 0.5)';
      }
    }
  });
}

// ─── TYPED ROLE EFFECT ─────────────────────────────────
const roles = [
  'Software Engineer',
  'Backend & .NET Developer',
  'Full-Stack Developer',
  'Game Developer',
  'Unity & Interactive Systems',
  'Games Educator & Lecturer'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedRole');

function typeRole() {
  if (!typedEl) return;

  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typedEl.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, 2200);
      return;
    }
    setTimeout(typeRole, 80);
  } else {
    typedEl.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 400);
      return;
    }
    setTimeout(typeRole, 40);
  }
}
if (typedEl) setTimeout(typeRole, 800);

// ─── HERO CANVAS PARTICLES ─────────────────────────────
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const PARTICLE_COUNT = 80;
  const particles = [];

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '124, 58, 237' : '168, 85, 247';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.25;
          ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();
})();

// ─── SKILL BAR ANIMATION ───────────────────────────────
(function () {
  const skillBars = document.querySelectorAll('.skill-bar__fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => observer.observe(bar));
})();

// ─── CONTACT FORM ──────────────────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
      btn.style.background = 'var(--success)';
      formSuccess.classList.add('visible');
      contactForm.reset();

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
        btn.style.background = '';
      }, 4000);
    }, 900);
  });
}

// ─── SMOOTH ANCHOR SCROLL ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h'));
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── PROJECT CARD TILT ─────────────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!prefersReducedMotion.matches) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
      card.style.transform = `translateY(-4px) rotateX(${y}deg) rotateY(${x}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });
}

// ─── COUNTER ANIMATION (STAT CARDS) ────────────────────
function animateCounter(el, target, suffix = '') {
  let start = 0;
  // Dynamic duration: finish small numbers faster so they don't 'hang' and stutter
  const duration = target < 20 ? 800 : 1500; 
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    // Quartic ease-out for a much smoother deceleration curve
    const eased = 1 - Math.pow(1 - progress, 4); 
    if (typeof target === 'number') {
      el.textContent = Math.floor(eased * target) + suffix;
    }
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-card__num').forEach(num => {
        const text = num.textContent.trim();
        const match = text.match(/^(\d+)(.*)$/);
        if (match) {
          animateCounter(num, parseInt(match[1]), match[2]);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.about__stats');
if (statsSection) statsObserver.observe(statsSection);
