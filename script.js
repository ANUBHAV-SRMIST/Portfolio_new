// ══════════════════════════════════════
//   ANUBHAV MISHRA — PORTFOLIO SCRIPTS
//   script.js
// ══════════════════════════════════════


// ── MOBILE NAV TOGGLE ──
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
  document.getElementById('navOverlay').classList.toggle('active');
  document.getElementById('hamburger').classList.toggle('active');
}
// ── CLOSE NAV WHEN TAPPING OVERLAY ──
document.getElementById('navOverlay').addEventListener('click', () => {
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('navOverlay').classList.remove('active');
  document.getElementById('hamburger').classList.remove('active');
});

// ── HIGHLIGHT ACTIVE NAV LINK ON SCROLL ──
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });

  const activeLink = document.querySelector('.nav-links a.active');
  if (activeLink) moveIndicator(activeLink);
}
window.addEventListener('scroll', updateActiveNav);
// ── FLOATING NAV ON SCROLL ──
const navEl = document.querySelector('nav');
const SCROLL_THRESHOLD = 40;

function updateNavScrollState() {
  if (window.scrollY > SCROLL_THRESHOLD) {
    navEl.classList.add('nav-scrolled');
  } else {
    navEl.classList.remove('nav-scrolled');
  }
}

window.addEventListener('scroll', updateNavScrollState);
window.addEventListener('DOMContentLoaded', updateNavScrollState);


// ── FADE-IN ELEMENTS ON SCROLL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
// ── STAGGERED GALLERY ENTRANCE ──
document.querySelectorAll('.gallery-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 90}ms`;
});

// ── STAGGERED GRID CARD ENTRANCE (Skills / Specializations / Projects) ──
document.querySelectorAll('.skills-grid, .spec-cards, .projects-grid').forEach(grid => {
  grid.querySelectorAll('.fade-in').forEach((card, i) => {
    card.style.transitionDelay = `${i * 90}ms`;
  });
});


// ── CLOSE MOBILE NAV WHEN A LINK IS CLICKED ──
navAnchors.forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('navOverlay').classList.remove('active');
    document.getElementById('hamburger').classList.remove('active');
  });
});
// ── CONTACT FORM SEND (EmailJS) ──
(function() {
  emailjs.init("r6EtzKxLyAlRozhrZ");
})();

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const sendBtn = contactForm.querySelector('.btn-send');
  const originalText = sendBtn.innerHTML;
  sendBtn.innerHTML = 'Sending...';
  sendBtn.disabled = true;

  emailjs.sendForm('service_wo89b3s', 'template_8yon559', contactForm)
    .then(() => {
      alert('Thanks! Your message has been sent.');
      contactForm.reset();
    })
    .catch((error) => {
      alert('Something went wrong. Please try again.');
      console.error('EmailJS error:', error);
    })
    .finally(() => {
      sendBtn.innerHTML = originalText;
      sendBtn.disabled = false;
    });
});
// ── TYPEWRITER EFFECT (Hero Name, looping) ──
function typeWriterLoop() {
  const target = document.getElementById('typed-name');
  if (!target) return;

  const fullText = "Anubhav Mishra";
  const highlightStart = "Anubhav ".length;
  let i = 0;
  let deleting = false;

  function render(len) {
    const typed = fullText.slice(0, len);
    if (len <= highlightStart) {
      target.innerHTML = typed;
    } else {
      target.innerHTML = fullText.slice(0, highlightStart) +
        '<span>' + fullText.slice(highlightStart, len) + '</span>';
    }
  }

  function tick() {
    if (!deleting) {
      i++;
      render(i);
      if (i === fullText.length) {
        deleting = true;
        setTimeout(tick, 1800); // pause before erasing
        return;
      }
      setTimeout(tick, 100); // typing speed
    } else {
      i--;
      render(i);
      if (i === 0) {
        deleting = false;
        setTimeout(tick, 500); // pause before retyping
        return;
      }
      setTimeout(tick, 50); // erasing speed
    }
  }

  tick();
}

window.addEventListener('DOMContentLoaded', typeWriterLoop);
// ── SLIDING NAV UNDERLINE ──
const navLinksList = document.querySelectorAll('.nav-links a');
const navIndicator = document.getElementById('navIndicator');
const navLinksContainer = document.querySelector('.nav-wrap');

