/* ============================================================
   ROYAL WEDDING — MAIN.JS  v2
   All content is pulled from WEDDING_CONFIG.
   Nothing here contains hardcoded wedding data — only behaviour.
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);
const C = WEDDING_CONFIG;
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ---------------------------------------------------------
   0. Hydrate text from config
--------------------------------------------------------- */
function hydrateText() {
  const { groom, bride, hashtag } = C.couple;
  const { dateLabel, timeLabel, venueName, venueAddress, city, mapsUrl } = C.wedding;

  $('#wax-initials').textContent   = `${groom.initial}&${bride.initial}`;
  $('#letter-names').textContent   = `${groom.name} & ${bride.name}`;
  $('#splash-names').textContent   = `${groom.name.toUpperCase()} & ${bride.name.toUpperCase()}`;
  $('#splash-sub').textContent     = 'A royal celebration of love';
  $('#letter-date-preview').textContent = `${dateLabel} · ${venueName}, ${city}`;
  $('#hero-date-venue').textContent = `${dateLabel} · ${venueName}, ${city}`;
  $('#scratch-date').textContent   = dateLabel;
  $('#scratch-time').textContent   = timeLabel;
  $('#scratch-venue').textContent  = venueName;
  $('#film-title').textContent     = C.film.title;
  $('#film-embed').src             = '';
  $('#venue-name').textContent     = venueName;
  $('#venue-address').textContent  = venueAddress;
  $('#btn-navigate').href          = mapsUrl;
  $('#hosts-note').textContent     = C.hosts.note;
  $('#hashtag').textContent        = hashtag;
  if ($('#hosts-note-families')) $('#hosts-note-families').textContent = C.hosts.note;

  // Venue detail rows
  const vd = $('#venue-details');
  if (vd) {
    vd.innerHTML = [
      { icon: '📞', label: 'Phone', value: C.venue.phone },
      { icon: '✈️', label: 'Travel', value: C.venue.travel },
    ].map(row => `
      <div class="venue-detail-row">
        <div class="venue-icon">${row.icon}</div>
        <div>
          <p class="eyebrow !text-[0.55rem] !opacity-50 mb-0.5">${row.label}</p>
          <p class="font-serif text-sm text-[var(--ivory)]/65 leading-snug">${row.value}</p>
        </div>
      </div>`).join('');
  }
}

