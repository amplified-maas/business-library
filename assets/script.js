// Fade-in on scroll
function onScrollFadeIn() {
  const elements = document.querySelectorAll('.animate-fadein');
  const windowHeight = window.innerHeight;
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 40) {
      el.style.animationPlayState = 'running';
    }
  });
}
window.addEventListener('scroll', onScrollFadeIn);
window.addEventListener('DOMContentLoaded', () => {
  onScrollFadeIn();
  // Highlight active nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.href === window.location.href || link.href === window.location.origin + window.location.pathname) {
      link.classList.add('active');
    }
  });
});

// Reusable card component
function createGuideCard(title, description, link) {
  const col = document.createElement('div');
  col.className = 'col-12 col-md-6 col-lg-4';
  const card = document.createElement('div');
  card.className = 'card h-100 shadow-sm animate-fadein';
  card.innerHTML = `
    <div class="card-body d-flex flex-column">
      <h5 class="card-title fw-semibold">${title}</h5>
      <p class="card-text flex-grow-1">${description}</p>
      <a href="${link}" class="btn btn-primary mt-3" target="_blank" rel="noopener">View Guide</a>
    </div>
  `;
  col.appendChild(card);
  return col;
}
window.createGuideCard = createGuideCard;

// Guide card rendering logic
async function loadGuideCards() {
  const container = document.querySelector('.guides-cards-container');
  if (!container) return;
  // For demo: list of guide data files (in real use, automate or fetch from server)
  const guideFiles = [
    'guides_data/sample_guide.json',
    // Add more guide JSON files here
  ];
  container.innerHTML = '';
  for (const file of guideFiles) {
    try {
      const res = await fetch(file);
      if (!res.ok) continue;
      const data = await res.json();
      container.appendChild(createGuideCard(data.title, data.description, data.link));
    } catch (e) { continue; }
  }
}

if (window.location.pathname.endsWith('guides.html')) {
  window.addEventListener('DOMContentLoaded', loadGuideCards);
} 