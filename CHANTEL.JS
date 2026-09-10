import Spheres1Background from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.17/build/backgrounds/spheres1.cdn.min.js'

/* ---------- RESPONSIVE SPHERE SIZING ---------- */
const isMobile = window.innerWidth < 768
const isSmallPhone = window.innerWidth < 480

// Scale sphere size down on smaller screens so they don't overwhelm the text
const sizeScale = isSmallPhone ? 0.4 : isMobile ? 0.55 : 1

// Fewer spheres on mobile = less visual clutter
const count = isSmallPhone ? 140 : isMobile ? 180 : 300

/* ---------- INIT BACKGROUND ---------- */
const bg = Spheres1Background(document.getElementById('webgl-canvas'), {
  count: count,
  minSize: 0.3 * sizeScale,
  maxSize: 1 * sizeScale,
  gravity: isMobile ? 0.3 : 0.5
})

/* ---------- GRAVITY TOGGLE ---------- */
let gravityOn = true

document.getElementById('gravity-btn').addEventListener('click', () => {
  gravityOn = !gravityOn
  bg.spheres.config.gravity = gravityOn ? (isMobile ? 0.3 : 0.5) : 0
})

/* ---------- RANDOM COLORS ---------- */
document.getElementById('colors-btn').addEventListener('click', () => {
  bg.spheres.setColors([
    Math.floor(0xffffff * Math.random()),
    Math.floor(0xffffff * Math.random()),
    Math.floor(0xffffff * Math.random())
  ])
})

/* ---------- HANDLE ORIENTATION / RESIZE ---------- */
/* Only reload if the breakpoint category actually changed (mobile <-> desktop) */
let currentMode = isMobile ? 'mobile' : 'desktop'

window.addEventListener('resize', () => {
  const newMode = window.innerWidth < 768 ? 'mobile' : 'desktop'
  if (newMode !== currentMode) {
    currentMode = newMode
    location.reload()
  }
})