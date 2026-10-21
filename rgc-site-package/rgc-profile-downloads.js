/*!
 * RGC Profile Downloads
 * Drop-in script for www.ratysglobalconsortium.com
 *
 * Adds, on EVERY page/section:
 *   1. A floating, flashing "Download Profiles" dock (bottom-left) with both PDFs
 *   2. A "Company Profiles" section with cover previews, placed above each footer
 *   3. (footer buttons removed - profiles section above the footer is enough)
 *   4. Any element with data-rgc-pdf="skilllab" or data-rgc-pdf="workforce"
 *      becomes a flashing download button (use it in cards, nav, hero, etc.)
 *
 * Install: upload /downloads/ folder to your site root, then add before </body>:
 *   <script src="/rgc-profile-downloads.js" defer></script>
 *
 * Optional: set window.RGC_PDF_BASE = '/other/path/' before the script to change folder.
 */
(function () {
  if (window.__rgcDownloads) return;
  window.__rgcDownloads = true;

  var BASE = window.RGC_PDF_BASE || '/downloads/';

  var FILES = {
    skilllab: {
      title: 'RGC Skill Lab Brochure',
      short: 'Skill Lab Brochure',
      sub: 'SkillLab · TalentBridge · TalentOS',
      desc: 'Skills training, placement outcomes, 360+ modules and our global partner network for institutions.',
      file: 'RGC%20Skill%20Lab%20Brochure.pdf',
      cover: 'cover-skilllab.jpg',
      meta: 'PDF · 20 pages · 18 MB',
      name: 'RGC Skill Lab Brochure.pdf'
    },
    workforce: {
      title: 'RGC Workforce Solutions',
      short: 'Workforce Solutions',
      sub: 'Domestic · International staffing',
      desc: 'Manpower, recruitment and outsourcing services, industries served, process and company documentation for employers.',
      file: 'RGC-Workforce-Solutions.pdf',
      cover: 'cover-workforce.jpg',
      meta: 'PDF · 22 pages · 8.5 MB',
      name: 'RGC Workforce Solutions.pdf'
    }
  };
  var ORDER = ['skilllab', 'workforce'];

  var ICON =
    '<svg class="rgc-ic" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 11l5 5 5-5"/><path d="M5 20h14"/></svg>';

  function href(k) { return BASE + FILES[k].file; }

  /* ---------- styles ---------- */
  var css = '' +
    ':root{--rgc-navy:#0a1a3f;--rgc-navy2:#12295e;--rgc-gold:#d4af5f;--rgc-teal:#19c3d6;--rgc-ink:#eaf0ff}' +

    /* flashing button */
    '.rgc-dl-btn{position:relative;display:inline-flex;align-items:center;gap:10px;padding:12px 20px;border-radius:6px;' +
    'background:linear-gradient(135deg,var(--rgc-navy2),var(--rgc-navy));color:#fff!important;text-decoration:none!important;' +
    'font:600 13px/1.2 inherit;font-family:inherit;letter-spacing:.06em;text-transform:uppercase;border:1.5px solid var(--rgc-gold);' +
    'cursor:pointer;animation:rgcFlash 1.6s ease-in-out infinite;transition:transform .2s}' +
    '.rgc-dl-btn:hover{transform:translateY(-2px);animation-play-state:paused;box-shadow:0 0 0 4px rgba(212,175,95,.35),0 10px 24px rgba(10,26,63,.4)}' +
    '.rgc-dl-btn .rgc-ic{flex:none;animation:rgcBob 1.2s ease-in-out infinite}' +
    '.rgc-dl-btn .rgc-tag{background:var(--rgc-gold);color:var(--rgc-navy);font-size:10px;font-weight:800;padding:2px 6px;border-radius:3px;animation:rgcBlink 1s steps(2,start) infinite}' +

    '@keyframes rgcFlash{' +
    '0%,100%{box-shadow:0 0 0 0 rgba(212,175,95,.75),0 0 10px rgba(212,175,95,.35);border-color:var(--rgc-gold)}' +
    '50%{box-shadow:0 0 0 12px rgba(212,175,95,0),0 0 22px rgba(25,195,214,.65);border-color:var(--rgc-teal)}}' +
    '@keyframes rgcBob{0%,100%{transform:translateY(-2px)}50%{transform:translateY(2px)}}' +
    '@keyframes rgcBlink{to{visibility:hidden}}' +

    /* floating dock */
    '#rgc-dock{position:fixed;left:16px;bottom:16px;z-index:9998;display:flex;flex-direction:column;align-items:flex-start;gap:8px;font-family:inherit}' +
    '#rgc-dock .rgc-dock-list{display:flex;flex-direction:column;gap:8px;transition:opacity .25s,transform .25s}' +
    '#rgc-dock.closed .rgc-dock-list{opacity:0;transform:translateY(10px);pointer-events:none;height:0;overflow:hidden}' +
    '#rgc-dock .rgc-dock-toggle{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:999px;border:1.5px solid var(--rgc-gold);' +
    'background:var(--rgc-navy);color:#fff;font:700 12px/1 inherit;font-family:inherit;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;animation:rgcFlash 1.6s ease-in-out infinite}' +
    '#rgc-dock .rgc-dock-toggle .rgc-dot{width:8px;height:8px;border-radius:50%;background:var(--rgc-teal);animation:rgcBlink 1s steps(2,start) infinite}' +
    '#rgc-dock .rgc-dl-btn{box-shadow:0 8px 22px rgba(10,26,63,.35)}' +

    /* profile section */
    '.rgc-profiles{background:linear-gradient(160deg,var(--rgc-navy),var(--rgc-navy2));color:var(--rgc-ink);padding:72px 24px;font-family:inherit}' +
    '.rgc-profiles .rgc-wrap{max-width:1100px;margin:0 auto}' +
    '.rgc-profiles .rgc-eyebrow{color:var(--rgc-teal);font-size:12px;letter-spacing:.22em;text-transform:uppercase;font-weight:700;margin:0 0 10px;display:flex;align-items:center;gap:10px}' +
    '.rgc-profiles .rgc-eyebrow:before{content:"";width:34px;height:2px;background:var(--rgc-teal)}' +
    '.rgc-profiles h2{font-family:"Cormorant Garamond","Playfair Display",Georgia,serif;font-weight:500;font-size:clamp(30px,4.5vw,48px);line-height:1.1;margin:0 0 12px;color:#fff}' +
    '.rgc-profiles h2 em{color:var(--rgc-gold);font-style:italic}' +
    '.rgc-profiles .rgc-lead{max-width:640px;color:rgba(234,240,255,.78);margin:0 0 36px;line-height:1.6}' +
    '.rgc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px}' +
    '.rgc-card{display:flex;gap:20px;background:rgba(255,255,255,.06);border:1px solid rgba(212,175,95,.45);padding:20px;border-radius:4px}' +
    '.rgc-card img{width:110px;height:auto;align-self:flex-start;border:1px solid rgba(255,255,255,.25);box-shadow:0 10px 24px rgba(0,0,0,.4);background:#fff}' +
    '.rgc-card h3{margin:0 0 4px;font-size:20px;color:#fff;font-family:inherit}' +
    '.rgc-card .rgc-sub{margin:0 0 10px;color:var(--rgc-gold);font-size:12px;letter-spacing:.12em;text-transform:uppercase}' +
    '.rgc-card p.rgc-desc{margin:0 0 12px;font-size:14px;line-height:1.55;color:rgba(234,240,255,.8)}' +
    '.rgc-card .rgc-meta{display:block;margin:0 0 14px;font-size:12px;color:rgba(234,240,255,.55)}' +
    '.rgc-card>div{display:flex;flex-direction:column;align-items:flex-start;flex:1}' +
    '.rgc-card .rgc-dl-btn{margin-top:auto}' +
    '#rgc-dock.rgc-hide{opacity:0;pointer-events:none;transition:opacity .3s}' +
    '@media(max-width:520px){.rgc-card{flex-direction:column}.rgc-card img{width:100px}.rgc-profiles{padding:52px 18px}}' +

    /* footer links */
    '.rgc-foot-dl{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;padding:18px 16px;background:var(--rgc-navy)}' +

    '@media(prefers-reduced-motion:reduce){.rgc-dl-btn,.rgc-dl-btn .rgc-ic,.rgc-dl-btn .rgc-tag,#rgc-dock .rgc-dock-toggle,#rgc-dock .rgc-dot{animation:none!important}}';

  var style = document.createElement('style');
  style.id = 'rgc-dl-style';
  style.textContent = css;
  document.head.appendChild(style);

  /* ---------- helpers ---------- */
  function button(k, label) {
    var f = FILES[k];
    var a = document.createElement('a');
    a.className = 'rgc-dl-btn';
    a.href = href(k);
    a.setAttribute('download', f.name);
    a.setAttribute('data-rgc-key', k);
    a.setAttribute('aria-label', 'Download ' + f.title + ' (PDF)');
    a.innerHTML = ICON + '<span>' + (label || f.title) + '</span><span class="rgc-tag">PDF</span>';
    return a;
  }

  function build() {
    /* 1. floating dock */
    if (!document.getElementById('rgc-dock')) {
      var dock = document.createElement('div');
      dock.id = 'rgc-dock';
      var list = document.createElement('div');
      list.className = 'rgc-dock-list';
      ORDER.forEach(function (k, i) { list.appendChild(button(k, (i + 1) + '. ' + FILES[k].title)); });
      var tg = document.createElement('button');
      tg.type = 'button';
      tg.className = 'rgc-dock-toggle';
      tg.setAttribute('aria-expanded', 'true');
      tg.innerHTML = '<span class="rgc-dot"></span><span>Download Profiles</span>';
      var small = window.matchMedia && window.matchMedia('(max-width:640px)').matches;
      if (small) { dock.className = 'closed'; tg.setAttribute('aria-expanded', 'false'); }
      tg.addEventListener('click', function () {
        var closed = dock.classList.toggle('closed');
        tg.setAttribute('aria-expanded', closed ? 'false' : 'true');
      });
      dock.appendChild(list);
      dock.appendChild(tg);
      document.body.appendChild(dock);
    }

    /* 2. profile section above every footer (or end of page if none) */
    var footers = document.querySelectorAll('footer');
    var targets = footers.length ? Array.prototype.slice.call(footers) : [null];
    targets.forEach(function (ft, idx) {
      if (ft && ft.previousElementSibling && ft.previousElementSibling.classList.contains('rgc-profiles')) return;
      var sec = document.createElement('section');
      sec.className = 'rgc-profiles';
      if (idx === 0) sec.id = 'company-profiles';
      var cards = ORDER.map(function (k) {
        var f = FILES[k];
        return '<article class="rgc-card">' +
          '<img src="' + BASE + f.cover + '" alt="' + f.title + ' cover" loading="lazy">' +
          '<div><h3>' + f.title + '</h3><p class="rgc-sub">' + f.sub + '</p>' +
          '<p class="rgc-desc">' + f.desc + '</p><span class="rgc-meta">' + f.meta + '</span>' +
          '<span data-rgc-slot="' + k + '"></span></div></article>';
      }).join('');
      sec.innerHTML = '<div class="rgc-wrap"><p class="rgc-eyebrow">Company Profiles</p>' +
        '<h2>Know RGC <em>in detail.</em></h2>' +
        '<p class="rgc-lead">Download our profiles to share with your institution, management or procurement team.</p>' +
        '<div class="rgc-grid">' + cards + '</div></div>';
      Array.prototype.forEach.call(sec.querySelectorAll('[data-rgc-slot]'), function (slot) {
        slot.replaceWith(button(slot.getAttribute('data-rgc-slot'), 'Download PDF'));
      });
      if (ft) ft.parentNode.insertBefore(sec, ft); else document.body.appendChild(sec);

    });

    /* 4. manual hooks: <a data-rgc-pdf="skilllab">Download</a> */
    Array.prototype.forEach.call(document.querySelectorAll('[data-rgc-pdf]'), function (el) {
      var k = el.getAttribute('data-rgc-pdf');
      if (!FILES[k] || el.classList.contains('rgc-dl-btn')) return;
      el.classList.add('rgc-dl-btn');
      el.setAttribute('href', href(k));
      el.setAttribute('download', FILES[k].name);
      if (!el.textContent.trim()) el.textContent = FILES[k].title;
      el.insertAdjacentHTML('afterbegin', ICON);
      el.insertAdjacentHTML('beforeend', '<span class="rgc-tag">PDF</span>');
    });
  }

  /* hide the floating dock while the full profile section is on screen (avoids duplicate buttons) */
  function watchDock() {
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      var dock = document.getElementById('rgc-dock');
      if (!dock) return;
      var any = entries.some(function (e) { return e.isIntersecting; });
      dock.classList.toggle('rgc-hide', any);
    });
    Array.prototype.forEach.call(document.querySelectorAll('.rgc-profiles'), function (s) { io.observe(s); });
  }

  function init() { build(); watchDock(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  /* Re-apply after single-page navigation re-renders the DOM */
  var t;
  new MutationObserver(function () {
    clearTimeout(t);
    t = setTimeout(function () {
      if (!document.getElementById('rgc-dock') || !document.querySelector('.rgc-profiles')) init();
    }, 400);
  }).observe(document.body, { childList: true, subtree: true });
})();
