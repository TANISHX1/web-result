/**
 * ROMANTIC BESTIE BIRTHDAY - INTERACTIVE JAVASCRIPT ENGINE
 * Mobile-First, Vanilla JS, Web Audio API Synthesizer, Canvas Atmosphere
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. STATE & PERSISTENCE
  // =========================================================================
  const state = {
    isMusicPlaying: false,
    candlesLit: true,
    currentPhotoIndex: 0,
    bestieName: localStorage.getItem('bestie_name') || 'Precious Bestie',
    currentTrack: 0,
  };

  // Pre-load photos list
  const photos = [
    { src: 'assets/images/bestie_snap_1.jpg', caption: 'That irreplaceable smile that lights up any dark room ✨' },
    { src: 'assets/images/bestie_snap_2.jpg', caption: 'Unfiltered laughter and late-night heart-to-hearts 🌙' },
    { src: 'assets/images/bestie_snap_3.jpg', caption: 'The one person who knows my wildest dreams and silliness! 💫' },
    { src: 'assets/images/bestie_snap_4.jpg', caption: 'Glow like nobody else can. Simply stunning 🌟' },
    { src: 'assets/images/bestie_snap_5.jpg', caption: 'Candid perfection. Every picture tells an unforgettable story!' },
    { src: 'assets/images/memory_2022_main.jpg', caption: 'Every adventure with you turns into a lifetime treasure.' },
    { src: 'assets/images/memory_night.jpg', caption: 'Night talks and sweet confidences under the stars ✨' },
    { src: 'assets/images/memory_fun.jpg', caption: 'Joyful memories and effortless happiness with my favorite person! 🌺' },
    { src: 'assets/images/IMG-20220207-WA0017.jpg', caption: 'Cherished moments that will always hold a piece of my heart 🌹' },
    { src: 'assets/images/IMG_20250920_201259_790.jpg', caption: 'That glowing, beautiful energy you bring everywhere you go 👑' },
    { src: 'assets/images/bestie_snap_11.jpg', caption: 'Your style, elegance, and pure grace light up the world ✨' },
    { src: 'assets/images/bestie_wa_1.jpg', caption: 'Unforgettable smiles and sweet everyday adventures 🌸' },
    { src: 'assets/images/bestie_wa_2.jpg', caption: 'Two souls destined to laugh together forever 💕' },
    { src: 'assets/images/bestie_wa_3.jpg', caption: 'The brightest sparkle in the whole room, always! 🥂' },
  ];

  // 35 Romantic & Heartfelt Reasons
  const reasonsList = [
    "You make ordinary days feel like a celebration just by being in them.",
    "Your laugh is genuinely the most contagious, healing sound in the universe.",
    "You always listen without judgment and understand the things I can't even put into words.",
    "The way your eyes sparkle when you talk about things you love.",
    "You give the absolute warmest, most comforting hugs when everything else is chaos.",
    "You are fiercely loyal, protective, and have the purest golden heart.",
    "Every memory made with you turns into a story I'll treasure forever.",
    "You inspire me every day to be a kinder, more authentic person.",
    "You remember the tiniest little details about the people you care about.",
    "Your sense of humor is unmatched—we could laugh at literally nothing for hours!",
    "Even when miles apart, you make distance feel completely irrelevant.",
    "You bring out the most confident, happy, and unbothered version of me.",
    "You are stunning inside and out—a true definition of grace and beauty.",
    "The world is simply a softer, better place with you in it.",
    "You celebrate my smallest wins with the same hype as the biggest ones.",
    "You can turn a boring ride into an unforgettable adventure with music and jokes.",
    "Your presence alone feels like coming home after a long journey.",
    "You always know the exact right words to say to brighten a gloomy day.",
    "You are unapologetically yourself, and that is your superpower.",
    "The late-night conversations where we solve all the problems of life.",
    "You love with your whole heart and never hold back kindness.",
    "Having you as my best friend is the greatest blessing I could have asked for.",
    "Your style, your glow, and your effortless charm.",
    "You believe in me even when I forget to believe in myself.",
    "You are the sister I got to choose for life.",
    "No one else understands my weird jokes and facial expressions like you do.",
    "You never judge me for eating too much or making silly impulsive choices.",
    "You bring sunshine wherever you go, naturally illuminating every room.",
    "You are the first person I want to text whenever anything good happens.",
    "Your gentle empathy towards everyone around you is rare and precious.",
    "You make life infinitely sweeter, more colorful, and full of magic.",
    "I can always be 100% my vulnerable self around you without hesitation.",
    "You deserve every drop of happiness, love, and success the cosmos can offer.",
    "Life is just better, funnier, and more meaningful with you by my side.",
    "Today and every day, I celebrate you with all my heart! 💖"
  ];

  // =========================================================================
  // 2. ROMANTIC WEB AUDIO SYNTHESIZER & SOUND FX
  // =========================================================================
  let audioCtx = null;
  let synthInterval = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Play a soft acoustic tone with harmonic decay
  function playNote(freq, type = 'sine', duration = 1.2, gainValue = 0.15) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainValue, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio note error:", e);
    }
  }

  // Sound FX: Chime
  function playChime() {
    initAudio();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => playNote(freq, 'triangle', 0.8, 0.18), idx * 90);
    });
  }

  // Sound FX: Heart Pop
  function playPop() {
    initAudio();
    playNote(880, 'sine', 0.25, 0.2);
    setTimeout(() => playNote(1174.66, 'triangle', 0.35, 0.15), 60);
  }

  // Sound FX: Gentle Blow / Whoosh
  function playBlowSound() {
    initAudio();
    const notes = [659.25, 587.33, 523.25, 392.00];
    notes.forEach((freq, idx) => {
      setTimeout(() => playNote(freq, 'sine', 0.6, 0.12), idx * 120);
    });
  }

  // Melodic Background Song Player (Procedural Canon in D / Romantic Arpeggios)
  const melodyChords = [
    // D Major, A Major, B Minor, F# Minor, G Major, D Major, G Major, A Major
    [293.66, 369.99, 440.00, 587.33], // D4, F#4, A4, D5
    [220.00, 277.18, 329.63, 440.00], // A3, C#4, E4, A4
    [246.94, 293.66, 369.99, 493.88], // B3, D4, F#4, B4
    [185.00, 220.00, 277.18, 369.99], // F#3, A3, C#4, F#4
    [196.00, 246.94, 293.66, 392.00], // G3, B3, D4, G4
    [146.83, 220.00, 293.66, 440.00], // D3, A3, D4, A4
    [196.00, 293.66, 392.00, 587.33], // G3, D4, G4, D5
    [220.00, 277.18, 329.63, 554.37], // A3, C#4, E4, C#5
  ];

  let currentChordStep = 0;
  let noteInChordStep = 0;

  function startRomanticSynth() {
    initAudio();
    if (synthInterval) clearInterval(synthInterval);
    
    synthInterval = setInterval(() => {
      if (!state.isMusicPlaying) return;
      const chord = melodyChords[currentChordStep];
      const noteFreq = chord[noteInChordStep];
      
      // Play soothing arpeggio note
      playNote(noteFreq, 'sine', 1.4, 0.08);
      
      // Add subtle harmonic octave sparkle randomly
      if (noteInChordStep === 3 && Math.random() > 0.4) {
        setTimeout(() => playNote(noteFreq * 2, 'triangle', 0.8, 0.04), 180);
      }

      noteInChordStep++;
      if (noteInChordStep >= chord.length) {
        noteInChordStep = 0;
        currentChordStep = (currentChordStep + 1) % melodyChords.length;
      }
    }, 420);
  }

  function stopRomanticSynth() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  // Music Toggle Controller
  const musicToggle = document.getElementById('musicToggle');
  const equalizerBars = document.getElementById('equalizerBars');
  const musicStatusText = document.getElementById('musicStatusText');

  function setMusicState(play) {
    state.isMusicPlaying = play;
    if (play) {
      initAudio();
      startRomanticSynth();
      equalizerBars.classList.add('playing');
      musicStatusText.textContent = 'Music: ON 💖';
      musicToggle.style.borderColor = '#ff4b8b';
    } else {
      stopRomanticSynth();
      equalizerBars.classList.remove('playing');
      musicStatusText.textContent = 'Music: OFF';
      musicToggle.style.borderColor = 'rgba(248, 213, 126, 0.35)';
    }
  }

  musicToggle.addEventListener('click', () => {
    setMusicState(!state.isMusicPlaying);
    playPop();
  });

  // Track list click
  document.querySelectorAll('.track-item').forEach((item, idx) => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.track-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      state.currentTrack = idx;
      if (!state.isMusicPlaying) {
        setMusicState(true);
      }
      playChime();
    });
  });

  // =========================================================================
  // 3. CANVAS AMBIENT ATMOSPHERE: HEARTS, STARS, ROSE PETALS
  // =========================================================================
  const canvas = document.getElementById('ambientCanvas');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const MAX_PARTICLES = 45;

  class AmbientParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = Math.random() * 12 + 6;
      this.speedY = -(Math.random() * 0.8 + 0.3);
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.type = Math.random() > 0.45 ? 'heart' : (Math.random() > 0.5 ? 'petal' : 'star');
      this.opacity = Math.random() * 0.6 + 0.2;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.03;
      this.color = Math.random() > 0.5 ? '#ff4b8b' : (Math.random() > 0.5 ? '#ff9ec3' : '#f8d57e');
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
      this.rotation += this.rotationSpeed;

      if (this.y < -30 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;

      if (this.type === 'heart') {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, this.size, 0, this.size);
        ctx.bezierCurveTo(0, this.size, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
        ctx.closePath();
        ctx.fill();
      } else if (this.type === 'petal') {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.4, this.size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Star sparkle
        ctx.fillStyle = '#fff';
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.18, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < MAX_PARTICLES; i++) {
    particles.push(new AmbientParticle());
  }

  function renderAmbient() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(renderAmbient);
  }
  renderAmbient();

  // =========================================================================
  // 4. INTERACTIVE ENVELOPE / GIFT UNWRAPPING
  // =========================================================================
  const envelopeOverlay = document.getElementById('envelopeOverlay');
  const envelopeBox = document.getElementById('envelopeBox');
  const openGiftBtn = document.getElementById('openGiftBtn');
  const waxSealBtn = document.getElementById('waxSealBtn');

  function openGiftExperience() {
    playChime();
    setMusicState(true);
    envelopeBox.classList.add('flap-open');

    // Confetti explosion
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ff4b8b', '#f8d57e', '#ff85ad', '#ffffff']
      });
    }

    setTimeout(() => {
      envelopeOverlay.classList.add('opened');
      // Secondary firework confetti
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 120,
          spread: 120,
          origin: { y: 0.4 },
          colors: ['#ff4b8b', '#f8d57e', '#ff0055', '#ffebaa']
        });
      }
    }, 850);
  }

  openGiftBtn.addEventListener('click', openGiftExperience);
  waxSealBtn.addEventListener('click', openGiftExperience);

  // =========================================================================
  // 5. BIRTHDAY COUNTDOWN / TIME COUNTER
  // =========================================================================
  const countHoursEl = document.getElementById('countHours');
  const countMinsEl = document.getElementById('countMins');
  const countSecsEl = document.getElementById('countSecs');

  function updateCountdown() {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    const diff = endOfDay - now;

    if (diff > 0) {
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      countHoursEl.textContent = String(hours).padStart(2, '0');
      countMinsEl.textContent = String(mins).padStart(2, '0');
      countSecsEl.textContent = String(secs).padStart(2, '0');
    }
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();

  // =========================================================================
  // 6. INTERACTIVE BIRTHDAY CAKE & WISH MAKER
  // =========================================================================
  const blowCandleBtn = document.getElementById('blowCandleBtn');
  const candleFlames = document.querySelectorAll('.candle-flame');
  const candleStatusIcon = document.getElementById('candleStatusIcon');
  const candleStatusMsg = document.getElementById('candleStatusMsg');
  const blowBtnLabel = document.getElementById('blowBtnLabel');
  const wishModal = document.getElementById('wishModal');
  const closeWishModalBtn = document.getElementById('closeWishModalBtn');

  function extinguishCandles() {
    if (!state.candlesLit) {
      // Re-light candles
      state.candlesLit = true;
      candleFlames.forEach(f => f.classList.remove('extinguished'));
      candleStatusIcon.textContent = '🔥';
      candleStatusMsg.textContent = 'The candles are glowing brightly! Tap below to blow:';
      blowBtnLabel.textContent = '💨 Blow Out The Candles!';
      playPop();
      return;
    }

    // Blow out!
    state.candlesLit = false;
    playBlowSound();
    candleFlames.forEach(f => f.classList.add('extinguished'));
    candleStatusIcon.textContent = '✨';
    candleStatusMsg.textContent = '✨ You blew them all out! Your wish is on its way to heaven!';
    blowBtnLabel.textContent = '🔥 Light Them Up Again';

    // Massive confetti celebration
    if (typeof confetti === 'function') {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 40 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: 0.3, y: 0.6 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: 0.7, y: 0.6 } }));
      }, 250);
    }

    setTimeout(() => {
      wishModal.classList.add('active');
      playChime();
    }, 1200);
  }

  blowCandleBtn.addEventListener('click', extinguishCandles);
  candleFlames.forEach(f => f.addEventListener('click', extinguishCandles));
  closeWishModalBtn.addEventListener('click', () => {
    wishModal.classList.remove('active');
    playPop();
  });

  // =========================================================================
  // 7. POLAROID SCRAPBOOK & PHOTO MODAL
  // =========================================================================
  const polaroids = document.querySelectorAll('.polaroid-card');
  const photoModal = document.getElementById('photoModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaptionText = document.getElementById('modalCaptionText');
  const modalCounter = document.getElementById('modalCounter');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalPrevBtn = document.getElementById('modalPrevBtn');
  const modalNextBtn = document.getElementById('modalNextBtn');

  function openPhotoModal(index) {
    state.currentPhotoIndex = index;
    const photo = photos[index];
    modalImg.src = photo.src;
    modalCaptionText.textContent = photo.caption;
    modalCounter.textContent = `${index + 1} / ${photos.length}`;
    photoModal.classList.add('active');
    playPop();
  }

  function closePhotoModal() {
    photoModal.classList.remove('active');
  }

  function nextPhoto() {
    state.currentPhotoIndex = (state.currentPhotoIndex + 1) % photos.length;
    openPhotoModal(state.currentPhotoIndex);
  }

  function prevPhoto() {
    state.currentPhotoIndex = (state.currentPhotoIndex - 1 + photos.length) % photos.length;
    openPhotoModal(state.currentPhotoIndex);
  }

  polaroids.forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10) || 0;
      openPhotoModal(idx);
    });
  });

  modalCloseBtn.addEventListener('click', closePhotoModal);
  modalNextBtn.addEventListener('click', nextPhoto);
  modalPrevBtn.addEventListener('click', prevPhoto);

  photoModal.addEventListener('click', (e) => {
    if (e.target === photoModal) closePhotoModal();
  });

  // Mobile Swipe Gesture for Modal Photo Navigation
  let touchStartX = 0;
  let touchEndX = 0;

  photoModal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  photoModal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 40) {
      nextPhoto(); // swiped left
    } else if (touchEndX > touchStartX + 40) {
      prevPhoto(); // swiped right
    }
  }, { passive: true });

  // =========================================================================
  // 8. "OPEN WHEN..." 3D FLIP CARDS
  // =========================================================================
  const capsuleCards = document.querySelectorAll('.capsule-card');
  capsuleCards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      playPop();
      if (card.classList.contains('flipped')) {
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 25,
            spread: 50,
            origin: { y: 0.7 },
            colors: ['#ff4b8b', '#f8d57e']
          });
        }
      }
    });
  });

  // =========================================================================
  // 9. JAR OF INFINITE REASONS GENERATOR
  // =========================================================================
  const generateReasonBtn = document.getElementById('generateReasonBtn');
  const anotherReasonBtn = document.getElementById('anotherReasonBtn');
  const reasonText = document.getElementById('reasonText');
  const reasonCounter = document.getElementById('reasonCounter');
  let reasonIndex = 0;

  function showNextReason() {
    playPop();
    reasonIndex = (reasonIndex + 1) % reasonsList.length;
    
    // Smooth transition
    reasonText.style.opacity = '0';
    reasonText.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      reasonText.textContent = reasonsList[reasonIndex];
      reasonCounter.textContent = `Reason #${reasonIndex + 1} of ${reasonsList.length}`;
      reasonText.style.opacity = '1';
      reasonText.style.transform = 'translateY(0)';
      reasonText.style.transition = 'all 0.3s ease';
    }, 200);

    // Mini heart burst from the heart
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 20,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ff4b8b', '#ff7ea8', '#f8d57e']
      });
    }
  }

  generateReasonBtn.addEventListener('click', showNextReason);
  anotherReasonBtn.addEventListener('click', showNextReason);

  // =========================================================================
  // 10. PERSONALIZE BESTIE'S NAME
  // =========================================================================
  const nameEditBtn = document.getElementById('nameEditBtn');
  const nameModal = document.getElementById('nameModal');
  const bestieNameInput = document.getElementById('bestieNameInput');
  const saveNameBtn = document.getElementById('saveNameBtn');
  const cancelNameBtn = document.getElementById('cancelNameBtn');
  
  const bestieNameDisplay = document.getElementById('bestieNameDisplay');
  const nameChipText = document.getElementById('nameChipText');
  const letterNameSlot = document.querySelector('.letter-name-slot');
  const headerTitle = document.getElementById('headerTitle');

  function updateName(name) {
    if (!name || !name.trim()) return;
    const cleanName = name.trim();
    state.bestieName = cleanName;
    localStorage.setItem('bestie_name', cleanName);

    bestieNameDisplay.textContent = cleanName;
    nameChipText.textContent = cleanName;
    if (letterNameSlot) letterNameSlot.textContent = cleanName;
    if (headerTitle) headerTitle.textContent = `For ${cleanName} ✨`;
  }

  // Init name from localStorage
  updateName(state.bestieName);

  nameEditBtn.addEventListener('click', () => {
    bestieNameInput.value = state.bestieName;
    nameModal.classList.add('active');
    playPop();
  });

  cancelNameBtn.addEventListener('click', () => {
    nameModal.classList.remove('active');
  });

  saveNameBtn.addEventListener('click', () => {
    if (bestieNameInput.value) {
      updateName(bestieNameInput.value);
    }
    nameModal.classList.remove('active');
    playChime();
    if (typeof confetti === 'function') {
      confetti({ particleCount: 50, spread: 80, origin: { y: 0.5 } });
    }
  });

  // =========================================================================
  // 11. FLOATING ACTION BUTTONS (SHOWER LOVE, HUG, SPARKLES)
  // =========================================================================
  const sendLoveBtn = document.getElementById('sendLoveBtn');
  const sendHugBtn = document.getElementById('sendHugBtn');
  const sendSparklesBtn = document.getElementById('sendSparklesBtn');

  function createFloatingEmojiShower(emojiList, count = 18) {
    playPop();
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
        el.style.position = 'fixed';
        el.style.left = `${Math.random() * 85 + 5}vw`;
        el.style.bottom = '30px';
        el.style.fontSize = `${Math.random() * 24 + 20}px`;
        el.style.zIndex = '9999';
        el.style.pointerEvents = 'none';
        el.style.transition = 'all 2.2s cubic-bezier(0.2, 0.8, 0.2, 1)';
        el.style.transform = `translateY(0) scale(0.5) rotate(0deg)`;
        el.style.opacity = '1';

        document.body.appendChild(el);

        requestAnimationFrame(() => {
          el.style.transform = `translateY(-${Math.random() * 70 + 60}vh) scale(1.4) rotate(${(Math.random() - 0.5) * 60}deg)`;
          el.style.opacity = '0';
        });

        setTimeout(() => el.remove(), 2300);
      }, i * 70);
    }
  }

  sendLoveBtn.addEventListener('click', () => {
    createFloatingEmojiShower(['💖', '💕', '💗', '💓', '💝', '🌹', '✨']);
    if (typeof confetti === 'function') {
      confetti({ particleCount: 40, spread: 70, origin: { y: 0.85 }, colors: ['#ff4b8b', '#ff7da7', '#fff'] });
    }
  });

  sendHugBtn.addEventListener('click', () => {
    createFloatingEmojiShower(['🤗', '🫂', '🥺', '🤍', '🧸', '💖']);
  });

  sendSparklesBtn.addEventListener('click', () => {
    createFloatingEmojiShower(['✨', '⭐', '🌟', '💫', '👑', '🎉', '🥂']);
    if (typeof confetti === 'function') {
      confetti({ particleCount: 60, spread: 100, origin: { y: 0.2 }, colors: ['#f8d57e', '#ffffff', '#ffebaa'] });
    }
  });

  // Scroll to top button
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      playPop();
    });
  }
});
