 const expandHolder = document.getElementById('expand-section');
    let currentSection = null;
    let isAnimating = false;
    let activeNode = null;

    document.querySelectorAll('.menu button').forEach(button => {
      button.addEventListener('click', () => {
        const section = button.dataset.section;
        const template = document.getElementById(section + '-template');

        if (isAnimating || !template) return;

        if (currentSection === section) {
          collapseContent();
          currentSection = null;
        } else if (currentSection === null) {
          expandContent(template);
          currentSection = section;
        } else {
          switchContent(template);
          currentSection = section;
        }
      });
    });

    function expandContent(node) {
      activeNode = node;
      expandHolder.appendChild(node);
      expandHolder.style.transition = 'none';
      expandHolder.style.maxHeight = '0px';

      requestAnimationFrame(() => {
        const fullHeight = expandHolder.scrollHeight;
        expandHolder.style.transition = 'max-height 0.5s ease';
        expandHolder.classList.add('expanded');
        expandHolder.style.maxHeight = fullHeight + 'px';
      });
    }

    function collapseContent() {
      if (!activeNode) return;

      isAnimating = true;
      const currentHeight = expandHolder.scrollHeight;
      expandHolder.style.maxHeight = currentHeight + 'px';

      requestAnimationFrame(() => {
        expandHolder.style.maxHeight = '0';
        expandHolder.classList.remove('expanded');

        setTimeout(() => {
          document.getElementById('templates').appendChild(activeNode);
          activeNode = null;
          isAnimating = false;
        }, 500);
      });
    }

function switchContent(newNode) {
  if (isAnimating) return;
  isAnimating = true;

  const duration = 500;

  // Collapse current content
  const startHeight = expandHolder.scrollHeight;
  expandHolder.style.maxHeight = startHeight + 'px';

  requestAnimationFrame(() => {
    expandHolder.style.maxHeight = '0px';
  });

  setTimeout(() => {
    // Move old content back
    if (activeNode) {
      document.getElementById('templates').appendChild(activeNode);
    }

    activeNode = newNode;
    expandHolder.appendChild(newNode);

    // Force reflow so height is accurate
    expandHolder.style.maxHeight = '0px';
    expandHolder.offsetHeight;

    const targetHeight = expandHolder.scrollHeight;

    expandHolder.style.maxHeight = targetHeight + 'px';

    setTimeout(() => {
      expandHolder.style.maxHeight = 'none';
      isAnimating = false;
    }, duration);
  }, duration);
}
