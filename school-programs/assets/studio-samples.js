(() => {
  const section = document.getElementById('studio-before-after');
  if (!section) return;
  const buttons = [...section.querySelectorAll('[data-sample]')];
  let samples, current = 0;
  const render = index => {
    if (!samples) return;
    current = (index + samples.length) % samples.length;
    const sample = samples[current];
    section.querySelector('#sample-title').textContent = sample.title;
    section.querySelector('#sample-count').textContent = `${String(current + 1).padStart(2, '0')} / ${samples.length}`;
    for (const stage of ['before', 'after']) {
      const img = section.querySelector(`#sample-${stage}`);
      img.src = sample[stage];
      img.alt = `${sample.title}: ${stage} kiln firing${stage === 'before' && sample.note ? '. ' + sample.note : ''}`;
      section.querySelector(`#sample-${stage}-link`).dataset.photoSrc = sample[stage];
    }
    section.querySelector('#sample-idea').textContent = sample.idea;
    section.querySelector('#sample-note').textContent = sample.note;
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
  };
  fetch('/school-programs/assets/studio-before-after/samples.json?v=20261009')
    .then(response => { if (!response.ok) throw new Error('Samples unavailable'); return response.json(); })
    .then(data => { samples = data; render(0); })
    .catch(() => {
      section.querySelector('.sample-picker').hidden = true;
      section.querySelector('.sample-navigation').hidden = true;
    });
  buttons.forEach((button, i) => {
    button.addEventListener('click', () => render(i));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const index = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (i + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
      buttons[index].focus(); render(index);
    });
  });
  section.querySelector('[data-sample-prev]').addEventListener('click', () => render(current - 1));
  section.querySelector('[data-sample-next]').addEventListener('click', () => render(current + 1));
})();