/* ---------------------------------------------------------
   1. Ambient floating petals / sparkles (global canvas)
--------------------------------------------------------- */
function initPetals() {
  const canvas = $('#petals-canvas');
  const ctx    = canvas.getContext('2d');
  let w, h, petals = [];

  function resize() { w = canvas.width = innerWidth; h = canvas.height = innerHeight; }
  resize();
  addEventListener('resize', resize);

  function spawn() {
    petals.push({
      x: Math.random() * w, y: -20,
      r:    1.5 + Math.random() * 2.5,
      vy:   0.25 + Math.random() * 0.5,
      vx:   Math.sin(Math.random() * 10) * 0.3,
      drift: Math.random() * Math.PI * 2,
      gold:  Math.random() > 0.45,
      o:    0.2 + Math.random() * 0.45,
    });
  }
  setInterval(() => { if (petals.length < 50) spawn(); }, 500);

  function tick() {
    ctx.clearRect(0, 0, w, h);
    petals.forEach(p => {
      p.drift += 0.008;
      p.y     += p.vy;
      p.x     += Math.sin(p.drift) * 0.35;
      ctx.beginPath();
      ctx.fillStyle = p.gold
        ? `rgba(232,199,102,${p.o})`
        : `rgba(248,241,225,${p.o * 0.45})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    petals = petals.filter(p => p.y < h + 20);
    requestAnimationFrame(tick);
  }
  tick();
}

/* ---------------------------------------------------------
   2. Intro sequence: Splash → Envelope → Wax Seal → Letter
--------------------------------------------------------- */
function runIntroSequence() {
  const tl = gsap.timeline();

  tl.to('.splash-crest',  { opacity: 1, scale: 1.05, duration: 1.1, ease: 'power2.out' })
    .to('#splash-names',  { opacity: 1, y: -4, duration: 1 }, '-=0.4')
    .to('#splash-sub',    { opacity: 1, duration: 0.9 }, '-=0.5')
    .to('#scene-splash',  { opacity: 0, duration: 0.9, delay: 1.2 })
    .set('#scene-splash', { display: 'none' })
    .set('#scene-envelope', { visibility: 'visible' })
    .fromTo('.envelope',  { y: 50, opacity: 0, rotateX: 14 }, { y: 0, opacity: 1, rotateX: 0, duration: 1.1 })
    .to('#scene-envelope', { opacity: 1, duration: 0.6 }, '<')
    .from('.wax-seal',    { scale: 0, duration: 0.55, ease: 'back.out(2.2)' }, '-=0.3')
    .from('#envelope-hint', { opacity: 0, y: 8, duration: 0.7 });

  // pulse hint
  gsap.to('.wax-seal', { scale: 1.07, duration: 0.95, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2.8 });
}

function breakSeal() {
  const seal = $('#wax-seal');
  if (seal.dataset.broken) return;
  seal.dataset.broken = '1';
  gsap.killTweensOf(seal);

  const tl = gsap.timeline();
  tl.to(seal,             { scale: 1.35, duration: 0.2, ease: 'power1.in' })
    .to(seal,             { scale: 0, opacity: 0, rotate: 40, duration: 0.38, ease: 'power2.in' })
    .to('#envelope-hint', { opacity: 0, duration: 0.2 }, '<')
    .to('#env-flap',      { rotateX: -180, duration: 1, ease: 'power3.inOut' }, '-=0.1')
    .to('.envelope',      { y: -12, duration: 0.4 }, '-=0.7')
    .to('#scene-envelope',{ opacity: 0, duration: 0.65, delay: 0.15 })
    .set('#scene-envelope',{ display: 'none' })
    .set('#scene-letter', { visibility: 'visible' })
    .to('#scene-letter',  { opacity: 1, duration: 0.55 })
    .fromTo('#letter-card',
      { y: 70, opacity: 0, scale: 0.93 },
      { y: 0,  opacity: 1, scale: 1,   duration: 1, ease: 'power3.out' }, '-=0.3');
}

function goToScratch() {
  const tl = gsap.timeline();
  tl.to('#letter-card',  { scale: 1.06, opacity: 0, duration: 0.5, ease: 'power2.in' })
    .to('#scene-letter', { opacity: 0, duration: 0.4 }, '-=0.25')
    .set('#scene-letter',{ display: 'none' })
    .set('#scene-scratch',{ visibility: 'visible' })
    .to('#scene-scratch', { opacity: 1, duration: 0.65 })
    .call(initScratchCard);
}

/* ---------------------------------------------------------
   3. Scratch card
--------------------------------------------------------- */
function initScratchCard() {
  const canvas = $('#scratch-canvas');
  const wrap   = $('.scratch-wrap');
  const ctx    = canvas.getContext('2d');
  const W      = wrap.clientWidth;
  const H      = wrap.clientHeight;
  canvas.width = W; canvas.height = H;

  // Gold gradient overlay
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0,   '#f5e5a8');
  grad.addColorStop(0.35,'#E8C766');
  grad.addColorStop(0.65,'#C9A227');
  grad.addColorStop(1,   '#9c7a1f');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Texture lines
  ctx.strokeStyle = 'rgba(150,110,10,0.18)';
  ctx.lineWidth = 0.5;
  for (let y = 0; y < H; y += 6) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  ctx.fillStyle = 'rgba(10,10,18,0.30)';
  ctx.font = '600 11px Cinzel, serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '0.4em';
  ctx.fillText('SCRATCH TO REVEAL', W / 2, H / 2 - 8);
  ctx.font = '300 9px Jost, sans-serif';
  ctx.fillStyle = 'rgba(10,10,18,0.20)';
  ctx.fillText('drag across the gold', W / 2, H / 2 + 10);

  ctx.globalCompositeOperation = 'destination-out';
  let scratching = false;

  function pos(e) {
    const r  = canvas.getBoundingClientRect();
    const cx = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    const cy = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
    return [cx, cy];
  }
  function scratch(e) {
    const [x, y] = pos(e);
    ctx.beginPath(); ctx.arc(x, y, 28, 0, Math.PI * 2); ctx.fill();
  }
  function checkDone() {
    const data = ctx.getImageData(0, 0, W, H).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 80) if (data[i] < 50) clear++;
    if (clear / (data.length / 80) > 0.5) revealScratch();
  }

  canvas.addEventListener('pointerdown', e => { scratching = true; scratch(e); });
  canvas.addEventListener('pointermove', e => { if (scratching) scratch(e); });
  window.addEventListener('pointerup',  () => { if (scratching) { scratching = false; checkDone(); } });
  canvas.addEventListener('touchmove',  e => { e.preventDefault(); scratch(e); checkDone(); }, { passive: false });
}

function revealScratch() {
  const canvas = $('#scratch-canvas');
  if (canvas.dataset.done) return;
  canvas.dataset.done = '1';
  gsap.to(canvas, {
    opacity: 0, duration: 0.7,
    onComplete: () => {
      canvas.style.pointerEvents = 'none';
      $('#scratch-hint').textContent = 'the date is yours ✦';
      $('#btn-enter-palace').classList.remove('hidden');
      gsap.from('#btn-enter-palace', { y: 18, opacity: 0, duration: 0.7 });
      confetti({ particleCount: 140, spread: 85, colors: ['#C9A227', '#E8C766', '#F8F1E1', '#9c7a1f'], origin: { y: 0.6 } });
    }
  });
}

function enterPalace() {
  const tl = gsap.timeline();
  tl.to('#scene-scratch', { opacity: 0, duration: 0.75 })
    .set('#scene-scratch', { display: 'none' })
    .to('#main-experience', { opacity: 1, duration: 1.1 })
    .call(() => {
      document.body.style.overflow = 'auto';
      initScrollReveals();
      ScrollTrigger.refresh();
      startCountdown();
      initScrollProgress();
      buildPalaceNav();
    });
}

/* ---------------------------------------------------------
   4. Scroll progress bar
--------------------------------------------------------- */
function initScrollProgress() {
  const bar = $('#scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    bar.style.width = (pct * 100).toFixed(2) + '%';
  });
}

/* ---------------------------------------------------------
   5. Floating palace nav
--------------------------------------------------------- */
function buildPalaceNav() {
  const nav = $('#palace-nav');
  if (!nav) return;

  const sections = [
    { id: 'hero-countdown',       label: 'Countdown' },
    { id: 'section-palace-intro', label: 'Journey' },
    { id: 'section-love-story',   label: 'Love Story' },
    { id: 'section-families',     label: 'Families' },
    { id: 'section-menu',         label: 'Feast' },
    { id: 'section-venue',        label: 'Venue' },
    { id: 'section-rsvp',         label: 'RSVP' },
    { id: 'thank-you',            label: 'Thank You' },
  ].filter(s => document.getElementById(s.id));

  nav.innerHTML = sections.map(s =>
    `<button class="nav-dot" data-target="${s.id}" data-label="${s.label}" aria-label="Go to ${s.label}"></button>`
  ).join('');
  nav.classList.add('visible');

  sections.forEach(s => {
    ScrollTrigger.create({
      trigger: `#${s.id}`,
      start: 'top 55%',
      end:   'bottom 55%',
      onEnter:     () => setNavActive(s.id),
      onEnterBack: () => setNavActive(s.id),
    });
  });

  $$('.nav-dot', nav).forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById(btn.dataset.target)?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
