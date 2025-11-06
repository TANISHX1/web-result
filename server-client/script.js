/* gallery + modal + small carousel
   - grid uses all available images (img1..img13)
   - carousel uses first 5 images and auto-plays with smooth transitions
*/

const GRID_IMAGES = [
    'image/img1.png', 'image/img2.png', 'image/img3.png', 'image/img4.png', 'image/img5.png',
    'image/img6.png', 'image/img7.png', 'image/img8.png', 'image/img9.png', 'image/img10.png',
    'image/img11.png', 'image/img12.png', 'image/img13.png', 'image/img14.jpg', 'image/img15.png'
];

const CAROUSEL_IMAGES = GRID_IMAGES.slice(0, 5);

// --- Grid render ---
const grid = document.getElementById('grid');
function makeCard(src, idx) {
    const wrap = document.createElement('div');
    wrap.className = 'rounded-xl overflow-hidden shadow-lg border border-slate-800 cursor-pointer glass transition-transform transform hover:scale-105';
    const img = document.createElement('img');
    img.src = src;
    img.alt = `screenshot-${idx + 1}`;
    img.loading = 'lazy';
    img.className = 'w-full object-cover img-h';
    img.onerror = () => {
        img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="100%" height="100%" fill="#0f172a"/><text x="50%" y="50%" font-size="20" fill="#94a3b8" text-anchor="middle" dominant-baseline="middle">Image not found</text></svg>`);
    };
    wrap.appendChild(img);
    const cap = document.createElement('div');
    cap.className = 'p-3';
    cap.innerHTML = `<div class="text-sm font-medium">Screenshot ${idx + 1}</div><div class="text-xs text-slate-400 mt-1">Click to view larger</div>`;
    wrap.appendChild(cap);
    wrap.addEventListener('click', () => openModal(src, idx));
    return wrap;
}
GRID_IMAGES.forEach((s, i) => grid.appendChild(makeCard(s, i)));

// --- Modal logic ---
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const openInNew = document.getElementById('openInNew');
function openModal(src, idx) {
    modalImg.src = src;
    modalCaption.textContent = `Screenshot ${idx + 1}`;
    openInNew.href = src;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
    modalImg.src = '';
}
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('modalBackdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// --- Carousel logic (simple, robust) ---
const carouselImg = document.getElementById('carouselImage');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const dots = document.getElementById('carouselDots');

let idx = 0;
let autoplay = true;
let timer = null;

function renderCarousel(i) {
    idx = (i + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length;
    // gentle fade: swap opacity
    carouselImg.style.opacity = '0';
    setTimeout(() => {
        carouselImg.src = CAROUSEL_IMAGES[idx];
        carouselImg.alt = `carousel-${idx + 1}`;
        carouselImg.style.opacity = '1';
    }, 180);
    // dots
    dots.innerHTML = '';
    CAROUSEL_IMAGES.forEach((_, j) => {
        const d = document.createElement('button');
        d.className = 'w-2 h-2 rounded-full ' + (j === idx ? 'bg-indigo-400' : 'bg-white/30');
        d.setAttribute('aria-label', `Show ${j + 1}`);
        d.addEventListener('click', () => { renderCarousel(j); resetTimer(); });
        dots.appendChild(d);
    });
}

function prev() { renderCarousel(idx - 1); resetTimer(); }
function next() { renderCarousel(idx + 1); resetTimer(); }

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

function resetTimer() {
    if (timer) clearInterval(timer);
    if (autoplay) timer = setInterval(() => renderCarousel(idx + 1), 3200);
}

// start carousel
if (CAROUSEL_IMAGES.length > 0) {
    carouselImg.style.transition = 'opacity 240ms ease';
    renderCarousel(0);
    resetTimer();
} else {
    carouselImg.alt = 'No images';
}

// keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { prev(); }
    if (e.key === 'ArrowRight') { next(); }
});

// download zip button
const downloadBtn = document.getElementById('downloadZip');
downloadBtn.addEventListener('click', () => {
    const zipUrl = 'https://github.com/TANISHX1/Server/archive/refs/heads/main.zip';
    window.open(zipUrl, '_blank', 'noopener');
});

// ensure carousel pauses while modal open
const observeModal = new MutationObserver(() => {
    const shown = !modal.classList.contains('hidden');
    if (shown) { if (timer) clearInterval(timer); } else { resetTimer(); }
});
observeModal.observe(modal, { attributes: true, attributeFilter: ['class'] });


// MODAL OPEN IMAGE (use delegation so clones still open modal)
document.addEventListener('click', (ev) => {
    const img = ev.target.closest && ev.target.closest('img')
    if (!img) return
    // Open modal for any image in the document (delegated so clones work)
    if (modal && modalImg) {
        modal.classList.remove("hidden")
        modalImg.src = img.src
    }
})
if (modal) modal.onclick = () => modal.classList.add("hidden")


// FADE OBSERVER
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        // Keep images inside the autoplay carousel visible (don't treat them as page-faded)
        if (e.target.closest && e.target.closest('.autoMove')) {
            e.target.classList.add("visible")
            return
        }
        if (e.isIntersecting) { e.target.classList.add("visible") }
        else { e.target.classList.remove("visible") }
    })
}, { threshold: .4 })

document.querySelectorAll(".fadeImg").forEach(i => obs.observe(i))

// ensure any fadeImg inside an .autoMove is visible immediately (no flicker)
document.querySelectorAll(".autoMove .fadeImg").forEach(img => img.classList.add("visible"))


// AUTO SCROLL CAROUSEL (robust, smooth transform loop, 4-5 items)
window.addEventListener('load', () => {
    const autoBox = document.querySelector(".autoMove")
    if (!autoBox) return

    // Respect reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
        autoBox.style.overflowX = 'auto'
        autoBox.style.scrollBehavior = 'auto'
        return
    }

    // Prevent double initialization
    if (autoBox.dataset.looped === '1') return
    autoBox.dataset.looped = '1'

    const maxItems = 5               // take only first 4-5 items
    const speedPxPerSec = 30         // adjust: lower = slower/smoother

    const originalChildren = Array.from(autoBox.children)
    if (originalChildren.length === 0) return

    const useCount = Math.max(1, Math.min(maxItems, originalChildren.length))
    const selected = originalChildren.slice(0, useCount)

    // Build track and append two copies for seamless loop
    const track = document.createElement('div')
    track.className = 'autoMove-track'
    track.style.display = 'flex'
    track.style.alignItems = 'center'
    track.style.gap = '0.5rem' // set a known gap in case CSS uses rem/etc
    track.style.willChange = 'transform'
    track.style.transform = 'translateX(0)'
    track.style.transition = 'none'

    const appendCopy = (nodes) => {
        nodes.forEach(n => {
            const clone = n.cloneNode(true)
            // remove duplicate ids
            if (clone.querySelectorAll) {
                clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'))
            }
            if (clone.hasAttribute && clone.hasAttribute('id')) clone.removeAttribute('id')
            track.appendChild(clone)
        })
    }
    appendCopy(selected)
    appendCopy(selected)

    // Clear container and insert track
    autoBox.innerHTML = ''
    autoBox.appendChild(track)

    // Ensure items don't shrink
    Array.from(track.children).forEach(c => { c.style.flex = '0 0 auto' })

    // Helper: wait for images inside track to be ready
    const waitImagesReady = (root) => {
        const imgs = Array.from(root.querySelectorAll('img'))
        if (imgs.length === 0) return Promise.resolve()
        return Promise.all(imgs.map(img => {
            if (img.complete) return img.decode ? img.decode().catch(() => { }) : Promise.resolve()
            return new Promise(resolve => {
                img.addEventListener('load', resolve, { once: true })
                img.addEventListener('error', resolve, { once: true })
            })
        }))
    }

    // compute pixel gap using positions of first two children (reliable)
    const computeGapPx = () => {
        const ch = track.children
        if (ch.length >= 2) {
            const a = ch[0].getBoundingClientRect()
            const b = ch[1].getBoundingClientRect()
            // gap = distance between left of second and right of first (may be 0)
            return Math.max(0, b.left - a.right)
        }
        // fallback parse computed gap (already set to px string above), parseFloat should be px
        const gapVal = getComputedStyle(track).gap || '0px'
        return parseFloat(gapVal) || 0
    }

    let rafId = null
    let last = performance.now()
    let offset = 0
    let originalWidth = 0

    const recompute = () => {
        const gap = computeGapPx()
        let w = 0
        for (let i = 0; i < useCount; i++) {
            const el = track.children[i]
            if (!el) continue
            const rect = el.getBoundingClientRect()
            w += rect.width
            if (i < useCount - 1) w += gap
        }
        if (!w) w = track.scrollWidth / 2 || 0
        originalWidth = w
        // clamp offset
        if (originalWidth) offset = offset % originalWidth
    }

    waitImagesReady(track).then(() => {
        recompute()
        if (!originalWidth || originalWidth <= 0) return

        const maxDt = 0.05 // seconds
        function frame(now) {
            const dt = Math.min((now - last) / 1000, maxDt)
            last = now
            offset += speedPxPerSec * dt
            if (offset >= originalWidth) offset -= originalWidth
            // apply transform - use translate3d for GPU
            track.style.transform = `translate3d(${-offset}px,0,0)`
            rafId = requestAnimationFrame(frame)
        }
        last = performance.now()
        rafId = requestAnimationFrame(frame)

        // Pause/resume on hover & focus
        const pause = () => { if (rafId) { cancelAnimationFrame(rafId); rafId = null } }
        const resume = () => { if (!rafId) { last = performance.now(); rafId = requestAnimationFrame(frame) } }

        autoBox.addEventListener('pointerenter', pause)
        autoBox.addEventListener('pointerleave', resume)
        autoBox.addEventListener('focusin', pause)
        autoBox.addEventListener('focusout', resume)

        // Recompute on resize / layout changes
        const ro = new ResizeObserver(recompute)
        ro.observe(track)
        window.addEventListener('resize', recompute)

        const cleanup = () => {
            if (rafId) { cancelAnimationFrame(rafId); rafId = null }
            try { ro.disconnect() } catch (e) { }
            autoBox.removeEventListener('pointerenter', pause)
            autoBox.removeEventListener('pointerleave', resume)
            autoBox.removeEventListener('focusin', pause)
            autoBox.removeEventListener('focusout', resume)
            window.removeEventListener('resize', recompute)
        }
        window.addEventListener('beforeunload', cleanup)
        window.addEventListener('pagehide', cleanup)
    }).catch(() => {
        // fallback: try running with current measurements
        recompute()
        if (!originalWidth || originalWidth <= 0) return
        last = performance.now()
        const maxDt = 0.05
        function loop(now) {
            const dt = Math.min((now - last) / 1000, maxDt)
            last = now
            offset += speedPxPerSec * dt
            if (offset >= originalWidth) offset -= originalWidth
            track.style.transform = `translate3d(${-offset}px,0,0)`
            rafId = requestAnimationFrame(loop)
        }
        rafId = requestAnimationFrame(loop)
    })
})
