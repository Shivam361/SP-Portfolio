/* ====================================================
   SHIVAM PARAB PORTFOLIO — MAIN JS
   ==================================================== */

// ─── PAGE LOADER ───────────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      // Start GSAP animations after loader is gone
      if (typeof heroTl !== 'undefined') heroTl.play();
      if (typeof caseHeroTl !== 'undefined') caseHeroTl.play();
    }, 1000);
  }
});

// ─── GSAP + SCROLLTRIGGER ─────────────────────────────
gsap.registerPlugin(ScrollTrigger);


// ─── LENIS SMOOTH SCROLL ───────────────────────────────
const lenis = new Lenis({
  duration: 1.3,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
});

// Single authoritative tick loop — drives both Lenis and ScrollTrigger
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);
lenis.on('scroll', () => {
  ScrollTrigger.update();
});

// Refresh ScrollTrigger once everything is loaded
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});

// ─── GSAP SCROLL ANIMATIONS ────────────────────────────

// Hero entrance — stagger in on page load
// Pause by default, will be played by loader event listener
const heroTl = gsap.timeline({ delay: 0.2, paused: true });

// Split Type for Hero Name
let heroNameSplit;
if (typeof SplitType !== 'undefined' && document.querySelector('.hero__name')) {
  heroNameSplit = new SplitType('.hero__name', { types: 'chars' });
}