function moveIndicator(el) {
  const containerRect = navLinksContainer.getBoundingClientRect();
  const linkRect = el.getBoundingClientRect();
  navIndicator.style.left = (linkRect.left - containerRect.left) + 'px';
  navIndicator.style.width = linkRect.width + 'px';
  navIndicator.classList.add('visible');
}

navLinksList.forEach(link => {
  link.addEventListener('mouseenter', () => moveIndicator(link));
});

navLinksContainer.addEventListener('mouseleave', () => {
  const active = document.querySelector('.nav-links a.active');
  if (active) {
    moveIndicator(active);
  } else {
    navIndicator.classList.remove('visible');
  }
});

// Set initial position on page load (under the active link)
window.addEventListener('DOMContentLoaded', () => {
  const active = document.querySelector('.nav-links a.active');
  if (active) moveIndicator(active);
});
// ── THEME TOGGLE ──
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// If the user has manually toggled before, respect that choice.
// Otherwise, follow the device's system theme automatically.
const savedTheme = localStorage.getItem('portfolio-theme');
applyTheme(savedTheme || getSystemTheme());

// Live-update if system theme changes, but only when user hasn't manually chosen
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: light)');
systemThemeQuery.addEventListener('change', (e) => {
  if (!localStorage.getItem('portfolio-theme')) {
    applyTheme(e.matches ? 'light' : 'dark');
  }
});

// Manual toggle now counts as an explicit override, saved for future visits
themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const newTheme = current === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
  localStorage.setItem('portfolio-theme', newTheme);
});
// ── CLICK EFFECT (particle burst) ──
function createClickEffect(x, y) {
  const particleCount = 8;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'click-particle';
    document.body.appendChild(particle);

    const angle = (i / particleCount) * Math.PI * 2;
    const distance = 40 + Math.random() * 20;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.setProperty('--dx', dx + 'px');
    particle.style.setProperty('--dy', dy + 'px');

    setTimeout(() => particle.remove(), 600);
  }

  // Ripple ring
  const ripple = document.createElement('div');
  ripple.className = 'click-ripple';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

document.addEventListener('click', (e) => {
  createClickEffect(e.clientX, e.clientY);
});
// ── GALLERY LIGHTBOX ──
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const fullSrc = item.getAttribute('data-full');
    lightboxImg.src = fullSrc;
    lightbox.classList.add('active');
  });
});

lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    lightbox.classList.remove('active');
  }
});
// ── RESUME DROPDOWN ──
const resumeToggle = document.getElementById('resumeToggle');
const resumeMenu = document.getElementById('resumeMenu');

resumeToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  resumeMenu.classList.toggle('open');
  resumeToggle.classList.toggle('active');
  document.body.classList.toggle('resume-open');
});

