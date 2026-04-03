/* ====================================================
   SHIVAM PARAB PORTFOLIO — MAIN JS
   ==================================================== */

let heroTl, caseHeroTl, vantaEffect, swup;

/**
 * CACHED UI SINGLETONS
 * Elements outside the #swup container that persist across page views.
 */
const UI = {
  nav: document.getElementById('nav'),
  navLinks: document.querySelectorAll('.nav__link'),
  backToTop: document.getElementById('backToTop'),
  hamburger: document.getElementById('hamburger'),
  mobileNav: document.getElementById('navLinks'),
  cursor: document.getElementById('cursor'),
  cursorFollower: document.getElementById('cursorFollower'),
  root: document.documentElement
};

// ─── PAGE LOADER & SWUP INIT ───────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    const loaderText = loader.querySelector('.loader__text');
    if (loaderText && typeof gsap !== 'undefined') {
      const counter = { val: 0 };
      gsap.to(counter, {
        val: 100,
        duration: 0.9,
        ease: 'power2.out',
        onUpdate: () => { loaderText.innerText = Math.round(counter.val) + '%'; }
      });
    }

    setTimeout(() => {
      loader.classList.add('hidden');
      if (heroTl) heroTl.play();
      if (caseHeroTl) caseHeroTl.play();
    }, 1000);
  }

  // Bind Swup Framework — only on http/https (Swup uses fetch() which is blocked on file://)
  const isServed = window.location.protocol.startsWith('http');
  if (typeof Swup !== 'undefined' && isServed) {
    swup = new Swup({
      containers: ['#swup'],
      animationSelector: '[class*="transition-"]',
    });
    
    swup.hooks.on('visit:start', () => {
      try {
        document.querySelectorAll('[id^="vanta-bg"]').forEach(el => {
          if (el.vantaEffect) { el.vantaEffect.destroy(); el.vantaEffect = null; }
        });
        if (window.typedInstance) { window.typedInstance.destroy(); window.typedInstance = null; }
      } catch (err) {
        console.warn('Silent cleanup error:', err);
      }
    });

    swup.hooks.on('content:replace', (visit) => {
      // If the user navigated to a #hash (e.g. index.html#about), scroll there instantly
      if (visit.to.hash) {
        const target = document.querySelector(visit.to.hash);
        if (target && typeof lenis !== 'undefined') {
          const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
          lenis.scrollTo(target, { offset: -navH, immediate: true });
          return;
        }
      }
      // Otherwise, snap to the absolute top of the new page
      window.scrollTo(0, 0);
      if (typeof lenis !== 'undefined') lenis.scrollTo(0, { immediate: true });
    });

    swup.hooks.on('page:view', () => {
      // Clean previous scroll states & listeners
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.scrollTo(0, 0);
      
      initPage();  // Re-arm GSAP staggered entrances
      initPage2(); // Re-arm dynamic interactive DOM states
      
      // Play immediately (loader is bypassed by Swup)
      if (heroTl) heroTl.play();
      if (caseHeroTl) caseHeroTl.play();
    });
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
function initPage() {
  if (vantaEffect) { vantaEffect.destroy(); vantaEffect = null; }

  // Hero entrance — stagger in on page load
  // Pause by default, will be played by loader event listener
  heroTl = gsap.timeline({ delay: 0.2, paused: true });

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

} // <--- END initPage()

// ─── NAV & SCROLL EFFECTS ────────────────────────────
lenis.on('scroll', ({ scroll }) => {
  if (UI.nav) UI.nav.classList.toggle('scrolled', scroll > 60);
  if (UI.backToTop) UI.backToTop.classList.toggle('visible', scroll > 400);
});

if (UI.backToTop) {
  UI.backToTop.addEventListener('click', () => {
    lenis.scrollTo(0, { duration: 1.4 });
  });
}

// ─── MOBILE NAV ────────────────────────────────────────
if (UI.hamburger && UI.mobileNav) {
  UI.hamburger.addEventListener('click', () => {
    UI.mobileNav.classList.toggle('open');
    UI.hamburger.classList.toggle('active');
    const bars = UI.hamburger.querySelectorAll('span');
    if (UI.mobileNav.classList.contains('open')) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  });

  UI.mobileNav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      UI.mobileNav.classList.remove('open');
      UI.hamburger.classList.remove('active');
      UI.hamburger.querySelectorAll('span').forEach(b => {
        b.style.transform = '';
        b.style.opacity = '';
      });
    });
  });
}



