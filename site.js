document.addEventListener('DOMContentLoaded', () => {
  const comparison = document.querySelector('[data-rcs="root"]');
  const slider = comparison?.querySelector('[role="slider"]');
  if (comparison && slider) {
    let dragging = false;
    const setPosition = (value) => {
      const next = Math.max(0, Math.min(100, value));
      comparison.style.setProperty('--rcs-raw-position', `${next}%`);
      slider.setAttribute('aria-valuenow', String(Math.round(next)));
    };
    const setFromPointer = (event) => {
      const bounds = comparison.getBoundingClientRect();
      setPosition(((event.clientX - bounds.left) / bounds.width) * 100);
    };
    comparison.addEventListener('pointerdown', (event) => {
      dragging = true;
      comparison.setPointerCapture(event.pointerId);
      setFromPointer(event);
    });
    comparison.addEventListener('pointermove', (event) => {
      if (dragging) setFromPointer(event);
    });
    comparison.addEventListener('pointerup', () => { dragging = false; });
    comparison.addEventListener('pointercancel', () => { dragging = false; });
    slider.addEventListener('keydown', (event) => {
      const current = Number(slider.getAttribute('aria-valuenow')) || 50;
      if (event.key === 'ArrowLeft') setPosition(current - 2);
      else if (event.key === 'ArrowRight') setPosition(current + 2);
      else return;
      event.preventDefault();
    });
  }

  document.querySelectorAll('button').forEach((button) => {
    if (button.getAttribute('aria-label')?.toLowerCase().includes('theme')) {
      button.addEventListener('click', () => {
        const dark = document.documentElement.classList.toggle('dark');
        document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
        button.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
      });
    } else {
      button.addEventListener('click', () => {
        if (button.textContent.includes('See what it costs')) {
          document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
        } else {
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });
});