document.addEventListener('click', (e) => {
  if (!resumeToggle.contains(e.target) && !resumeMenu.contains(e.target)) {
    resumeMenu.classList.remove('open');
    resumeToggle.classList.remove('active');
    document.body.classList.remove('resume-open');
  }
});
// ── CERTIFICATIONS DATA (edit this list) ──
const certData = [
  { img: "images/Cert/8-BIT-MICROCONTROLLER.jpg", title: "8 Bit Microcontroller", org: "Microchip", desc: "Fundamentals of 8-bit microcontroller architecture and programming." },
  { img: "images/Cert/8051-Microcontroller.jpg", title: "8051 Microcontroller", org: "Udemy", desc: "Programming and interfacing techniques for the 8051 microcontroller." },
  { img: "images/Cert/Aptitude-Test-Series.jpg", title: "Aptitude Test Series", org: "Sanfoundary", desc: "Quantitative aptitude and logical reasoning test series." },
  { img: "images/Cert/AWS-Data-Engineer.jpg", title: "AWS Data Engineer", org: "AWS Academy", desc: "Cloud-based data engineering pipelines and services on AWS." },
  { img: "images/Cert/AWS-Generative-AI.jpg", title: "AWS Generative AI", org: "AWS Academy", desc: "Generative AI foundations and applications on AWS cloud infrastructure." },
  { img: "images/Cert/C-Programming.jpg", title: "C Programming", org: "IEEE", desc: "Core concepts of C programming including memory management and pointers." },
  { img: "images/Cert/Crash-Course-On-Python.jpg", title: "Crash Course On Python", org: "Google", desc: "Python fundamentals covering syntax, data structures, and basic scripting." },
  { img: "images/Cert/Database-Data-Structure-Test-Series.jpg", title: "Database & Data Structure Test Series", org: "SANfoundry", desc: "Scored Grade A (90%+ marks) in database and data structure fundamentals." },
  { img: "images/Cert/Design-Verification-using-System-Verilog.jpg", title: "Design & Verification using SystemVerilog/UVM", org: "Udemy", desc: "Hands-on design verification methodology using SystemVerilog and UVM." },
  { img: "images/Cert/DSA.jpg", title: "DSA", org: "Microsoft", desc: "Data structures and algorithms fundamentals and problem solving." },
  { img: "images/Cert/Electronic-Proficiency-Test.jpg", title: "Electronic Proficiency Test", org: "SANfoundry", desc: "Scored Grade A (>82% marks) in core electronics proficiency." },
  { img: "images/Cert/Introduction-to-Front-End.jpg", title: "Introduction to Front End (Meta)", org: "Meta", desc: "Foundations of front-end web development." },
  { img: "images/Cert/Programming-Test-Series-(C-and-Python).jpg", title: "Programming Test Series (C and Python)", org: "SANfoundry", desc: "Scored Grade A (85%+ marks) in C and Python programming fundamentals." },
  { img: "images/Cert/Python-Full-stack.jpg", title: "Python Full Stack", org: "EduSkills Academy", desc: "Full-stack development training using Python across the application stack." },
  { img: "images/Cert/Science-of-well-being.jpg", title: "The Science of Well-Being", org: "Yale University", desc: "Explored the science of happiness and evidence-based habits for well-being." },
  { img: "images/Cert/SQL-and-Database-Management-Systems.jpg", title: "SQL and Database Management Systems", org: "EduSkills Academy", desc: "Internship certification in SQL fundamentals and database management." },
  { img: "images/Cert/SQL-for-Data-Science.jpg", title: "SQL for Data Science", org: "UC Davis", desc: "Applied SQL querying techniques for data science and analysis." },
  { img: "images/Cert/SRM-HACKTHON.jpg", title: "SRM Hackathon", org: "SRM Institute", desc: "Participated in a competitive hackathon building solutions under time constraints." },
  { img: "images/Cert/UI_UX-DESIGN.jpg", title: "UI/UX Design", org: "CodeSoft", desc: "Principles of user interface and user experience design." },
  { img: "images/Cert/Veilog-HDL.jpg", title: "Verilog HDL", org: "Udemy", desc: "Hardware description language fundamentals using Verilog." }
];

// ── BUILD CERT MARQUEE ──
const certTrack = document.getElementById('certMarqueeTrack');
function renderCertCard(cert) {
  return `
    <div class="cert-card" data-img="${cert.img}" data-title="${cert.title}">
      <img src="${cert.img}" alt="${cert.title}" loading="lazy">
      <div class="cert-card-info">
        <span class="cert-card-title">${cert.title}</span>
        ${cert.org ? `<span class="cert-card-org">${cert.org}</span>` : ''}
        ${cert.desc ? `<p class="cert-card-desc">${cert.desc}</p>` : ''}
      </div>
    </div>
  `;
}
certTrack.innerHTML = certData.map(renderCertCard).join('') + certData.map(renderCertCard).join('');

// ── CERTIFICATE MODAL ──
const certModal = document.getElementById('certModal');
const certModalImg = document.getElementById('certModalImg');
const certModalTitle = document.getElementById('certModalTitle');
const certModalClose = document.getElementById('certModalClose');

certTrack.addEventListener('click', (e) => {
  const card = e.target.closest('.cert-card');
  if (!card) return;
  certModalImg.src = card.getAttribute('data-img');
  certModalTitle.textContent = card.getAttribute('data-title');
  certModal.classList.add('active');
});

