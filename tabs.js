const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');

// Function to activate a specific tab and its content
function activateTab(tab, target) {
  tabContents.forEach(tabContent => {
    tabContent.classList.remove('active');
    tabContent.style.display = 'none';
  });

  tabs.forEach(tab => {
    tab.classList.remove('active');
  });

  tab.classList.add('active');
  target.style.display = 'block';
  void target.offsetWidth; // force reflow for animation
  target.classList.add('active');
}

// Tab click behavior
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    activateTab(tab, target);
  });
});

// Initial fade-in for "Cars" on page load
window.addEventListener('DOMContentLoaded', () => {
  const initialTab = document.querySelector('.tab.active');
  const initialContent = document.querySelector(initialTab.dataset.tabTarget);
  activateTab(initialTab, initialContent);
});
