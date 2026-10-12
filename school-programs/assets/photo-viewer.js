(() => {
  const triggers = document.querySelectorAll('[data-photo-src]');
  if (!triggers.length) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'photo-viewer';
  dialog.setAttribute('aria-label', 'Enlarged artwork photo');
  dialog.innerHTML = '<button type="button" class="photo-viewer-close" aria-label="Close enlarged photo">Close ×</button><img alt="">';
  document.body.append(dialog);
  const image = dialog.querySelector('img');
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  triggers.forEach(button => button.addEventListener('click', () => {
    image.src = button.dataset.photoSrc;
    image.alt = button.querySelector('img').alt;
    dialog.showModal();
  }));
})();
