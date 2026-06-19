const SELECTOR = {
  themeToggle: '#theme-toggle',
  langSelect: '#lang-select',
  body: 'body',
  year: '#year',
  heroTitle: '#hero-title',
  subtitle: '.subtitle',
  cta: '#cta',
  featuresTitle: '#features-title',
  howTitle: '#how-title'
};

const translations = {
  'en-US': {
    title: 'Group chat full of fun and games',
    subtitle: 'Discord is great for hanging out with friends, gaming, or building a global community. Customize your space to chat, play, and enjoy.',
    cta: 'Open Discord',
    featuresTitle: 'Features',
    howTitle: 'How it works'
  },
  'pt-BR': {
    title: 'Bate-papo em grupo repleto de diversão e jogos',
    subtitle: 'O Discord é ótimo para jogar e relaxar com os amigos, ou até mesmo para criar uma comunidade mundial. Personalize seu espaço para conversar, jogar e curtir.',
    cta: 'Abrir Discord',
    featuresTitle: 'Recursos',
    howTitle: 'Como funciona'
  },
  'es': {
    title: 'Chat grupal lleno de diversión y juegos',
    subtitle: 'Discord es ideal para jugar y relajarte con amigos, o incluso para crear una comunidad global. Personaliza tu espacio para chatear, jugar y disfrutar.',
    cta: 'Abrir Discord',
    featuresTitle: 'Características',
    howTitle: 'Cómo funciona'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector(SELECTOR.body);
  const themeToggle = document.querySelector(SELECTOR.themeToggle);
  const langSelect = document.querySelector(SELECTOR.langSelect);
  const yearEl = document.querySelector(SELECTOR.year);

  // Set year
  yearEl.textContent = new Date().getFullYear();

  // Initialize language
  const savedLang = localStorage.getItem('dl_lang') || 'en-US';
  langSelect.value = savedLang;
  applyLanguage(savedLang);

  // Initialize theme (dark default)
  const savedTheme = localStorage.getItem('dl_theme');
  if (savedTheme) {
    setTheme(savedTheme === 'light' ? 'light' : 'dark');
  } else {
    setTheme('dark');
  }

  // Theme toggle handler
  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.classList.contains('light');
    setTheme(isLight ? 'dark' : 'light');
  });

  // Keyboard accessible toggle (Enter/Space)
  themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      themeToggle.click();
    }
  });

  // Language change handler
  langSelect.addEventListener('change', (e) => {
    const lang = e.target.value;
    localStorage.setItem('dl_lang', lang);
    applyLanguage(lang);
    // update html lang attribute for accessibility and screen readers
    document.documentElement.lang = lang;
  });

  // Apply theme function
  function setTheme(mode) {
    if (mode === 'light') {
      document.documentElement.classList.add('light');
      body.classList.add('light');
      themeToggle.setAttribute('aria-pressed', 'true');
      localStorage.setItem('dl_theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      body.classList.remove('light');
      themeToggle.setAttribute('aria-pressed', 'false');
      localStorage.setItem('dl_theme', 'dark');
    }
  }

  // Apply language function
  function applyLanguage(lang) {
    const t = translations[lang] || translations['en-US'];
    const heroTitle = document.querySelector(SELECTOR.heroTitle);
    const subtitle = document.querySelector(SELECTOR.subtitle);
    const cta = document.querySelector(SELECTOR.cta);
    const featuresTitle = document.querySelector(SELECTOR.featuresTitle);
    const howTitle = document.querySelector(SELECTOR.howTitle);

    if (heroTitle) heroTitle.textContent = t.title;
    if (subtitle) subtitle.textContent = t.subtitle;
    if (cta) cta.textContent = t.cta;
    if (featuresTitle) featuresTitle.textContent = t.featuresTitle;
    if (howTitle) howTitle.textContent = t.howTitle;
  }

  // Accessibility: ensure focus outlines visible when using keyboard
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
});
