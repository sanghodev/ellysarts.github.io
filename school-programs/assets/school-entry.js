// Homepage additions live outside the compiled application bundle.
(() => {
  const update = () => {
    const home = document.getElementById('home');
    if (location.pathname !== '/' || !home) {
      document.getElementById('school-home-entry')?.remove();
      document.getElementById('school-floating-entry')?.remove();
      return;
    }

    if (!document.getElementById('school-home-entry')) {
      const section = document.createElement('section');
      section.id = 'school-home-entry';
      section.setAttribute('aria-label', 'School and group programs');
      section.style.cssText = 'background:#171717;color:#fff;padding:32px 24px;text-align:center;border-top:1px solid #444;border-bottom:1px solid #444';
      const title = document.createElement('h2');
      title.textContent = 'Elly’s Arts & Crafts — School & Group Programs';
      title.style.cssText = 'font-family:Georgia,serif;font-size:clamp(24px,3vw,36px);margin:0 0 12px';
      const description = document.createElement('p');
      description.textContent = 'Create & Celebrate · Pottery painting at your school — kiln-fired and returned.';
      description.style.cssText = 'color:#ccc;margin:0 0 20px';
      const link = document.createElement('a');
      link.href = '/school-programs/';
      link.textContent = 'Explore School & Group Programs →';
      link.style.cssText = 'display:inline-block;background:#ab8678;color:white;padding:13px 25px;border-radius:30px;text-decoration:none';
      section.append(title, description, link);
      home.insertAdjacentElement('afterend', section);
    }

    if (!document.getElementById('school-floating-entry')) {
      const link = document.createElement('a');
      link.id = 'school-floating-entry';
      link.href = '/school-programs/';
      link.setAttribute('aria-label', 'Explore School & Group Programs');
      const mascot = document.createElement('img');
      mascot.src = '/school-programs/assets/school-mascot-v1.png';
      mascot.alt = '';
      mascot.width = 128;
      mascot.height = 128;
      mascot.decoding = 'async';
      mascot.className = 'school-floating-mascot';
      const copy = document.createElement('span');
      copy.className = 'school-floating-copy';
      const invite = document.createElement('span');
      invite.className = 'school-floating-invite';
      invite.textContent = 'Planning for your school?';
      const title = document.createElement('span');
      title.className = 'school-floating-title';
      title.append('School & Group', document.createElement('br'), 'Programs');
      const arrow = document.createElement('span');
      arrow.className = 'school-floating-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '↗';
      copy.append(invite, title);
      link.append(mascot, copy, arrow);
      document.body.append(link);
    }
  };

  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      update();
    });
  }).observe(document.getElementById('root'), { childList: true, subtree: true });
  window.addEventListener('popstate', update);
  window.addEventListener('pageshow', update);
  update();
})();
