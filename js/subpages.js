'use strict';

/* ── overlay ── */
const overlay        = document.getElementById('overlay');
const overlayContent = document.getElementById('overlay-content');
const overlayClose   = document.getElementById('overlay-close');

function openOverlay(page, extra) {
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
  overlayContent.innerHTML = buildPage(page, extra);
  overlayContent.scrollTop = 0;
  if (page === 'gallery') initGalleryRows(GALLERY);
  if (page === 'ebru')    initGalleryRows(GALLERY_EBRU);
  if (page === 'marmurkowanie') initGalleryRows(GALLERY_EBRU);
}

function closeOverlay() {
  overlay.classList.remove('visible');
  document.body.style.overflow = '';
  const lbl = document.getElementById('intro-label');
  if (lbl) lbl.style.display = '';
}

overlayClose.addEventListener('click', closeOverlay);
overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (lightbox.classList.contains('visible')) closeLightbox();
    else closeOverlay();
  }
  if (lightbox.classList.contains('visible')) {
    if (e.key === 'ArrowRight') lbNext();
    if (e.key === 'ArrowLeft')  lbPrev();
  }
});

/* ── router ── */
function buildPage(page, extra) {
  switch (page) {
    case 'projects': return buildProjects();
    case 'project':  return buildProject(extra);
    case 'about':    return buildAbout();
    case 'gallery':  return buildGalleryPage('Serie', 'fotografia · serie');
    case 'ebru':     return buildGalleryPage('Marmurkowanie', 'ebru · marmurkowanie');
    case 'contact':  return buildContact();
    default: return '';
  }
}

/* ── PROJECTS LIST ── */
function buildProjects() {
  return `
    <span class="sp-eyebrow">projekty artystyczne</span>
    <h1 class="sp-title">Projekty</h1>
    <div class="pj-list">
      ${PROJECTS.map(p => `
        <div class="pj-row" onclick="openOverlay('project','${p.id}')">
          <span class="pj-year">${p.year}</span>
          <span class="pj-name">${p.name}</span>
          <span class="pj-tag">${p.tag}</span>
          <span class="pj-arrow">→</span>
        </div>`).join('')}
    </div>`;
}

/* ── SINGLE PROJECT ── */
function buildProject(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return '<p style="color:rgba(240,237,232,.3)">Nie znaleziono projektu.</p>';

  const tracksBlock = (p.tracks && p.tracks.length > 0) ? `
    <div class="pj-tracks">
      <span class="section-label">Utwory</span>
      <div class="tracklist-simple">
        ${p.tracks.map((tr, i) => `
          <div class="tls-row">
            <span class="tls-num">${String(i+1).padStart(2,'0')}</span>
            <span class="tls-name">${tr.title}</span>
          </div>`).join('')}
      </div>
    </div>` : '';

  const linkBlock = p.link ? `
    <a class="pj-link" href="${p.link}" target="_blank" rel="noopener">Strona projektu →</a>` : '';

  return `
    <button class="sp-back" onclick="openOverlay('projects')">← Projekty</button>
    <span class="sp-eyebrow">${p.tag} · ${p.year}</span>
    <h1 class="sp-title">${p.name}</h1>
    <p class="sp-desc">${p.desc}</p>
    ${linkBlock}
    ${tracksBlock}`;
}

/* ── ALBUMS (was products) ── */
function buildAlbums() {
  return `
    <span class="sp-eyebrow">dyskografia</span>
    <h1 class="sp-title">Albumy</h1>
    <div class="pr-grid">
      ${ALBUMS.map(a => `
        <div class="pr-card" onclick="window.location.href='pages/album.html?id=${a.id}'">
          <div class="pr-cover">
            ${a.cover
              ? `<img src="${a.cover}" alt="${a.title}" onerror="this.style.display='none'">`
              : `<div class="pr-cover-placeholder">${placeholderMini(a)}</div>`}
          </div>
          <div class="pr-title">${a.title}</div>
          <div class="pr-fmt">${a.year}</div>
          <div class="pr-price">${a.buy.digital} ${a.buy.currency}</div>
        </div>`).join('')}
    </div>`;
}