certModalClose.addEventListener('click', () => certModal.classList.remove('active'));
certModal.addEventListener('click', (e) => { if (e.target === certModal) certModal.classList.remove('active'); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') certModal.classList.remove('active'); });

// ── INDUSTRY EXPOSURE DATA ──
const expData = [
  {
    title: "Electronics Cooling Capstone",
    org: "Dell Technologies · Chennai",
    icon: "fa-temperature-half",
    duration: "2024",
    type: "Capstone Program",
    badgeColor: "orange",
    leadBy: "Prabhakar Subramaniam (Ex-Intel)",
    desc: "Intensive capstone program on electronics thermal management, led by Prabhakar Subramaniam (Ex-Intel), focusing on CFD simulations and heat dissipation strategies for high-performance computing.",
    tags: ["ANSYS Icepak", "CFD Simulation", "Junction Temp Analysis", "Heat Sink Design", "Thermal Resistance"],
    learnings: [
      "Mastered ANSYS Icepak for component-level and system-level thermal simulation",
      "Analyzed Junction-to-Case (θjc) and Case-to-Ambient (θca) thermal resistance",
      "Optimized heat sink geometries and fan airflow profiles for data centers",
      "Applied computational fluid dynamics to solve conjugate heat transfer problems"
    ]
  },
  {
    title: "Community Connect Programme",
    org: "Saraswati Shishu Vidya Mandir, Ara Kanta Sarubera, Ramgarh, Jharkhand",
    icon: "fa-heart",
    duration: "2024",
    type: "Community Service",
    badgeColor: "green",
    link: "https://docs.google.com/presentation/d/1HAe_J_3gAyg0jjoFkMvYX9OsZjtgr4tF/edit?usp=sharing&ouid=108966136856154764181&rtpof=true&sd=true",
    leadBy: "Divya Karunya Charitable Trust",
    desc: "Volunteered at Divyakaruniya Ashramam as part of the Community Connect initiative, contributing to charitable activities and community service.",
    tags: ["Community Service", "Social Impact", "Volunteering", "Teamwork", "Empathy"],
    learnings: [
      "Engaged in charitable activities at the ashram",
      "Contributed to community welfare programs",
      "Developed interpersonal and leadership skills",
      "Built connections through meaningful social work"
    ]
  },
  {
    title: "Advanced Embedded System Developer",
    org: "Microchip Technology Inc.",
    icon: "fa-microchip",
    duration: "Jan - Mar 2026",
    grade: "O",
    type: "Virtual Internship",
    badgeColor: "blue",
    desc: "Completed an advanced 10-week virtual internship on embedded systems development, delivered through the AICTE EduSkills National Internship Portal in partnership with Microchip Technology.",
    tags: ["Embedded Systems", "Microcontrollers", "Microchip", "AICTE · EduSkills"],
    learnings: [
      "Advanced embedded systems design concepts and microcontroller architecture",
      "Industry-aligned development practices from Microchip's curriculum",
      "Completed the program with an Outstanding (O) grade"
    ]
  },
  {
    title: "SQL & Database Management Systems",
    org: "EduSkills Academy",
    icon: "fa-database",
    duration: "Apr - Jun 2026",
    grade: "O",
    type: "Virtual Internship",
    badgeColor: "blue",
    desc: "Completed an 8-week virtual internship on SQL and database management systems through the AICTE EduSkills National Internship Portal.",
    tags: ["SQL", "Database Management", "EduSkills", "AICTE"],
    learnings: [
      "Relational database design and SQL query fundamentals",
      "Structured database management curriculum by EduSkills Academy",
      "Completed the program with an Outstanding (O) grade"
    ]
  },
  {
    title: "Cloud Gen AI",
    org: "AWS Academy",
    icon: "fa-cloud",
    duration: "Jul - Sep 2025",
    grade: "O",
    type: "Virtual Internship",
    badgeColor: "blue",
    desc: "Completed a 10-week virtual internship exploring generative AI on cloud infrastructure, with curriculum provided by AWS Academy.",
    tags: ["Generative AI", "AWS", "Cloud Computing", "AICTE · EduSkills"],
    learnings: [
      "Foundations of generative AI and cloud-based AI services",
      "Hands-on exposure to AWS Academy's Gen AI curriculum",
      "Completed the program with an Outstanding (O) grade"
    ]
  },
  {
    title: "Structural Analysis",
    org: "Ansys (part of Synopsys)",
    icon: "fa-cube",
    duration: "Oct - Dec 2025",
    grade: "O",
    type: "Virtual Internship",
    badgeColor: "blue",
    desc: "Completed a 10-week virtual internship on structural analysis, supported by Ansys, part of Synopsys, via the AICTE EduSkills National Internship Portal.",
    tags: ["Structural Analysis", "ANSYS", "Simulation", "AICTE · EduSkills"],
    learnings: [
      "Structural simulation and analysis fundamentals using Ansys tools",
      "Applied engineering analysis workflows",
      "Completed the program with an Outstanding (O) grade"
    ]
  },
  {
    title: "Python Full Stack Developer",
    org: "EduSkills Academy",
    icon: "fa-brands fa-python",
    duration: "Apr - Jun 2025",
    grade: "P",
    type: "Virtual Internship",
    badgeColor: "blue",
    desc: "Completed a 10-week virtual internship on full-stack development using Python, delivered via the AICTE EduSkills National Internship Portal.",
    tags: ["Python", "Full-Stack Development", "EduSkills", "AICTE"],
    learnings: [
      "End-to-end web development fundamentals using Python",
      "Structured full-stack curriculum from EduSkills Academy",
      "Successfully completed the internship program"
    ]
  },
  {
    title: "Data Engineering",
    org: "AWS Academy",
    icon: "fa-database",
    duration: "Jan - Mar 2025",
    grade: "C",
    type: "Virtual Internship",
    badgeColor: "blue",
    desc: "Completed a 10-week virtual internship in data engineering with curriculum provided by AWS Academy, through the AICTE EduSkills National Internship Portal.",
    tags: ["Data Engineering", "AWS", "Cloud Computing", "AICTE · EduSkills"],
    learnings: [
      "Core data engineering concepts and AWS data services",
      "Cloud-based data pipeline fundamentals",
      "Successfully completed the internship program"
    ]
  },
  {
    title: "Android Developer",
    org: "Google for Developers",
    icon: "fa-brands fa-google",
    duration: "Oct - Dec 2024",
    grade: "C",
    type: "Virtual Internship",
    badgeColor: "blue",
    desc: "Completed a 10-week Android Developer virtual internship supported by Google for Developers, under the India Edu Program.",
    tags: ["Android Development", "Google", "Mobile Apps", "AICTE · EduSkills"],
    learnings: [
      "Android app development fundamentals",
      "Structured curriculum from Google's India Edu Program",
      "Successfully completed the internship program"
    ]
  },
  {
    title: "Networking",
    org: "Juniper Networks",
    icon: "fa-network-wired",
    duration: "Jul - Sep 2024",
    grade: "A",
    type: "Virtual Internship",
    badgeColor: "blue",
    desc: "Completed a 10-week Networking virtual internship supported by Juniper Networks' Cloud & Automation Academy.",
    tags: ["Networking", "Cloud & Automation", "Juniper Networks", "AICTE · EduSkills"],
    learnings: [
      "Core networking concepts and cloud automation practices",
      "Hands-on exposure to Juniper Networks' curriculum",
      "Completed the program with a Very Good (A) grade"
    ]
  },
  {
    title: "Embedded System Developer",
    org: "Microchip Technology Inc.",
    icon: "fa-microchip",
    duration: "Apr - Jun 2024",
    grade: "C",
    type: "Virtual Internship",
    badgeColor: "blue",
    desc: "Completed a 10-week Embedded System Developer virtual internship supported by Microchip, through the AICTE EduSkills National Internship Portal.",
    tags: ["Embedded Systems", "Microcontrollers", "Microchip", "AICTE · EduSkills"],
    learnings: [
      "Fundamentals of embedded systems and microcontroller programming",
      "Introductory industry curriculum from Microchip",
      "Successfully completed the internship program"
    ]
  }
];

// ── RENDER EXPERIENCE LIST + DETAIL ──
const expList = document.getElementById('expList');
const expDetail = document.getElementById('expDetail');

function renderExpDetail(exp) {
  expDetail.innerHTML = `
    <div class="exp-detail-top">
      <span class="exp-badge type-${exp.badgeColor || 'blue'}">${exp.type}</span>
      <span class="exp-detail-date">${exp.duration}</span>
      ${exp.grade ? `<span class="exp-grade">Grade ${exp.grade}</span>` : ''}
    </div>
    <h3 class="exp-detail-title">${exp.title}</h3>
    <div class="exp-detail-org"><i class="fa-solid fa-building"></i> ${exp.org}</div>
    ${exp.leadBy ? `<div class="exp-detail-lead">Led by ${exp.leadBy}</div>` : ''}
    <p class="exp-detail-desc">${exp.desc}</p>
    <div class="exp-detail-tags">
      ${exp.tags.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>
    <div class="exp-learnings-title">Key Learnings</div>
    <ul class="exp-learnings">
      ${exp.learnings.map(l => `<li>${l}</li>`).join('')}
    </ul>
    ${exp.link ? `<a href="${exp.link}" target="_blank" rel="noopener noreferrer" class="exp-proof-btn"><i class="fa-solid fa-file-lines"></i> View Proof / Certificate</a>` : ''}
  `;
}

function renderExpList() {
  expList.innerHTML = expData.map((exp, i) => `
    <div class="exp-item ${i === 0 ? 'active' : ''}" data-index="${i}">
      <div class="exp-item-icon"><i class="fa-solid ${exp.icon.includes('fa-') && !exp.icon.startsWith('fa-brands') ? exp.icon : ''}"></i></div>
      <div>
        <div class="exp-item-title">${exp.title}</div>
        <div class="exp-item-org">${exp.org}</div>
      </div>
    </div>
  `).join('');

  // Fix icon classes properly (handles both fa-solid and fa-brands icons)
  document.querySelectorAll('.exp-item').forEach((item, i) => {
    const iconEl = item.querySelector('.exp-item-icon i');
    iconEl.className = expData[i].icon.startsWith('fa-brands') ? expData[i].icon : `fa-solid ${expData[i].icon}`;

    item.addEventListener('click', () => {
      document.querySelectorAll('.exp-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');

      const icon = item.querySelector('.exp-item-icon');
      icon.classList.remove('bounce');
      void icon.offsetWidth; // restart animation
      icon.classList.add('bounce');

      renderExpDetail(expData[i]);
    });
  });
}

renderExpList();
renderExpDetail(expData[0]);
//=========================
// SYSTEM STATUS
//=========================

const status=document.querySelector(".system-status");

setInterval(()=>{

status.style.boxShadow=
"0 0 18px rgba(79,110,247,.25)";

setTimeout(()=>{

status.style.boxShadow="none";

},700);

},2000);
// ── BASIC COPY PROTECTION (deterrent only, not foolproof) ──

// Disable right-click context menu
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Disable dragging images (prevents easy "save image as" via drag)
document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});

