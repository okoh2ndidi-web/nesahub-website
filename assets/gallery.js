(() => {
  const gallery = document.querySelector('.gallery-page');
  if (!gallery) return;
  const controls = gallery.querySelector('.gallery-filters');
  const status = gallery.querySelector('#gallery-status');
  const buttons = [...gallery.querySelectorAll('[data-gallery-filter]')];
  const categories = [...gallery.querySelectorAll('[data-gallery-category]')];
  if (!controls || !status || !buttons.length || !categories.length) return;
  function select(button) {
    const value = button.dataset.galleryFilter;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    categories.forEach(category => { category.hidden = value !== 'all' && category.dataset.galleryCategory !== value; });
    const visible = categories.filter(category => !category.hidden);
    const count = visible.reduce((total, category) => total + category.querySelectorAll('[data-gallery-artwork]').length, 0);
    const label = value === 'all' ? 'All categories' : button.textContent.trim();
    status.textContent = label + ': ' + count + ' illustration' + (count === 1 ? '' : 's') + '.';
  }
  buttons.forEach(button => button.addEventListener('click', () => select(button)));
  select(buttons.find(button => button.dataset.galleryFilter === 'all'));
  controls.hidden = false;
})();
