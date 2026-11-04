// M77R — proposal. Pill nav, footer, reveals and helpers.
const LOGO = 'https://framerusercontent.com/images/yp0X1Y6nZnD1V8wbs4tlRAaL02A.png';
const img = (id, w = 2048) => `${window.F}${id}?scale-down-to=${w}`;
const P = s => window.PROJECTS.find(p => p.slug === s);
const TYPES = [['residential', 'Residential'], ['multifamily', 'Multifamily'], ['hospitality', 'Hospitality'], ['installations', 'Installations']];
const count = t => window.PROJECTS.filter(p => p.type === t).length;
const sf = n => n ? n.toLocaleString('en-US') + ' sq ft' : '';
const m2 = n => n ? Math.round(n * 0.092903).toLocaleString('en-US') + ' m²' : '';
const shot = /shot/.test(location.search);
if (shot) document.documentElement.classList.add('shot');

function pill(opts = {}) {
  const menu = opts.close ? `<a class="lbl" href="home.html">Close</a>` : `<a class="lbl" href="menu.html">Menu</a>`;
  document.body.insertAdjacentHTML('afterbegin', `
  <nav class="pill" id="pill">
    ${menu}
    <a href="home.html" aria-label="M77R"><img class="wm" src="${LOGO}" alt="M77R"></a>
    <span class="r"><a class="cta lbl" href="contact.html">Inquire</a></span>
  </nav>`);
  // Mobile: hides on scroll down, returns on scroll up (Belgrade Arbor at 390 px)
  let y0 = scrollY;
  addEventListener('scroll', () => {
    const p = document.getElementById('pill');
    if (innerWidth <= 760) p.classList.toggle('hide', scrollY > y0 && scrollY > 120);
    y0 = scrollY;
  }, { passive: true });
}

function footer() {
  document.body.insertAdjacentHTML('beforeend', `
  <footer class="ft">
    <img class="big" src="${LOGO}" alt="M77R">
    <div class="cols">
      <div><p class="lbl muted">Miami</p><p>7290 NW 1st Ct<br>Miami, FL 33150</p></div>
      <div><p class="lbl muted">Studios</p><p>Miami · Austin<br>Los Angeles</p></div>
      <div><p class="lbl muted">Contact</p><p>studio@ma77er.com<br><span class="tab">+1 (310) 497.7303</span></p></div>
      <div><p class="lbl muted">Follow</p><p><a href="https://www.instagram.com/gaiam77r">Instagram — @gaiam77r</a><br><a href="https://www.instagram.com/mttrmgmt">@mttrmgmt</a></p></div>
    </div>
    <div class="base lbl muted"><span>Space, With Intention. Nature, In balance.</span><span>Licensed in Florida, Texas and California</span></div>
  </footer>`);
}

function reveal() {
  const els = document.querySelectorAll('.rv, .ln, [data-in]');
  if (shot) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -10% 0px' });
  els.forEach((e, i) => {
    // line stagger: .06 s (Loam House uses .03 s per item)
    if (e.classList.contains('ln')) e.firstElementChild && (e.firstElementChild.style.transitionDelay = (e.dataset.i || 0) * 0.06 + 's');
    io.observe(e);
  });
}
const lines = (arr, cls = '') => arr.map((t, i) => `<span class="ln ${cls}" data-i="${i}"><span>${t}</span></span>`).join('');