// Block common dev-tools shortcuts
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();

  // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (DevTools panels)
  if (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(key)) {
    e.preventDefault();
    return;
  }

  // Ctrl+U (View Source)
  if (e.ctrlKey && key === 'u') {
    e.preventDefault();
    return;
  }

  // Cmd equivalents for Mac
  if (e.metaKey && e.altKey && ['i', 'j', 'c'].includes(key)) {
    e.preventDefault();
    return;
  }
});
// ══ INTERESTS & PASSIONS — 3D DRAG COVERFLOW ══
// ══ INTERESTS & PASSIONS — 3D DRAG COVERFLOW ══
(() => {
  const track = document.getElementById('coverflow');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.coverflow-card'));
  const dotsWrap = document.getElementById('coverflowDots');
  let activeIndex = Math.floor(cards.length / 2);
  let dragOffset = 0;
  let dragMoved = false;
  let startX = 0;
  let isDragging = false;
  let bobTime = 0;
  let autoplayTimer = null;

  cards.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'coverflow-dot';
    dot.addEventListener('click', () => {
      activeIndex = i;
      restartAutoplay();
    });
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function getConfig() {
    const mobile = window.innerWidth < 600;
    return {
      spacing: mobile ? 140 : 230,
      angle: mobile ? 38 : 45,
      depth: mobile ? 90 : 140
    };
  }

  function render() {
    const { spacing, angle, depth } = getConfig();
    cards.forEach((card, i) => {
      const offset = (i - activeIndex) + dragOffset / spacing;
      const abs = Math.abs(offset);
      const tx = offset * spacing;
      const rotY = Math.max(-65, Math.min(65, offset * -angle));
      const tz = -abs * depth;
      const scale = Math.max(0.55, 1 - abs * 0.15);
      const opacity = abs > 3.4 ? 0 : Math.max(0, 1 - abs * 0.28);

      // gentle floating bob, only on the centered card, fading out as it moves off-center
      const bobStrength = Math.max(0, 1 - abs / 0.5);
      const bob = Math.sin(bobTime / 700) * 8 * bobStrength;

      card.style.transform =
        `translate(-50%, -50%) translate3d(${tx}px, ${bob}px, ${tz}px) rotateY(${rotY}deg) scale(${scale})`;
      card.style.opacity = opacity;
      card.style.zIndex = Math.round(100 - abs * 10);
      card.style.pointerEvents = abs > 3.4 ? 'none' : 'auto';
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
  }

  // ── continuous idle float loop ──
  function tick() {
    bobTime += 16;
    if (!isDragging) render();
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // ── autoplay ──
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      activeIndex = (activeIndex + 1) % cards.length;
      render();
    }, 3200);
  }
  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }
  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  track.addEventListener('mouseenter', stopAutoplay);
  track.addEventListener('mouseleave', startAutoplay);

  function onPointerDown(e) {
    isDragging = true;
    dragMoved = false;
    startX = e.clientX;
    dragOffset = 0;
    stopAutoplay();
    track.classList.add('dragging');
    track.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    dragOffset = e.clientX - startX;
    if (Math.abs(dragOffset) > 5) dragMoved = true;
    render();
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('dragging');
    const { spacing } = getConfig();
    const steps = Math.round(dragOffset / spacing);
    activeIndex = Math.max(0, Math.min(cards.length - 1, activeIndex - steps));
    dragOffset = 0;
    render();
    restartAutoplay();
  }

  track.addEventListener('pointerdown', onPointerDown);
  track.addEventListener('pointermove', onPointerMove);
  track.addEventListener('pointerup', onPointerUp);
  track.addEventListener('pointerleave', onPointerUp);

  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      if (dragMoved) return;
      if (i !== activeIndex) {
        activeIndex = i;
        restartAutoplay();
        render();
      }
    });
  });

  window.addEventListener('resize', render);

  render();
  startAutoplay();
})();
// ══ GITHUB STATS CARD — live data + count-up ══
(() => {
  const card = document.getElementById('githubCard');
  if (!card) return;

  const repoEl = document.getElementById('githubRepos');
  const followerEl = document.getElementById('githubFollowers');
  let targetRepos = 0;
  let targetFollowers = 0;
  let animated = false;

  fetch('https://api.github.com/users/ANUBHAV-SRMIST')
    .then(res => res.json())
    .then(data => {
      targetRepos = data.public_repos || 0;
      targetFollowers = data.followers || 0;
    })
    .catch(() => {
      targetRepos = 49;
      targetFollowers = 7;
    });

  function countUp(el, target, duration) {
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        const waitForData = setInterval(() => {
          if (targetRepos || targetFollowers) {
            clearInterval(waitForData);
            countUp(repoEl, targetRepos, 1200);
            countUp(followerEl, targetFollowers, 1200);
          }
        }, 100);
        setTimeout(() => clearInterval(waitForData), 3000);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(card);
})();
// ══ PUBLICATIONS — abstract toggle + tilt effect + scroll reveal ══
(() => {
  const toggle = document.getElementById('pubToggle');
  const abstractEl = document.getElementById('pubAbstract');
  if (toggle && abstractEl) {
    toggle.addEventListener('click', () => {
      const expanded = abstractEl.classList.toggle('expanded');
      toggle.classList.toggle('expanded', expanded);
      toggle.innerHTML = expanded
        ? 'Show Less <i class="fa-solid fa-chevron-down"></i>'
        : 'Read Full Abstract <i class="fa-solid fa-chevron-down"></i>';
    });
  }

  const pubCard = document.querySelector('.pub-card');
  if (!pubCard) return;

  if (window.matchMedia('(hover: hover)').matches) {
    pubCard.addEventListener('mousemove', (e) => {
      const rect = pubCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -6;
      const rotateY = ((x / rect.width) - 0.5) * 6;
      pubCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    pubCard.addEventListener('mouseleave', () => {
      pubCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }

  // ── scroll-triggered reveal + stat count-up ──
  let statsAnimated = false;
  const statEls = pubCard.querySelectorAll('.pub-stat-value');

  function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;
    statEls.forEach(el => {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const isDecimal = String(el.dataset.target).includes('.');
      const start = performance.now();
      const duration = 1000;
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = eased * target;
        el.textContent = (isDecimal ? value.toFixed(1) : Math.round(value)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  const pubObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        pubCard.classList.add('in-view');
        animateStats();
        pubObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  pubObserver.observe(pubCard);
})();