/* ── ABOUT ── */
function buildAbout() {
  const portrait = ABOUT.portrait
    ? `<img src="${ABOUT.portrait}" alt="" style="width:100%;height:100%;object-fit:cover;"
         onerror="this.parentElement.innerHTML='<div class=\\'ab-photo-placeholder\\'>—</div>'">`
    : `<div class="ab-photo-placeholder">—</div>`;
  return `
    <span class="sp-eyebrow">artysta</span>
    <h1 class="sp-title">O mnie</h1>
    <div class="ab-grid">
      <div class="ab-photo">${portrait}</div>
      <div class="ab-text">
        ${ABOUT.paragraphs.map(p => `<p>${p}</p>`).join('')}
        <div class="ab-stats">
          ${ABOUT.stats.map(s => `
            <div>
              <span class="ab-stat-n">${s.n}</span>
              <span class="ab-stat-l">${s.l}</span>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

/* ── GALLERY PAGE — paski serii ── */
function buildGalleryPage(title, eyebrow) {
  const series = title === 'Marmurkowanie' ? GALLERY_EBRU : GALLERY;
  return `
    <span class="sp-eyebrow">${eyebrow}</span>
    <h1 class="sp-title">${title}</h1>
    <div class="gl-rows" id="gl-rows">
      ${series.map((s, i) => `
        <div class="gl-row-item" data-series="${i}">
          <img class="gl-row-img" src="${s.cover}" alt="${s.title}"
            onerror="this.outerHTML='<div class=\'gl-row-placeholder\'>${s.title}</div>'">
          <div class="gl-row-label">${s.title} <span class="gl-row-count">${s.images.length}</span></div>
        </div>`).join('')}
    </div>`;
}


/* ── CONTACT ── */
function buildContact() {
  return `
    <span class="sp-eyebrow">kontakt</span>
    <h1 class="sp-title">Kontakt</h1>
    <div class="ct-body">
      <p class="ct-intro">${CONTACT.intro}</p>
      ${CONTACT.links.map(l => `
        <a class="ct-row" href="${l.href}" target="_blank" rel="noopener">
          <span class="ct-lbl">${l.label}</span>
          <span class="ct-val">${l.val}</span>
          <span class="ct-arrow">→</span>
        </a>`).join('')}
    </div>`;
}

/* ── gallery strip: drag scroll + click lightbox ── */
let _currentGallery = GALLERY;

function initStrip(wrapId, galleryArr) {
  _currentGallery = galleryArr;
  const wrap = document.getElementById(wrapId);
  if (!wrap) return;

  let isDown = false, startX, scrollLeft, moved = false;

  wrap.addEventListener('mousedown', e => {
    isDown = true; moved = false;
    wrap.classList.add('dragging');
    startX     = e.pageX - wrap.offsetLeft;
    scrollLeft = wrap.scrollLeft;
  });
  wrap.addEventListener('mouseleave', () => { isDown = false; wrap.classList.remove('dragging'); });
  wrap.addEventListener('mouseup',    () => { isDown = false; wrap.classList.remove('dragging'); });
  wrap.addEventListener('mousemove',  e => {
    if (!isDown) return;
    e.preventDefault();
    moved = true;
    const x = e.pageX - wrap.offsetLeft;
    wrap.scrollLeft = scrollLeft - (x - startX) * 1.3;
  });

  wrap.addEventListener('click', e => {
    if (moved) return;
    const item = e.target.closest('.gl-item');
    if (!item) return;
    openLightbox(parseInt(item.dataset.idx), galleryArr);
  });
}

/* ── gallery rows: click pasek → otwórz serię w lightboxie ── */
function initGalleryRows(galleryArr) {
  const rows = document.getElementById('gl-rows');
  if (!rows) return;
  rows.addEventListener('click', e => {
    const item = e.target.closest('.gl-row-item');
    if (!item) return;
    const seriesIdx = parseInt(item.dataset.series);
    const series = galleryArr[seriesIdx];
    // convert series images to lightbox format
    const lbImages = series.images.map(src => ({ src }));
    openLightbox(0, lbImages);
  });
}

/* ── lightbox ── */
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lightbox-img');
const lbCounter = document.getElementById('lightbox-counter');
let lbIdx = 0;
let lbGallery = GALLERY;

function openLightbox(idx, gallery) {
  lbGallery = gallery || GALLERY;
  lbIdx = idx;
  showLbImage();
  lightbox.classList.add('visible');
}
function closeLightbox() {
  lightbox.classList.remove('visible');
}
function lbNext() { lbIdx = (lbIdx + 1) % lbGallery.length; showLbImage(); }
function lbPrev() { lbIdx = (lbIdx - 1 + lbGallery.length) % lbGallery.length; showLbImage(); }

function showLbImage() {
  const g = lbGallery[lbIdx];
  lbImg.style.opacity = '0';
  setTimeout(() => {
    lbImg.src = g.src || '';
    lbImg.style.opacity = '1';
  }, 160);
  lbCounter.textContent = `${lbIdx + 1} / ${lbGallery.length}`;
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lb-prev').addEventListener('click', lbPrev);
document.getElementById('lb-next').addEventListener('click', lbNext);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

/* ── touch swipe for lightbox (mobile) ── */
(function() {
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 40) return; // ignore taps
    if (dx < 0) lbNext();
    else         lbPrev();
  }, { passive: true });
})();

/* ── mini placeholder ── */
function placeholderMini(album) {
  const c = album.color || '#555';
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
    <rect width="200" height="200" fill="#0e0e0e"/>
    ${[65,46,30,16].map((r,i) =>
      `<circle cx="100" cy="100" r="${r}" fill="none"
         stroke="${c}" stroke-width="0.6"
         opacity="${(.07+i*.065).toFixed(2)}"/>`
    ).join('')}
  </svg>`;
}