function setNavActive(id) {
  $$('.nav-dot').forEach(d => {
    d.classList.toggle('active', d.dataset.target === id);
  });
}

/* ---------------------------------------------------------
   6. Countdown with animated progress ring
--------------------------------------------------------- */
function buildCountdownMarkup() {
  const wrap  = $('#countdown-wrap');
  const units = [['days','Days'],['hours','Hours'],['minutes','Mins'],['seconds','Secs']];
  wrap.innerHTML = units.map(([key, label]) => `
    <div class="flex flex-col items-center gap-2">
      <div class="relative w-16 h-16 md:w-20 md:h-20">
        <svg class="ring-svg w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="35" stroke="rgba(201,162,39,0.15)" stroke-width="2.5" fill="none"/>
          <circle id="ring-${key}" cx="40" cy="40" r="35" stroke="#E8C766" stroke-width="2.5" fill="none"
            stroke-dasharray="220" stroke-dashoffset="220" stroke-linecap="round"/>
        </svg>
        <div class="absolute inset-0 flex items-center justify-center countdown-num text-lg md:text-2xl text-[var(--gold-light)]" id="num-${key}">00</div>
      </div>
      <span class="eyebrow !text-[0.58rem] opacity-70">${label}</span>
    </div>`).join('');
}

function startCountdown() {
  buildCountdownMarkup();
  const target = new Date(C.wedding.dateISO).getTime();

  // Total days from TODAY to wedding — ring fills from full → empty as the big day approaches
  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);
  const totalDays = Math.ceil((target - todayMidnight.getTime()) / 86400000);

  const max = { days: totalDays, hours: 24, minutes: 60, seconds: 60 };

  function tick() {
    const diff = Math.max(0, target - Date.now());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000)   % 60);
    const s = Math.floor((diff / 1000)    % 60);
    const vals = { days: d, hours: h, minutes: m, seconds: s };

    Object.entries(vals).forEach(([k, v]) => {
      const numEl = $(`#num-${k}`);
      if (numEl) numEl.textContent = String(v).padStart(2, '0');
      const ring = $(`#ring-${k}`);
      if (ring) {
        // Days ring: countdown from totalDays → 0 (ring empties over time)
        // Other rings: fill as value rises within its cycle
        const pct = k === 'days'
          ? Math.min(1, v / max.days)          // today = almost full; wedding day = 0
          : v / max[k];
        ring.style.strokeDashoffset = 220 - 220 * pct;
      }
    });
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------------------------------------------------------
   7. Palace rooms — built from config.rooms