// ─── CUSTOM CURSOR ─────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

if (UI.cursor && UI.cursorFollower && window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    UI.cursor.style.left = mouseX + 'px';
    UI.cursor.style.top = mouseY + 'px';
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
    UI.cursorFollower.style.left = followerX + 'px';
    UI.cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  const interactableSelector = 'a, button, .project-card, .skill-group, .edu-card, .case-panel';
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactableSelector)) {
      UI.cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.8)';
      UI.cursorFollower.style.borderColor = 'rgba(168, 85, 247, 0.8)';
    }
  });

  document.addEventListener('mouseout', (e) => {
    const parentContainer = e.target.closest(interactableSelector);
    if (parentContainer) {
      if (!e.relatedTarget || !parentContainer.contains(e.relatedTarget)) {
        UI.cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        UI.cursorFollower.style.borderColor = 'rgba(168, 85, 247, 0.5)';
      }
    }
  });

}

// ─── DYNAMIC INTERACTABLES INIT ────────────────────────
function initPage2() {

// ─── MAGNETIC BUTTONS ──────────────────────────────────
document.querySelectorAll('.btn, .social-icon, .nav__link').forEach(btn => {
  if (btn.dataset.magBound) return;
  btn.dataset.magBound = 'true';
  
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
  if (card.dataset.spotBound) return;
  card.dataset.spotBound = 'true';
  
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
  if (window.typedInstance) window.typedInstance.destroy();
  window.typedInstance = new Typed('#typedRole', {
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
const vantaConfigs = [
  { id: 'vanta-bg', color: 0x7c3aed, backgroundColor: 0x0f0f16, points: 12.0, maxDistance: 22.0, spacing: 16.0 },
  { id: 'vanta-bg-case', color: 0x14b8a6, backgroundColor: 0x08080c, points: 10.0, maxDistance: 24.0, spacing: 18.0 },
  { id: 'vanta-bg-contact', color: 0xa855f7, backgroundColor: 0x0f0f16, points: 9.0, maxDistance: 25.0, spacing: 20.0 }
];

let vantaObserver;
if (typeof VANTA !== 'undefined') {
  vantaObserver = new IntersectionObserver((entries) => {
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
}

// ─── SCROLL SPY NAVIGATION ─────────────────────────────
let spyObserver;
if (typeof IntersectionObserver !== 'undefined') {
  spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        UI.navLinks.forEach(link => {
          link.classList.remove('active');
          const href = link.getAttribute('href');
          if (href === `#${id}` || href === `index.html#${id}`) link.classList.add('active');
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
}


// ─── STATS OBSERVER ────────────────────────────────────
let statsObserver;
if (typeof IntersectionObserver !== 'undefined') {
  statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-card__num').forEach(num => {
          const text = num.textContent.trim();
          const match = text.match(/^(\d+)(.*)$/);
          if (match) animateCounter(num, parseInt(match[1]), match[2]);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
}


// ─── IMAGE PARALLAX ────────────────────────────────────
if (typeof gsap !== 'undefined') {
  gsap.utils.toArray('.project-card__media').forEach(media => {
    const imgWrap = media.querySelector('.project-card__img-wrap');
    if (imgWrap) {
      gsap.to(imgWrap, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: media,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
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
    const originalText = btn.innerHTML;
    
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    const formData = new FormData(contactForm);

    fetch('https://formsubmit.co/ajax/parabshivam@gmail.com', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
      btn.style.background = 'var(--success)';
      
      formSuccess.querySelector('span').innerHTML = 'Message sent securely via FormSubmit. I will get back to you soon!';
      formSuccess.classList.add('visible');
      contactForm.reset();

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.style.background = '';
      }, 5000);
    })
    .catch(error => {
      btn.innerHTML = '<span>Error Sending</span> <i class="fas fa-times"></i>';
      btn.style.background = '#e53e3e';
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.style.background = '';
      }, 4000);
    });
  });
}

// Custom Global Hash Routing Strategy
if (typeof Swup !== 'undefined') {
  document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href) return;
      
      const hashIndex = href.indexOf('#');
      if (hashIndex !== -1) {
        // Exclude external links immediately if target is _blank
        if (anchor.getAttribute('target') === '_blank') return;
        
        const hash = href.substring(hashIndex);
        const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
        
        // If the hash is ONLY #home, #about, etc. or index.html#about
        if (href.startsWith('#') || href.startsWith('index.html#')) {
          e.preventDefault();
          
          if (isHome) {
            // We are already on Home. Smooth scroll to the section.
            const target = document.querySelector(hash);
            if (target && typeof lenis !== 'undefined') {
              const navH = parseInt(getComputedStyle(UI.root).getPropertyValue('--nav-h')) || 80;
              lenis.scrollTo(target, { offset: -navH, duration: 1.4 });
            }
          } else {
            // We are on a project page trying to access a home section. Fire Swup to navigate there.
            if (typeof swup !== 'undefined') {
              swup.navigate('index.html' + hash);
            } else {
              window.location.href = 'index.html' + hash;
            }
          }
        }
      }
    });
  });
}

// ─── PROJECT CARD TILT ─────────────────────────────────
// (Project Card 3D Tilt removed to resolve severe FPS drop and stuttering)

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

  // Re-observe elements for the new DOM
  vantaConfigs.forEach(config => {
    const el = document.getElementById(config.id);
    if (el && vantaObserver) vantaObserver.observe(el);
  });

  const spySections = document.querySelectorAll('section[id]');
  if (spySections.length > 0 && spyObserver) {
    spySections.forEach(sec => spyObserver.observe(sec));
  }

  const statsSection = document.querySelector('.about__stats');
  if (statsSection && statsObserver) statsObserver.observe(statsSection);


  // Intercept inline JS routing from project cards and pass directly to Swup
  document.querySelectorAll('[onclick]').forEach(el => {
    const script = el.getAttribute('onclick');
    if (script && script.includes('window.location.href')) {
      const match = script.match(/window\.location\.href\s*=\s*['"]([^'"]+)['"]/);
      if (match && match[1]) {
        el.removeAttribute('onclick'); 
        el.addEventListener('click', (e) => {
          e.preventDefault();
          if (typeof swup !== 'undefined') swup.navigate(match[1]);
          else window.location.href = match[1];
        });
      }
    }
  });

  // Recalculate heights for the new DOM content
  if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();

  // Initialize GitHub Activity
  initGitHubActivity();

} // <--- END initPage2()

