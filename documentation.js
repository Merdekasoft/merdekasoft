// Documentation page interactions
// Simple FAQ accordion behavior
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const content = item.querySelector('.faq-content');
      const open = content.classList.toggle('open');
      const chev = btn.querySelector('.chev');
      if (open) {
        // set maxHeight to enable transition
        content.style.maxHeight = content.scrollHeight + 'px';
        chev.style.transform = 'rotate(90deg)';

        // after transition, remove inline maxHeight so element can size naturally
        const onEnd = (e) => {
          if (e.propertyName === 'max-height' || e.propertyName === 'max-height') {
            content.style.maxHeight = null; // allow natural height
            content.removeEventListener('transitionend', onEnd);
          }
        };
        content.addEventListener('transitionend', onEnd);

        // fallback: remove after 350ms in case transitionend doesn't fire
        setTimeout(() => { content.style.maxHeight = null; }, 350);
      } else {
        // collapse: set explicit height then null to animate
        content.style.maxHeight = content.scrollHeight + 'px';
        // force repaint
        void content.offsetHeight;
        content.style.maxHeight = '0px';
        chev.style.transform = 'rotate(0deg)';
      }
    });
  });
});