--------------------------------------------------------- */
function buildRooms() {
  const container = $('#rooms-container');
  container.innerHTML = C.rooms.map((room, i) => `
    <section class="room-section" id="room-${room.id}" aria-label="${room.title}">
      ${room.bgImage ? `<div class="room-bg" style="background:url('${room.bgImage}') center/cover no-repeat;"></div>` : ''}
      <div class="room-bg" style="background:${room.bg};"></div>
      <div class="room-vignette"></div>
      <div class="room-petals absolute inset-0 z-[2] pointer-events-none" data-room="${room.id}"></div>

      <div class="relative z-10 w-full px-6 py-16 flex items-center justify-center" data-room-content>
        <div class="room-card-inner text-center">
          <p class="text-5xl mb-4" data-room-emoji>${room.emoji}</p>
          <p class="eyebrow !text-[0.58rem]" style="color:${room.accent}; opacity:1;">
            Ceremony ${i + 1} of ${C.rooms.length}
          </p>
          <h2 class="font-display text-3xl md:text-4xl text-[var(--ivory)] mt-3 leading-tight" data-room-title>${room.title}</h2>
          <p class="font-script text-xl text-[var(--ivory)]/65 mt-1">${room.subtitle}</p>

          <div class="ornament-divider my-6" style="--hairline:${room.accent}40;">
            <span style="color:${room.accent}; opacity:0.8;">✦</span>
          </div>

          <p class="font-serif text-base text-[var(--ivory)]/72 leading-relaxed max-w-sm mx-auto">${room.description}</p>

          <div class="flex flex-wrap justify-center gap-3 mt-7 mb-7">
            <span class="room-meta-badge">📅 ${room.date}</span>
            <span class="room-meta-badge">📍 ${room.venue}</span>
            ${room.dressCode !== '—' ? `<span class="room-meta-badge">👗 ${room.dressCode}</span>` : ''}
          </div>

          <div class="hairline w-24 mx-auto mb-6" style="background:${room.accent}50;"></div>

          <div class="flex flex-wrap justify-center gap-3">
            <button class="btn-royal !text-[0.62rem] !py-2.5 !px-4" data-room-details='${JSON.stringify(room)}'>View Details</button>
            <a class="btn-royal !text-[0.62rem] !py-2.5 !px-4 inline-flex" href="${C.wedding.mapsUrl}" target="_blank" rel="noopener">Location →</a>
            <button class="btn-royal !text-[0.62rem] !py-2.5 !px-4" data-room-calendar='${JSON.stringify({ title: room.title, date: room.date, venue: room.venue })}'>+ Calendar</button>
          </div>
        </div>
      </div>
    </section>`).join('');

  // Per-room enhancements
  $$('.room-section').forEach((sec, i) => {
    const room  = C.rooms[i];
    const layer = $('.room-petals', sec);

    // Floating symbols
    for (let p = 0; p < 16; p++) {
      const el     = document.createElement('div');
      el.className = 'room-petal';
      el.style.left     = Math.random() * 100 + '%';
      el.style.fontSize = (9 + Math.random() * 13) + 'px';
      el.style.opacity  = (0.3 + Math.random() * 0.5).toFixed(2);
      el.textContent    = roomSymbol(room.id);
      layer.appendChild(el);
      gsap.set(el, { y: -40 - Math.random() * 200 });
      gsap.to(el, {
        y: '+=' + (window.innerHeight + 240),
        x: '+=' + (Math.random() * 80 - 40),
        rotate: Math.random() * 360,
        duration: 9 + Math.random() * 9,
        repeat: -1,
        delay: Math.random() * 7,
        ease: 'none',
      });
    }

    // Scroll reveal
    gsap.from(sec.querySelector('[data-room-content]'), {
      y: 55, opacity: 0, duration: 1.1, ease: 'power2.out',
      scrollTrigger: { trigger: sec, start: 'top 68%' },
    });

    // Special effects
    if (room.id === 'sangeet') addEqualizer(sec);
    if (room.id === 'mandap')  addFlame(sec);
  });

  // Event delegation for modals + calendar
  $$('[data-room-details]').forEach(btn =>
    btn.addEventListener('click', () => openRoomModal(JSON.parse(btn.dataset.roomDetails))));
  $$('[data-room-calendar]').forEach(btn =>
    btn.addEventListener('click', () => {
      const d = JSON.parse(btn.dataset.roomCalendar);
      addToGoogleCalendar(d.title, d.venue);
    }));
}

function roomSymbol(id) {
  return ({ haldi: '🌼', mehendi: '🌿', cocktail: '✦', sangeet: '🎵', mandap: '🌸', reception: '🥂', vidai: '🌅' })[id] || '✦';
}

function addEqualizer(sec) {
  const wrap = document.createElement('div');
  wrap.className = 'flex items-end gap-1 justify-center mt-2 h-8 relative z-10 mb-2';
  for (let i = 0; i < 14; i++) {
    const bar = document.createElement('div');
    bar.className = 'eq-bar';
    wrap.appendChild(bar);
    gsap.to(bar, {
      height: 6 + Math.random() * 26,
      duration: 0.25 + Math.random() * 0.3,
      yoyo: true, repeat: -1, ease: 'sine.inOut',
      delay: Math.random() * 0.5,
    });
  }
  const divider = sec.querySelector('.hairline');
  if (divider) sec.querySelector('[data-room-content] .room-card-inner').insertBefore(wrap, divider);
}

function addFlame(sec) {
  const el     = document.createElement('div');
  el.className = 'flame text-4xl mt-1 mb-1';
  el.textContent = '🔥';
  const divider = sec.querySelector('.hairline');
  if (divider) sec.querySelector('[data-room-content] .room-card-inner').insertBefore(el, divider);
  gsap.to(el, { scale: 1.18, rotate: 5, duration: 0.45, yoyo: true, repeat: -1, ease: 'sine.inOut' });
}