// ─── GITHUB ACTIVITY FETCHING ──────────────────────────
async function initGitHubActivity() {
  const GITHUB_USER = 'Shivam361';
  const repoContainer = document.getElementById('githubRepoList');
  const reposCountEl = document.getElementById('githubRepos');
  const followersCountEl = document.getElementById('githubFollowers');

  if (!repoContainer) return;

  try {
    // 1. Fetch Profile Stats
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USER}`);
    if (userRes.ok) {
      const userData = await userRes.json();
      if (reposCountEl) reposCountEl.textContent = userData.public_repos;
      if (followersCountEl) followersCountEl.textContent = userData.followers;
    }

    // 2. Fetch Latest Repos (Sorting by 'pushed' to get latest activity)
    const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=3`);
    if (reposRes.ok) {
      const repos = await reposRes.json();
      repoContainer.innerHTML = ''; // Clear skeletons

      repos.forEach(repo => {
        const repoCard = document.createElement('a');
        repoCard.href = repo.html_url;
        repoCard.target = '_blank';
        repoCard.rel = 'noopener';
        repoCard.className = 'github-repo-card';
        
        repoCard.innerHTML = `
          <span class="github-repo-name">${repo.name}</span>
          <div class="github-repo-meta">
            <span class="github-repo-lang">
              <span class="lang-dot" style="background-color: ${getLanguageColor(repo.language)}"></span>
              ${repo.language || 'Code'}
            </span>
            <span class="github-repo-stars"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
          </div>
        `;
        repoContainer.appendChild(repoCard);
      });
    }
  } catch (err) {
    console.error('GitHub API error:', err);
    repoContainer.innerHTML = '<p style="font-size:0.75rem; color:var(--text-dim);">Activity feed temporarily unavailable.</p>';
  }
}

function getLanguageColor(lang) {
  const colors = {
    'C#': '#178600',
    'C++': '#f34b7d',
    'JavaScript': '#f1e05a',
    'Python': '#3572A5',
    'TypeScript': '#3178c6',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Kotlin': '#A97BFF',
    'ShaderLab': '#222c37'
  };
  return colors[lang] || 'var(--accent)';
}

// Call initialization immediately on the first hard-load
initPage();
initPage2();
