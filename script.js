const sections = [
    document.getElementById('personal'),
    document.getElementById('projects'),
    document.getElementById('education'),
    document.getElementById('work'),
    document.getElementById('contact')
  ];
  const menuItems = document.querySelectorAll('.menu-item');
  const indicator = document.querySelector('.sidebar .indicator');
  
  function updateActiveMenu() {
    let index = sections.length;
    while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
    menuItems.forEach(item => item.classList.remove('active'));
    menuItems[index].classList.add('active');
  
    // Make indicator perfectly match menu item position and height
    const menuRect = menuItems[index].getBoundingClientRect();
    const top = menuItems[index].offsetTop;
    const height = menuRect.height;
  
    indicator.style.top = `${top}px`;
    indicator.style.height = `${height}px`;

    if (window.matchMedia('(max-width: 480px)').matches) {
      dotsContainer.style.display = index === 1 ? 'flex' : 'none';
    }
  }
  
  // On resize, recalc indicator height/pos
  window.addEventListener('resize', updateActiveMenu);
  
  // Scroll event
  window.addEventListener('scroll', updateActiveMenu);
  
  // Click event (blur after click so sidebar closes)
  menuItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      sections[idx].scrollIntoView({ behavior: 'smooth' });
      item.blur();
      document.activeElement.blur();
    });
  });
  
  // Initialize indicator position
  window.addEventListener('load', () => {
    updateActiveMenu();
  });
// Education section tab switching
document.querySelectorAll('.browser-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active from all tabs
      document.querySelectorAll('.browser-tab').forEach(t => t.classList.remove('active'));
      // Hide all tab contents
      document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
      // Activate current tab
      this.classList.add('active');
      document.getElementById(this.dataset.tab).style.display = 'block';
    });
  });
// Unified project carousel with category buttons that reflect current project
const slides = Array.from(document.querySelectorAll('.project-browser-slide'));
const cats = Array.from(document.querySelectorAll('.project-cat-btn'));
const dotsContainer = document.querySelector('.project-slide-dots');
let currIdx = 0;

function updateSlides(idx) {
  slides.forEach((slide, i) => {
    slide.style.display = i === idx ? 'flex' : 'none';
  });
  // Update dots
  dotsContainer.innerHTML = '';
  slides.forEach((slide, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === idx ? ' active' : '');
    dot.addEventListener('click', () => {
      currIdx = i;
      updateSlides(currIdx);
      setCatByProject(idx);
    });
    dotsContainer.appendChild(dot);
  });
  setCatByProject(idx);
}

function setCatByProject(idx) {
  const cat = slides[idx].getAttribute('data-cat');
  cats.forEach(btn => {
    if (btn.getAttribute('data-cat') === cat) btn.classList.add('active');
    else btn.classList.remove('active');
  });
}

document.querySelector('.project-nav-btn.left').onclick = function() {
  currIdx = (currIdx - 1 + slides.length) % slides.length;
  updateSlides(currIdx);
};
document.querySelector('.project-nav-btn.right').onclick = function() {
  currIdx = (currIdx + 1) % slides.length;
  updateSlides(currIdx);
};
cats.forEach((btn) => {
  btn.onclick = function() {
    // Jump to first project in that category
    const cat = btn.getAttribute('data-cat');
    const firstInCat = slides.findIndex(slide => slide.getAttribute('data-cat') === cat);
    if (firstInCat >= 0) {
      currIdx = firstInCat;
      updateSlides(currIdx);
    }
  };
});

updateSlides(currIdx);
    