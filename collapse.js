const contentMap = {
  breakfast: '<div class="menu-section breakfast"><h2>Breakfast</h2><p>Pancakes, eggs, toast...</p></div>',
  lunch: '<div class="menu-section lunch"><h2>Lunch</h2><p>Sandwiches, soups, salads...<br>More items to make it tall.<br>More...<br>Even more...</p></div>',
  dessert: '<div class="menu-section dessert"><h2>Dessert</h2><p>Cakes, cookies, ice cream...</p></div>',
  beverages: '<div class="menu-section beverages"><h2>Beverages</h2><p>Coffee, tea, smoothies...</p></div>'
};

const expandHolder = document.getElementById('expand-section');
let currentSection = null;
let isAnimating = false;

document.querySelectorAll('.menu button').forEach(button => {
  button.addEventListener('click', () => {
    const section = button.dataset.section;

    if (isAnimating) return;

    if (currentSection === section) {
      collapseContent();
      currentSection = null;
    } else if (currentSection === null) {
      expandContent(contentMap[section]);
      currentSection = section;
    } else {
      switchContent(contentMap[section]);
      currentSection = section;
    }
  });
});

function expandContent(html) {
  expandHolder.innerHTML = html;
  expandHolder.style.transition = 'none';
  expandHolder.style.maxHeight = '0px';

  requestAnimationFrame(() => {
    const section = expandHolder.firstElementChild;
    const fullHeight = section.scrollHeight;

    expandHolder.style.transition = 'max-height 0.5s ease';
    expandHolder.classList.add('expanded');
    expandHolder.style.maxHeight = fullHeight + 'px';
  });
}

function collapseContent() {
  if (!expandHolder.firstElementChild) return;

  isAnimating = true;

  const currentHeight = expandHolder.scrollHeight;
  expandHolder.style.maxHeight = currentHeight + 'px';

  requestAnimationFrame(() => {
    expandHolder.style.maxHeight = '0';
    expandHolder.classList.remove('expanded');

    setTimeout(() => {
      expandHolder.innerHTML = '';
      isAnimating = false;
    }, 500);
  });
}

function switchContent(newHtml) {
  isAnimating = true;

  const oldHeight = expandHolder.scrollHeight;
  expandHolder.style.maxHeight = oldHeight + 'px';

  // Wait for reflow before collapsing
  requestAnimationFrame(() => {
    expandHolder.style.maxHeight = '0';

    setTimeout(() => {
      expandHolder.innerHTML = newHtml;

      requestAnimationFrame(() => {
        const newSection = expandHolder.firstElementChild;
        const newHeight = newSection.scrollHeight;

        expandHolder.style.maxHeight = newHeight + 'px';

        setTimeout(() => {
          isAnimating = false;
        }, 500);
      });
    }, 500);
  });
}