function openRoomModal(room) {
  const lb = $('#lightbox');
  $('#lightbox-content').innerHTML = `
    <p class="text-5xl mb-4">${room.emoji}</p>
    <h3 class="font-display text-2xl text-[var(--gold-light)] tracking-wide">${room.title}</h3>
    <p class="font-script text-lg text-[var(--ivory)]/65 mt-1 mb-4">${room.subtitle}</p>
    <div class="ornament-divider max-w-32 mx-auto mb-4"><span>✦</span></div>
    <p class="font-serif text-[var(--ivory)]/72 leading-relaxed mb-6">${room.description}</p>
    <div class="flex flex-wrap justify-center gap-3">
      <span class="room-meta-badge text-xs">${room.date}</span>
      <span class="room-meta-badge text-xs">${room.venue}</span>
      ${room.dressCode !== '—' ? `<span class="room-meta-badge text-xs">👗 ${room.dressCode}</span>` : ''}
    </div>`;
  lb.classList.remove('hidden');
  lb.classList.add('flex');
}

function addToGoogleCalendar(title, venue) {
  const start = new Date(C.wedding.dateISO).toISOString().replace(/[-:]|\.\d{3}/g, '');
  const url   = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title + ' — ' + C.couple.groom.name + ' & ' + C.couple.bride.name)}&dates=${start}/${start}&location=${encodeURIComponent(venue)}`;
  window.open(url, '_blank');
}

/* ---------------------------------------------------------
   8. Love story (Swiper)
--------------------------------------------------------- */
function buildLoveStory() {
  $('#love-story-wrapper').innerHTML = C.loveStory.map((item, i) => `
    <div class="swiper-slide !w-[300px] md:!w-[340px]">
      <div class="love-card p-7 md:p-8 h-72 flex flex-col justify-between">
        <div>
          <p class="year-badge">${item.year}</p>
          <h4 class="font-display text-base text-[var(--ivory)] mt-2 tracking-wide">${item.title}</h4>
        </div>
        <p class="font-serif text-[var(--ivory)]/68 leading-relaxed text-[0.95rem]">${item.text}</p>
      </div>
    </div>`).join('');

  new Swiper('.love-story-swiper', {
    slidesPerView: 'auto',
    spaceBetween:  28,
    centeredSlides: false,
    grabCursor:    true,
    loop:          false,
    pagination:    { el: '.swiper-pagination', clickable: true },
  });
}

/* ---------------------------------------------------------
   9. Families
--------------------------------------------------------- */
function buildFamilies() {
  $('#families-container').innerHTML = C.families.map(f => `
    <div class="family-card glass-gold p-8 text-center" data-reveal>
      <div class="family-avatar">${f.initial}</div>
      <p class="eyebrow !text-[0.58rem] opacity-70">${f.note}</p>
      <h3 class="font-display text-xl text-[var(--gold-light)] mt-2 mb-1">${f.side}</h3>
      <p class="font-serif text-xs text-[var(--ivory)]/40 tracking-wider mb-4">${f.city}</p>
      <div class="hairline w-16 mx-auto mb-5"></div>
      <p class="font-serif text-[var(--ivory)]/80">${f.father}</p>
      <p class="font-serif text-[var(--ivory)]/80 mt-1">${f.mother}</p>
      <div class="ornament-divider max-w-24 mx-auto mt-5 mb-3"><span>❦</span></div>
      <p class="font-serif italic text-[var(--ivory)]/45 text-sm leading-relaxed">${f.blessing}</p>
    </div>`).join('');
}

/* ---------------------------------------------------------
   10. Gallery (masonry + lightbox)
--------------------------------------------------------- */
function buildGallery() {
  const colors = [
    'rgba(15,74,55,0.9), rgba(11,61,46,0.95)',
    'rgba(122,31,43,0.9), rgba(74,15,23,0.95)',
    'rgba(62,125,76,0.9), rgba(22,59,34,0.95)',
    'rgba(201,162,39,0.7), rgba(122,92,18,0.9)',
    'rgba(42,79,160,0.9), rgba(16,35,77,0.95)',
    'rgba(43,35,48,0.9), rgba(21,16,28,0.95)',
  ];

  const emojis = ['🌸', '💍', '🌿', '✨', '🌺', '💛', '🌼', '❤️'];

  $('#gallery-masonry').innerHTML = C.gallery.map((g, i) => {
    const aspect = [3,4][i%2] + '/' + [4,3][i%2];
    return `
    <div class="gallery-item glass overflow-hidden cursor-pointer group" data-gallery-item="${i}" tabindex="0" role="button" aria-label="View: ${g.caption}">
      <div class="gallery-placeholder aspect-[${i % 3 === 0 ? '3/4' : i % 3 === 1 ? '4/3' : '1/1'}]
        flex items-center justify-center text-5xl transition-transform duration-500"
        style="background:linear-gradient(160deg,${colors[i % colors.length]})">
        ${emojis[i % emojis.length]}
      </div>
      <div class="gallery-overlay">
        <p class="font-serif italic text-sm text-[var(--ivory)]/80">${g.caption}</p>
      </div>
    </div>`;
  }).join('');

  $$('[data-gallery-item]').forEach(el => {
    const open = () => {
      const i = +el.dataset.galleryItem;
      const g = C.gallery[i];
      $('#lightbox-content').innerHTML = `
        <div class="aspect-video flex items-center justify-center text-8xl mb-5 rounded-sm overflow-hidden"
          style="background:linear-gradient(160deg,${colors[i % colors.length]})">
          ${emojis[i % emojis.length]}
        </div>
        <p class="font-serif italic text-[var(--ivory)]/70">${g.caption}</p>`;
      $('#lightbox').classList.remove('hidden');
      $('#lightbox').classList.add('flex');
    };
    el.addEventListener('click', open);
    el.addEventListener('keydown', e => { if (e.key === 'Enter') open(); });
  });
}

/* ---------------------------------------------------------
   11. Film embed
--------------------------------------------------------- */
function buildFilm() { $('#film-embed').src = C.film.embedUrl; }

/* ---------------------------------------------------------
   12. Menu tabs
--------------------------------------------------------- */
function buildMenu() {
  const tabsEl    = $('#menu-tabs');
  const contentEl = $('#menu-content');
  const keys      = Object.keys(C.menu);

  const catIcons = {
    'Vegetarian':      '🥗',
    'Non-Vegetarian':  '🍖',
    'Beverages':       '🥤',
    'Desserts':        '🍮',
    'Breads':          '🫓',
  };

  tabsEl.innerHTML = keys.map((k, i) =>
    `<button class="btn-royal menu-tab !text-[0.62rem] !py-2.5 !px-4 ${i === 0 ? '!bg-[var(--gold)] !text-[var(--midnight)] !border-[var(--gold)]' : ''}" data-menu="${k}">${k}</button>`
  ).join('');

  function render(key) {
    const cats = C.menu[key];
    contentEl.innerHTML = `
      <div class="glass-gold p-6 md:p-8">
        <p class="eyebrow mb-6 text-center opacity-60">Menu — ${key}</p>
        ${Object.entries(cats).map(([cat, items]) => `
          <div class="mb-7 last:mb-0">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-lg">${catIcons[cat] || '✦'}</span>
              <p class="eyebrow !text-[0.58rem] !text-[var(--gold-light)]">${cat}</p>
            </div>
            <div class="flex flex-wrap gap-2">
              ${items.map(it => `<span class="menu-item-pill">${it}</span>`).join('')}
            </div>
          </div>`).join('')}
      </div>`;
  }

  tabsEl.addEventListener('click', e => {
    const btn = e.target.closest('[data-menu]');
    if (!btn) return;
    $$('.menu-tab').forEach(b => {
      b.classList.remove('!bg-[var(--gold)]', '!text-[var(--midnight)]', '!border-[var(--gold)]');
    });
    btn.classList.add('!bg-[var(--gold)]', '!text-[var(--midnight)]', '!border-[var(--gold)]');
    render(btn.dataset.menu);
  });

  render(keys[0]);
}

/* ---------------------------------------------------------
   13. Dress code
--------------------------------------------------------- */
function buildDressCode() {
  const dc     = C.dressCode;
  const groups = ['Male', 'Female', 'Kids'];
  const icons  = { Male: '🤵', Female: '👰', Kids: '🧒' };

  $('#dresscode-container').innerHTML =
    `<div class="grid md:grid-cols-3 gap-6">` +
    groups.map(g => `
      <div class="glass p-6 relative overflow-hidden">
        <div class="text-center mb-5">
          <span class="text-3xl">${icons[g]}</span>
          <p class="font-display text-[var(--gold-light)] mt-2 tracking-wide text-sm">${g}</p>
        </div>
        <div class="hairline mb-4"></div>
        ${Object.entries(dc[g]).map(([occ, outfit]) => `
          <div class="dresscode-row">
            <span class="occ font-serif">${occ}</span>
            <span class="outfit font-serif">${outfit}</span>
          </div>`).join('')}
      </div>`).join('') + `</div>`;

  $('#palette-swatches').innerHTML = dc.palette.map((c, i) => `
    <div class="flex flex-col items-center gap-2">
      <div class="w-10 h-10 rounded-full border-2 border-white/15 shadow-lg" style="background:${c}" title="${c}"></div>
      <p class="text-[0.58rem] font-serif text-[var(--ivory)]/40 tracking-wide text-center" style="max-width:60px;">${dc.paletteLabels?.[i] || ''}</p>
    </div>`).join('');
}

/* ---------------------------------------------------------
   14. Digital invitation actions
--------------------------------------------------------- */
function buildInvitationActions() {
  $('#btn-share-whatsapp').addEventListener('click', () => {
    const text = encodeURIComponent(
      `You're invited to ${C.couple.groom.name} & ${C.couple.bride.name}'s wedding! ` +
      `${C.wedding.dateLabel} at ${C.wedding.venueName}, ${C.wedding.city}. ${location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  });

  $('#btn-copy-link').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      flashButton($('#btn-copy-link'), '✓ Copied!');
    } catch {
      flashButton($('#btn-copy-link'), 'See address bar');
    }
  });

  $('#btn-download-invite').addEventListener('click', () =>
    flashButton($('#btn-download-invite'), '⌛ Generating…'));

  $('#btn-show-qr').addEventListener('click', () => {
    const box = $('#qr-box');
    box.classList.toggle('hidden');
    if (!box.classList.contains('hidden')) {
      drawQR(location.href);
      gsap.from('#qr-canvas', { opacity: 0, scale: 0.85, duration: 0.5 });
    }
  });
}

