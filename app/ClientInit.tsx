'use client'

import { useEffect } from 'react'
import * as THREE from 'three'

export default function ClientInit() {
  useEffect(() => {
    const listeners: Array<{ el: EventTarget; type: string; fn: EventListenerOrEventListenerObject; opts?: AddEventListenerOptions }> = []
    function addListener(el: EventTarget, type: string, fn: EventListenerOrEventListenerObject, opts?: AddEventListenerOptions) {
      el.addEventListener(type, fn, opts)
      listeners.push({ el, type, fn, opts })
    }

    /* ══ THREE.JS BG ══ */
    const canvas = document.getElementById('three-canvas') as HTMLCanvasElement
    let threeRenderer: THREE.WebGLRenderer | null = null
    if (canvas) {
      let W = innerWidth, H = innerHeight
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      threeRenderer = renderer
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      renderer.setSize(W, H)
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 500)
      camera.position.set(0, 0, 20)
      addListener(window, 'resize', () => { W = innerWidth; H = innerHeight; renderer.setSize(W, H); camera.aspect = W / H; camera.updateProjectionMatrix() })
      const starCount = 550
      const stPos = new Float32Array(starCount * 3)
      const stBase: { x: number; y: number; z: number; sp: number }[] = []
      for (let i = 0; i < starCount; i++) {
        const r = 14 + Math.random() * 50, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1)
        const sx = r * Math.sin(ph) * Math.cos(th), sy = r * Math.sin(ph) * Math.sin(th), sz = r * Math.cos(ph) - 22
        stPos[i * 3] = sx; stPos[i * 3 + 1] = sy; stPos[i * 3 + 2] = sz
        stBase.push({ x: sx, y: sy, z: sz, sp: 0.3 + Math.random() })
      }
      const stGeo = new THREE.BufferGeometry()
      stGeo.setAttribute('position', new THREE.BufferAttribute(stPos, 3))
      const stMat = new THREE.PointsMaterial({ color: 0xf0f0eb, size: 0.1, transparent: true, opacity: 0.55, sizeAttenuation: true, depthWrite: false })
      scene.add(new THREE.Points(stGeo, stMat))
      const ringGroup = new THREE.Group(); scene.add(ringGroup)
      function mkRing(r: number, seg: number, col: number, op: number, tx: number, tz: number) {
        const pts: THREE.Vector3[] = []
        for (let j = 0; j <= seg; j++) { const a = (j / seg) * Math.PI * 2; pts.push(new THREE.Vector3(r * Math.cos(a), 0, r * Math.sin(a))) }
        const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: op }))
        l.rotation.x = tx; l.rotation.z = tz; return l
      }
      const r1 = mkRing(6, 100, 0x7DD3FC, 0.28, 0.5, 0.2)
      const r2 = mkRing(9, 100, 0xf0f0eb, 0.1, -0.3, 0.4)
      const r3 = mkRing(13, 120, 0xF9A8D4, 0.08, 0.25, -0.3)
      ringGroup.add(r1, r2, r3)
      let mx = 0, my = 0
      addListener(document, 'mousemove', (e: Event) => { const ev = e as MouseEvent; mx = (ev.clientX / W - 0.5) * 2; my = (ev.clientY / H - 0.5) * 2 })
      const t0 = performance.now()
      ;(function tick() {
        const t = (performance.now() - t0) / 1000
        camera.position.x += (mx * 0.8 - camera.position.x) * 0.025
        camera.position.y += (-my * 0.5 - camera.position.y) * 0.025
        camera.lookAt(0, 0, 0)
        const pa = stGeo.attributes.position.array as Float32Array
        for (let i = 0; i < starCount; i++) {
          const b = stBase[i]
          pa[i * 3] = b.x + Math.sin(t * 0.3 * b.sp + i) * 0.15
          pa[i * 3 + 1] = b.y + Math.cos(t * 0.25 * b.sp + i * 0.4) * 0.15
        }
        stGeo.attributes.position.needsUpdate = true
        r1.rotation.z += 0.0014; r2.rotation.z -= 0.001; r3.rotation.z += 0.0007
        ringGroup.rotation.y = Math.sin(t * 0.08) * 0.12
        renderer.render(scene, camera)
        requestAnimationFrame(tick)
      })()
    }

    /* ══ SITE INIT ══ */
    function initSite() {
      const nav = document.getElementById('main-nav')!
      setTimeout(() => nav.classList.add('nav-revealed'), 800)
      document.body.style.overflow = ''

      const onScroll = () => {
        nav.classList.toggle('scrolled', scrollY > 40)
        const total = document.documentElement.scrollHeight - innerHeight
        const sp = document.getElementById('sp')
        if (total > 0 && sp) sp.style.width = (scrollY / total * 100) + '%'
      }
      addListener(window, 'scroll', onScroll, { passive: true })
      onScroll()

      /* Cursor */
      const cur = document.getElementById('cur')!, ring = document.getElementById('cur-ring')!
      let cx = innerWidth / 2, cy = innerHeight / 2, rx = cx, ry = cy
      addListener(document, 'mousemove', (e: Event) => { const ev = e as MouseEvent; cx = ev.clientX; cy = ev.clientY })
      addListener(document, 'mouseleave', () => { cur.classList.add('gone'); ring.classList.add('gone') })
      addListener(document, 'mouseenter', () => { cur.classList.remove('gone'); ring.classList.remove('gone') })
      function addHover(sel: string) {
        document.querySelectorAll(sel).forEach(el => {
          el.addEventListener('mouseenter', () => { cur.classList.add('big'); ring.classList.add('big') })
          el.addEventListener('mouseleave', () => { cur.classList.remove('big'); ring.classList.remove('big') })
        })
      }
      addHover('a,button,.co-card,.emp-card')
      ;(function ac() { cur.style.left = cx + 'px'; cur.style.top = cy + 'px'; rx += (cx - rx) * 0.11; ry += (cy - ry) * 0.11; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(ac) })()

      /* SPA navigation */
      const PAGES: Record<string, string> = { home: 'page-home', empresas: 'page-empresas', contacto: 'page-contacto' }
      const PAGE_LABELS: Record<string, string> = { home: 'Inicio', empresas: 'Divisiones', contacto: 'Contacto' }
      let curPage = 'home', ptLocked = false

      function doSwitch(target: string) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'))
        const el = document.getElementById(PAGES[target])
        if (el) el.classList.add('active')
        document.body.style.overflow = ''
        window.scrollTo(0, 0)
        curPage = target
        const sp = document.getElementById('sp'); if (sp) sp.style.width = '0%'
        const io2 = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io2.unobserve(e.target) } }), { threshold: 0.05 })
        if (el) el.querySelectorAll('.rw:not(.in)').forEach(r => io2.observe(r))
        setTimeout(() => {
          if (el) el.querySelectorAll<HTMLElement>('.rw:not(.in)').forEach(r => { if (r.getBoundingClientRect().top < innerHeight * 1.1) r.classList.add('in') })
        }, 100)
        document.dispatchEvent(new CustomEvent('lx-navigate', { detail: target }))
        setTimeout(() => window.dispatchEvent(new Event('scroll')), 60)
      }

      const PT_IN = 380, PT_HOLD = 1800, PT_OUT = 440
      const ptEl = document.getElementById('pt')!
      const ptFromName = document.getElementById('pt-from-name')
      const ptDestName = document.getElementById('pt-dest-name')
      const ptStatus = document.getElementById('pt-status')
      const ptFill = document.getElementById('pt-fill')
      ptEl.style.visibility = 'hidden'

      function navigateTo(target: string) {
        if (!PAGES[target] || ptLocked) return
        if (target === curPage) { window.scrollTo(0, 0); return }
        ptLocked = true
        if (ptFromName) ptFromName.textContent = (PAGE_LABELS[curPage] || curPage).toUpperCase()
        if (ptDestName) ptDestName.textContent = (PAGE_LABELS[target] || target).toUpperCase()
        if (ptStatus) ptStatus.textContent = 'Cargando · ' + (PAGE_LABELS[target] || target)
        ptEl.style.setProperty('--pt-dur', (PT_HOLD / 1000 + 0.15) + 's')
        if (ptFill) { ptFill.style.animation = 'none'; void ptFill.offsetWidth; ptFill.style.animation = '' }
        ptEl.style.visibility = 'visible'
        ptEl.classList.remove('pt-show', 'pt-close')
        ptEl.classList.add('pt-open')
        setTimeout(() => {
          ptEl.classList.remove('pt-open'); ptEl.classList.add('pt-show')
          setTimeout(() => doSwitch(target), PT_HOLD * 0.55)
          setTimeout(() => {
            ptEl.classList.remove('pt-show'); ptEl.classList.add('pt-close')
            setTimeout(() => { ptEl.classList.remove('pt-close'); ptEl.style.visibility = 'hidden'; ptLocked = false }, PT_OUT)
          }, PT_HOLD)
        }, PT_IN)
      }

      addListener(document, 'click', (e: Event) => {
        const ev = e as MouseEvent
        const el = (ev.target as Element).closest('[data-nav]') as HTMLElement | null
        if (!el) return
        const target = el.dataset.nav!
        if (PAGES[target]) { ev.preventDefault(); closeNav(); navigateTo(target) }
      })

      /* Nav overlay */
      const overlay = document.getElementById('nav-overlay')!
      const menuBtn = document.getElementById('nav-menu-btn')!
      const closeBtn = document.getElementById('nvo-close')!
      let overlayOpen = false
      let overlayTrap: ((e: Event) => void) | null = null
      let prevNavFocus: Element | null = null

      function trapFocus(container: Element) {
        const sel = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])'
        return (e: Event) => {
          const ev = e as KeyboardEvent
          if (ev.key !== 'Tab') return
          const els = Array.from(container.querySelectorAll<HTMLElement>(sel)).filter(el => el.offsetParent !== null)
          if (!els.length) return
          const first = els[0], last = els[els.length - 1]
          if (ev.shiftKey) { if (document.activeElement === first) { ev.preventDefault(); last.focus() } }
          else { if (document.activeElement === last) { ev.preventDefault(); first.focus() } }
        }
      }

      function openNav() {
        overlayOpen = true; prevNavFocus = document.activeElement
        overlay.classList.add('open'); overlay.setAttribute('aria-hidden', 'false')
        menuBtn.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'
        setTimeout(() => closeBtn.focus(), 400)
        if (overlayTrap) document.removeEventListener('keydown', overlayTrap)
        overlayTrap = trapFocus(overlay); document.addEventListener('keydown', overlayTrap)
      }
      function closeNav() {
        overlayOpen = false; overlay.classList.remove('open'); overlay.setAttribute('aria-hidden', 'true')
        menuBtn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''
        if (overlayTrap) { document.removeEventListener('keydown', overlayTrap); overlayTrap = null }
        if (prevNavFocus) { (prevNavFocus as HTMLElement).focus(); prevNavFocus = null }
      }
      menuBtn.addEventListener('click', openNav)
      closeBtn.addEventListener('click', closeNav)
      addListener(document, 'keydown', (e: Event) => { if ((e as KeyboardEvent).key === 'Escape' && overlayOpen) closeNav() })
      overlay.querySelectorAll('[data-nav], a[href]').forEach(a => a.addEventListener('click', () => setTimeout(closeNav, 80)))

      /* Nav overlay canvas */
      const nvoCanvas = document.getElementById('nvo-canvas') as HTMLCanvasElement
      if (nvoCanvas) {
        const nctx = nvoCanvas.getContext('2d')!
        let nW = 0, nH = 0
        const nPts: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = []
        const rsz = () => { nW = nvoCanvas.width = innerWidth; nH = nvoCanvas.height = innerHeight }
        rsz(); addListener(window, 'resize', rsz)
        for (let i = 0; i < 120; i++) nPts.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18, r: Math.random() * 0.9 + 0.1, o: Math.random() * 0.14 + 0.03 })
        ;(function ndraw() { nctx.clearRect(0, 0, nW, nH); for (const p of nPts) { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = nW; if (p.x > nW) p.x = 0; if (p.y < 0) p.y = nH; if (p.y > nH) p.y = 0; nctx.globalAlpha = p.o; nctx.fillStyle = 'rgba(125,211,252,1)'; nctx.beginPath(); nctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); nctx.fill() } nctx.globalAlpha = 1; requestAnimationFrame(ndraw) })()
      }

      /* Scroll reveal */
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.08 })
      document.querySelectorAll('#page-home .rw').forEach(el => io.observe(el))

      /* Stats counter */
      const ioStats = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return
          const item = e.target as HTMLElement
          item.classList.add('counted')
          const el = item.querySelector<HTMLElement>('[data-count]')
          if (el) {
            const target = parseInt(el.dataset.count!, 10), dur = 1400, t0 = performance.now()
            ;(function tick(now: number) {
              const p = Math.min((now - t0) / dur, 1), ease = 1 - Math.pow(1 - p, 3)
              el.textContent = Math.round(target * ease) + (el.dataset.suffix || '')
              if (p < 1) requestAnimationFrame(tick)
            })(performance.now())
          }
          ioStats.unobserve(item)
        })
      }, { threshold: 0.3 })
      document.querySelectorAll('.stat-item').forEach(el => ioStats.observe(el))

      /* Magnetic buttons */
      document.querySelectorAll<HTMLElement>('.btn-p,.nav-cta-btn').forEach(btn => {
        btn.addEventListener('mousemove', e => { const ev = e as MouseEvent; const r = btn.getBoundingClientRect(); btn.style.transform = `translate(${(ev.clientX - r.left - r.width / 2) * 0.1}px,${(ev.clientY - r.top - r.height / 2) * 0.1}px)` })
        btn.addEventListener('mouseleave', () => { btn.style.transform = '' })
      })
    }

    /* ══ CINEMATIC INTRO ══ */
    const ci = document.getElementById('ci')
    if (!ci) { initSite(); return }

    const isDirect = new URLSearchParams(location.search).get('direct') === '1' || sessionStorage.getItem('lxsol_seen') === '1'
    if (isDirect) { ci.style.display = 'none'; document.body.style.overflow = ''; initSite(); return }

    const ciCanvas = document.getElementById('ci-canvas') as HTMLCanvasElement
    if (ciCanvas) {
      const cx2 = ciCanvas.getContext('2d')!
      let cW2 = innerWidth, cH2 = innerHeight
      ciCanvas.width = cW2; ciCanvas.height = cH2
      const cPts2: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = []
      for (let i = 0; i < 90; i++) cPts2.push({ x: Math.random() * cW2, y: Math.random() * cH2, vx: (Math.random() - 0.5) * 0.24, vy: (Math.random() - 0.5) * 0.24, r: Math.random() * 1.4 + 0.2, o: Math.random() * 0.18 + 0.05 })
      ;(function ciDraw() {
        if (!ci.classList.contains('vis')) { requestAnimationFrame(ciDraw); return }
        cx2.clearRect(0, 0, cW2, cH2)
        for (const p of cPts2) { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = cW2; if (p.x > cW2) p.x = 0; if (p.y < 0) p.y = cH2; if (p.y > cH2) p.y = 0; cx2.globalAlpha = p.o; cx2.fillStyle = 'rgba(240,240,235,1)'; cx2.beginPath(); cx2.arc(p.x, p.y, p.r, 0, Math.PI * 2); cx2.fill() }
        cx2.globalAlpha = 1; requestAnimationFrame(ciDraw)
      })()
    }

    const umb = document.getElementById('ci-umb')
    const brands = document.getElementById('ci-brands')
    const ciGroup = document.getElementById('ci-group')
    const now = document.getElementById('ci-now')
    const b1 = document.getElementById('ci-b1')
    const b2 = document.getElementById('ci-b2')
    const b3 = document.getElementById('ci-b3')

    ci.classList.add('vis')
    setTimeout(() => umb?.classList.add('on'), 300)
    setTimeout(() => { brands?.classList.add('on'); ciGroup?.classList.add('sep-on') }, 1300)
    setTimeout(() => { b1?.classList.remove('active'); b2?.classList.add('active') }, 2600)
    setTimeout(() => { b2?.classList.remove('active'); b3?.classList.add('active') }, 3700)
    setTimeout(() => { b3?.classList.remove('active'); b1?.classList.add('active'); umb?.classList.add('sm') }, 4600)
    setTimeout(() => now?.classList.add('on'), 5400)
    setTimeout(() => {
      sessionStorage.setItem('lxsol_seen', '1')
      ci.classList.remove('vis'); ci.classList.add('out')
      setTimeout(() => { ci.style.display = 'none'; document.body.style.overflow = ''; initSite() }, 1400)
    }, 7400)

    return () => {
      listeners.forEach(({ el, type, fn, opts }) => el.removeEventListener(type, fn, opts))
      if (threeRenderer) threeRenderer.dispose()
    }
  }, [])

  return null
}
