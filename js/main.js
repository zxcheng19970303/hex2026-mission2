/* ===== Image base URL ===== */
const IMG = 'https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/2026-web-camp';

/* ===== AOS Init ===== */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 60 });
  }

  initNavbar();
  initHamburger();
  setActiveNav();

  if (document.querySelector('.service-tab')) initServiceTabs();
  if (document.querySelector('.filter-btn')) initFilter();
  if (document.querySelector('.modal-overlay')) initModal();
  if (document.querySelector('.swiper')) initSwipers();
});

/* ===== Navbar scroll effect ===== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
}

/* ===== Hamburger ===== */
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ===== Active nav link ===== */
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '#contact' && path.includes(href.replace('.html', ''))) {
      link.classList.add('active');
    }
  });
}

/* ===== Service Tabs ===== */
function initServiceTabs() {
  const tabs = document.querySelectorAll('.service-tab');
  const processes = document.querySelectorAll('.service-process');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.service;
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-pressed', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-pressed', 'true');
      processes.forEach(p => p.classList.remove('active'));
      const targetProcess = document.querySelector(`.service-process[data-service="${target}"]`);
      if (targetProcess) targetProcess.classList.add('active');
    });
  });
}

/* ===== Tag Filter ===== */
function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('[data-tags]');
  const noResults = document.querySelector('.no-results');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      let visible = 0;
      items.forEach(item => {
        const tags = item.dataset.tags || '';
        const show = filter === 'all' || tags.includes(filter);
        item.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (noResults) {
        noResults.classList.toggle('visible', visible === 0);
      }
    });
  });
}

/* ===== Project Modal ===== */
const projectData = [
  {
    id: 1,
    title: '品牌視覺與電商整合，多肉植物品牌電商建置',
    desc: '從品牌識別設計到 RWD 網站開發，打造療癒系植栽購物體驗。整合線上購物流程，提升用戶購物直覺性與品牌辨識度，並以自然色系搭配手繪插圖強化品牌個性。',
    tags: ['平面設計', '網頁設計'],
    date: 'Oct 16, 2025',
    img: `${IMG}/project_1.png`,
  },
  {
    id: 2,
    title: '數位產品 UI/UX 設計，個人化財務視覺化軟體',
    desc: '運用數據視覺化邏輯，將複雜的財務數據轉化為直覺的操作介面。以使用者為中心的設計流程，結合互動圖表與個人化儀表板，讓財務管理更加清晰易懂。',
    tags: ['平面設計', '網頁設計', '前端切版'],
    date: 'Oct 16, 2025',
    img: `${IMG}/project_2.png`,
  },
  {
    id: 3,
    title: '品牌識別與包裝設計，法式甜點品牌視覺重塑',
    desc: '以溫暖、輕盈的視覺語言，精準定位高質感甜點市場的品牌形象。從 Logo 設計、包裝視覺到社群素材，建立一致且具記憶點的品牌識別系統。',
    tags: ['前端切版', '後端開發'],
    date: 'Oct 16, 2025',
    img: `${IMG}/project_3.png`,
  },
  {
    id: 4,
    title: '金融科技系統設計，Open Bank API 數據整合平台',
    desc: '串接第三方 API 並規劃穩定的後端架構，建構安全的資產管理後台。以安全性與易用性為核心，設計清晰的資料流程與操作介面，服務金融機構與終端用戶。',
    tags: ['網頁設計', '前端切版', '後端開發'],
    date: 'Oct 16, 2025',
    img: `${IMG}/project_4.png`,
  },
];

function initModal() {
  const overlay = document.querySelector('.modal-overlay');
  const closeBtn = document.querySelector('.modal-close');
  if (!overlay) return;

  document.addEventListener('click', e => {
    const card = e.target.closest('[data-project-id]');
    if (card) {
      const id = parseInt(card.dataset.projectId);
      const data = projectData.find(p => p.id === id);
      if (data) openModal(data);
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function openModal(data) {
  const overlay = document.querySelector('.modal-overlay');
  overlay.querySelector('.modal-img').src = data.img;
  overlay.querySelector('.modal-img').alt = data.title;
  overlay.querySelector('.modal-date').textContent = data.date;
  overlay.querySelector('.modal-title').textContent = data.title;
  overlay.querySelector('.modal-desc').textContent = data.desc;
  const tagsEl = overlay.querySelector('.modal-tags');
  tagsEl.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; }
}

/* ===== Swipers ===== */
function initSwipers() {
  document.querySelectorAll('.swiper').forEach(el => {
    if (el._swiper) return;
    const swiper = new Swiper(el, {
      slidesPerView: 1.15,
      spaceBetween: 16,
      centeredSlides: false,
      pagination: {
        el: el.querySelector('.swiper-pagination'),
        clickable: true,
      },
      breakpoints: {
        480: { slidesPerView: 1.5 },
        640: { slidesPerView: 2.2 },
      },
    });
    el._swiper = swiper;
  });
}