function flashButton(btn, msg) {
  const orig = btn.innerHTML;
  btn.innerHTML = msg;
  setTimeout(() => btn.innerHTML = orig, 1800);
}

function drawQR(str) {
  const canvas = $('#qr-canvas');
  const ctx    = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 160, 160);
  ctx.fillStyle = '#0A0A12';
  let seed = 0;
  for (const ch of str) seed = (seed * 31 + ch.charCodeAt(0)) % 99999;
  const cells = 17, size = 160 / cells;
  for (let y = 0; y < cells; y++) for (let x = 0; x < cells; x++) {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    if (seed % 2 === 0) ctx.fillRect(x * size, y * size, size, size);
  }
  [[0, 0], [cells - 3, 0], [0, cells - 3]].forEach(([fx, fy]) => {
    ctx.fillStyle = '#0A0A12';
    ctx.fillRect(fx * size, fy * size, size * 3, size * 3);
    ctx.fillStyle = '#fff';
    ctx.fillRect(fx * size + size * 0.5, fy * size + size * 0.5, size * 2, size * 2);
    ctx.fillStyle = '#0A0A12';
    ctx.fillRect(fx * size + size, fy * size + size, size, size);
  });
}

/* ---------------------------------------------------------
   15. Location / venue actions
--------------------------------------------------------- */
function buildLocationActions() {
  $('#btn-hotels').addEventListener('click', () =>
    window.open(`https://www.google.com/maps/search/hotels+near+${encodeURIComponent(C.wedding.venueName + ' ' + C.wedding.city)}`, '_blank'));

  $('#btn-parking').addEventListener('click', () => {
    openInfoModal('Parking Information', '🚗', C.venue.parking);
  });
}