heroTl
  .from('.hero__eyebrow',    { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out' });

if (heroNameSplit) {
  heroTl.from(heroNameSplit.chars, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.05 }, '-=0.4');
} else {
  heroTl.from('.hero__name', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');
}

heroTl
  .from('.hero__roles',      { y: 24, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
  .from('.hero__summary',    { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
  .from('.hero__cta',        { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
  .from('.hero__socials',    { y: 10, opacity: 0, duration: 0.4 }, '-=0.2')
  .from('.hero__scroll-hint',{ opacity: 0, duration: 0.5 }, '-=0.1');

// ─── CASE STUDY HERO ANIMATION ─────────────────────────
let caseHeroTl;
if (document.querySelector('.case-hero')) {
  caseHeroTl = gsap.timeline({ delay: 0.2, paused: true });

  let caseTitleSplit;
  if (typeof SplitType !== 'undefined' && document.querySelector('.case-hero__title')) {
    caseTitleSplit = new SplitType('.case-hero__title', { types: 'chars' });
  }

  caseHeroTl
    .from('.case-breadcrumb', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' });

  if (caseTitleSplit) {
    caseHeroTl.from(caseTitleSplit.chars, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.03 }, '-=0.4');
  } else {
    caseHeroTl.from('.case-hero__title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');
  }

  caseHeroTl
    .from('.case-hero__icon',    { scale: 0.5, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.6')
    .from('.case-hero__lead',    { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .from('.case-hero__actions .btn', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, '-=0.3')
    .from('.case-meta .tag',     { scale: 0.8, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }, '-=0.3');
}

// Section titles slide up as they enter viewport
if (typeof SplitType !== 'undefined') {
  gsap.utils.toArray('.section__title').forEach(title => {
    const splitTitle = new SplitType(title, { types: 'chars' });
    gsap.from(splitTitle.chars, {
      y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.02,
      scrollTrigger: { trigger: title, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });
} else {
  gsap.utils.toArray('.section__title').forEach(el => {
    gsap.from(el, {
      y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });
}

gsap.utils.toArray('.section__eyebrow').forEach(el => {
  gsap.from(el, {
    y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
  });
});

// Project cards stagger in from below
gsap.utils.toArray('.project-card').forEach((card, i) => {
  gsap.from(card, {
    y: 60, opacity: 0, duration: 0.75, ease: 'power3.out', delay: (i % 2) * 0.12,
    scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
  });
});

// Timeline items slide in from the left
gsap.utils.toArray('.timeline__item').forEach((item, i) => {
  gsap.from(item, {
    x: -40, opacity: 0, duration: 0.7, ease: 'power2.out', delay: i * 0.06,
    scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' }
  });
});

// Skill groups and edu cards fade + scale up
gsap.utils.toArray('.skill-group, .edu-card').forEach((el, i) => {
  gsap.from(el, {
    y: 30, opacity: 0, scale: 0.97, duration: 0.65, ease: 'power2.out', delay: (i % 3) * 0.08,
    scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
  });
});

// Case study items fade up
gsap.utils.toArray('.case-panel, .case-prose, .case-cta-bar').forEach((el, i) => {
  gsap.from(el, {
    y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' }
  });
});

// ─── NAV SCROLL ────────────────────────────────────────
const nav = document.getElementById('nav');
const backToTop = document.getElementById('backToTop');

lenis.on('scroll', ({ scroll }) => {
  if (nav) nav.classList.toggle('scrolled', scroll > 60);
  if (backToTop) backToTop.classList.toggle('visible', scroll > 400);
  updateActiveNavLink();
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    lenis.scrollTo(0, { duration: 1.4 });
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

  let velX = 0, velY = 0;
  const spring = 0.08, friction = 0.82;

  function animateCursor() {
    velX += (mouseX - followerX) * spring;
    velY += (mouseY - followerY) * spring;
    velX *= friction;
    velY *= friction;
    followerX += velX;
    followerY += velY;
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

// ─── MAGNETIC BUTTONS ──────────────────────────────────
document.querySelectorAll('.btn, .social-icon, .nav__link').forEach(btn => {
  let magRafId = null;
  let mx = 0, my = 0;
  let isMagHovered = false;

  btn.addEventListener('mouseenter', () => {
    isMagHovered = true;
    btn.style.transition = 'none';
  });

  btn.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (!magRafId) {
      magRafId = requestAnimationFrame(function updateMagnetic() {
        if (!isMagHovered) {
          magRafId = null;
          return;
        }
        const rect = btn.getBoundingClientRect();
        const x = (mx - rect.left - rect.width / 2) * 0.18;
        const y = (my - rect.top - rect.height / 2) * 0.18;
        btn.style.transform = `translate(${x}px, ${y}px)`;
        magRafId = requestAnimationFrame(updateMagnetic);
      });
    }
  });

  btn.addEventListener('mouseleave', () => {
    isMagHovered = false;
    btn.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
    btn.style.transform = `translate(0px, 0px)`;
  });
});

// ─── SPOTLIGHT CARDS ───────────────────────────────────
document.querySelectorAll('.project-card, .skill-card, .case-panel, .stat-card').forEach(card => {
  let spotlightRafId = null;
  let mx = 0, my = 0;
  let isSpotHovered = false;

  card.addEventListener('mouseenter', () => isSpotHovered = true);
  card.addEventListener('mouseleave', () => isSpotHovered = false);

  card.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (!spotlightRafId) {
      spotlightRafId = requestAnimationFrame(function updateSpotlight() {
        if (!isSpotHovered) {
          spotlightRafId = null;
          return;
        }
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--spot-x', `${mx - rect.left}px`);
        card.style.setProperty('--spot-y', `${my - rect.top}px`);
        spotlightRafId = requestAnimationFrame(updateSpotlight);
      });
    }
  });
});

// ─── TYPED ROLE EFFECT ─────────────────────────────────
if (typeof Typed !== 'undefined' && document.getElementById('typedRole')) {
  new Typed('#typedRole', {
    strings: [
      'Software Engineer',
      'Backend & .NET Developer',
      'Full-Stack Developer',
      'Game Developer',
      'Unity & Interactive Systems',
      'Games Educator & Lecturer'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|',
    autoInsertCss: true
  });
}

// ─── 3D BACKGROUNDS (VANTA.JS) ─────────────────────────
if (typeof VANTA !== 'undefined') {
  const vantaConfigs = [
    {
      id: 'vanta-bg',
      color: 0x7c3aed, // Brand primary
      backgroundColor: 0x0f0f16,
      points: 12.0, maxDistance: 22.0, spacing: 16.0
    },
    {
      id: 'vanta-bg-case',
      color: 0x14b8a6, // Teal for cases
      backgroundColor: 0x08080c,
      points: 10.0, maxDistance: 24.0, spacing: 18.0
    },
    {
      id: 'vanta-bg-contact',
      color: 0xa855f7, // Violet for contact
      backgroundColor: 0x0f0f16,
      points: 9.0, maxDistance: 25.0, spacing: 20.0
    }
  ];

  const vantaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const config = vantaConfigs.find(c => c.id === entry.target.id);
      if (!config) return;
      
      if (entry.isIntersecting) {
        if (!entry.target.vantaEffect) {
          entry.target.vantaEffect = VANTA.NET({
            el: `#${config.id}`,
            mouseControls: true, touchControls: true, gyroControls: false,
            minHeight: 200.0, minWidth: 200.0, scale: 1.0, scaleMobile: 1.0,
            color: config.color, backgroundColor: config.backgroundColor,
            points: config.points, maxDistance: config.maxDistance, spacing: config.spacing,
            showDots: true
          });
        }
      } else {
        if (entry.target.vantaEffect) {
          entry.target.vantaEffect.destroy();
          entry.target.vantaEffect = null;
        }
      }
    });
  }, { rootMargin: '100px 0px' });

  vantaConfigs.forEach(config => {
    const el = document.getElementById(config.id);
    if (el) vantaObserver.observe(el);
  });
}

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
      lenis.scrollTo(target, { offset: -navH, duration: 1.4 });
    }
  });
});

// ─── PROJECT CARD TILT ─────────────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!prefersReducedMotion.matches) {
  document.querySelectorAll('.project-card').forEach(card => {
    let rafId = null;
    let mx = 0, my = 0;
    let isHovering = false;

    card.addEventListener('mouseenter', () => {
      isHovering = true;
      card.style.transition = 'none';
      card.style.willChange = 'transform';
    });

    card.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(function updateTilt() {
          if (!isHovering) {
            rafId = null;
            return;
          }
          const rect = card.getBoundingClientRect();
          const x = ((mx - rect.left) / rect.width - 0.5) * 6;
          const y = ((my - rect.top) / rect.height - 0.5) * -6;
          card.style.transform = `perspective(1000px) translateY(-4px) rotateX(${y}deg) rotateY(${x}deg)`;
          rafId = requestAnimationFrame(updateTilt);
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      isHovering = false;
      card.style.willChange = 'auto';
      card.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
      card.style.transform = 'perspective(1000px) translateY(0) rotateX(0deg) rotateY(0deg)';
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