function openInfoModal(title, icon, text) {
  $('#lightbox-content').innerHTML = `
    <div class="text-4xl mb-4">${icon}</div>
    <h3 class="font-display text-xl text-[var(--gold-light)] mb-4">${title}</h3>
    <p class="font-serif text-[var(--ivory)]/70 leading-relaxed">${text}</p>`;
  $('#lightbox').classList.remove('hidden');
  $('#lightbox').classList.add('flex');
}

/* ---------------------------------------------------------
   16. RSVP form
--------------------------------------------------------- */
function buildRSVP() {
  let rsvpStatus = null;

  $$('.rsvp-opt').forEach(btn =>
    btn.addEventListener('click', () => {
      rsvpStatus = btn.dataset.val;
      $$('.rsvp-opt').forEach(b =>
        b.classList.remove('!bg-[var(--gold)]', '!text-[var(--midnight)]', '!border-[var(--gold)]'));
      btn.classList.add('!bg-[var(--gold)]', '!text-[var(--midnight)]', '!border-[var(--gold)]');
    }));

  $('#rsvp-form').addEventListener('submit', e => {
    e.preventDefault();
    const success = $('#rsvp-success');
    success.classList.remove('hidden');
    gsap.from(success, { opacity: 0, y: 10, duration: 0.5 });
    confetti({ particleCount: 100, spread: 75, colors: ['#C9A227', '#E8C766', '#F8F1E1'], origin: { y: 0.7 } });
    setTimeout(() => {
      e.target.reset();
      $$('.rsvp-opt').forEach(b =>
        b.classList.remove('!bg-[var(--gold)]', '!text-[var(--midnight)]', '!border-[var(--gold)]'));
      gsap.to(success, { opacity: 0, duration: 0.4, delay: 4, onComplete: () => success.classList.add('hidden') });
    }, 5000);
  });
}

/* ---------------------------------------------------------
   17. Memory wall
--------------------------------------------------------- */
function buildMemoryWall() {
  const wall = $('#wish-wall');
  const seeds = [
    { name: 'Riya & Karan', text: 'Wishing you a lifetime of love, laughter and very good food. We cannot wait to celebrate with you!' },
    { name: 'Aunt Meera',   text: 'Two wonderful families becoming one. This is the happiest news — couldn\'t be prouder of you both.' },
    { name: 'Dev Sharma',   text: 'May every ordinary Tuesday feel like an adventure. Here\'s to you two, forever.' },
    { name: 'Priya & Rohan',text: 'You have found your person. That\'s the rarest, most beautiful thing. We raise a glass to what comes next.' },
  ];

  function addWish(name, text) {
    const card     = document.createElement('div');
    card.className = 'wish-card glass p-5 md:p-6';
    card.innerHTML = `
      <p class="font-serif italic text-[var(--ivory)]/82 leading-relaxed pt-3">${text}</p>
      <div class="flex items-center justify-between mt-5">
        <div>
          <p class="text-xs text-[var(--gold-light)] tracking-wider font-serif">— ${name}</p>
          <p class="text-[0.6rem] text-[var(--ivory)]/30 tracking-widest uppercase font-serif mt-0.5">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
        </div>
        <button class="heart-btn text-xl transition-transform hover:scale-125" aria-label="Like this wish">🤍</button>
      </div>`;
    card.querySelector('.heart-btn').addEventListener('click', function () {
      this.textContent = this.textContent === '🤍' ? '❤️' : '🤍';
      gsap.fromTo(this, { scale: 1.5 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' });
    });
    wall.prepend(card);
    gsap.from(card, { opacity: 0, y: 20, duration: 0.6 });
  }

  seeds.forEach(s => addWish(s.name, s.text));

  $('#wish-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = e.target.wisher.value.trim() || 'A Well-wisher';
    const text = e.target.wish.value.trim();
    if (!text) return;
    addWish(name, text);
    e.target.reset();
  });
}

/* ---------------------------------------------------------
   18. Thank-you lanterns
--------------------------------------------------------- */
function initThankYou() {
  const canvas = $('#lantern-canvas');
  const ctx    = canvas.getContext('2d');
  let w, h, lanterns = [];

  function resize() {
    w = canvas.width  = canvas.parentElement.clientWidth;
    h = canvas.height = canvas.parentElement.clientHeight;
  }
  resize();
  addEventListener('resize', resize);

  for (let i = 0; i < 22; i++) {
    lanterns.push({
      x:    Math.random() * (w || 800),
      y:    (h || 600) + Math.random() * (h || 600),
      r:    7 + Math.random() * 9,
      vy:   0.25 + Math.random() * 0.45,
      sway: Math.random() * Math.PI * 2,
    });
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    lanterns.forEach(l => {
      l.sway += 0.018; l.y -= l.vy; l.x += Math.sin(l.sway) * 0.3;
      if (l.y < -20) { l.y = h + 20; l.x = Math.random() * w; }
      const grad = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.r * 2.5);
      grad.addColorStop(0, 'rgba(232,199,102,0.88)');
      grad.addColorStop(1, 'rgba(232,199,102,0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(l.x, l.y, l.r * 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#E8C766';
      ctx.beginPath(); ctx.arc(l.x, l.y, l.r * 0.3, 0, Math.PI * 2); ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  tick();

  ScrollTrigger.create({
    trigger: '#thank-you', start: 'top 65%', once: true,
    onEnter: () => confetti({
      particleCount: 220, spread: 130, startVelocity: 48,
      colors: ['#C9A227', '#E8C766', '#F8F1E1', '#7A1F2B', '#f5e5a8'],
      origin: { y: 0.5 },
    }),
  });
}

/* ---------------------------------------------------------
   19. Scroll reveals
--------------------------------------------------------- */
function initScrollReveals() {
  $$('[data-reveal]').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 35 },
      {
        opacity: 1, y: 0, duration: 1.1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 82%' },
      });
  });
}

/* ---------------------------------------------------------
   20. Music toggle
--------------------------------------------------------- */
function initMusicToggle() {
  let playing = false;
  const btn   = $('#music-toggle');
  btn.addEventListener('click', function () {
    playing       = !playing;
    this.textContent = playing ? '❚❚' : '♪';
    gsap.to(this, { rotate: playing ? 360 : 0, duration: 0.65, ease: 'back.out(1.5)' });
  });
}

/* ---------------------------------------------------------
   INIT
--------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden';
  hydrateText();
  initPetals();
  runIntroSequence();

  $('#wax-seal').addEventListener('click', breakSeal);
  $('#btn-reveal-date').addEventListener('click', goToScratch);
  $('#btn-enter-palace').addEventListener('click', enterPalace);
  $('#lightbox-close').addEventListener('click', () => {
    $('#lightbox').classList.add('hidden');
    $('#lightbox').classList.remove('flex');
  });
  // Close lightbox on backdrop click
  $('#lightbox').addEventListener('click', e => {
    if (e.target === $('#lightbox')) {
      $('#lightbox').classList.add('hidden');
      $('#lightbox').classList.remove('flex');
    }
  });

  buildRooms();
  buildLoveStory();
  buildFamilies();
  buildGallery();
  buildFilm();
  buildMenu();
  buildDressCode();
  buildInvitationActions();
  buildLocationActions();
  buildRSVP();
  buildMemoryWall();
  initThankYou();
  initMusicToggle();
});
