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

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const skipHeavyFx = reducedMotion

    /* ══ THREE.JS BG ══ */
    const canvas = document.getElementById('three-canvas') as HTMLCanvasElement
    let threeRenderer: THREE.WebGLRenderer | null = null
    if (canvas && !skipHeavyFx) {
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
      const stMat = new THREE.PointsMaterial({ color: 0xf0f0eb, size: 0.13, transparent: true, opacity: 0.65, sizeAttenuation: true, depthWrite: false })
      scene.add(new THREE.Points(stGeo, stMat))

      /* ── Node graph ── */
      interface GNode { x: number; y: number; z: number; vx: number; vy: number; vz: number }
      interface GPulse { from: number; to: number; t: number; speed: number; active: boolean }
      const NODE_COUNT = 40, DIST = 7.2, BX = 15, BY = 9, BZ = 6, MAX_EDGES = 160, MAX_PULSES = 6

      const gnodes: GNode[] = []
      for (let i = 0; i < NODE_COUNT; i++) gnodes.push({ x: (Math.random()-.5)*BX*2, y: (Math.random()-.5)*BY*2, z: (Math.random()-.5)*BZ*2, vx: (Math.random()-.5)*0.007, vy: (Math.random()-.5)*0.007, vz: (Math.random()-.5)*0.003 })

      const gnodePos = new Float32Array(NODE_COUNT * 3)
      const gnodeGeo = new THREE.BufferGeometry()
      gnodeGeo.setAttribute('position', new THREE.BufferAttribute(gnodePos, 3))
      const gnodeMat = new THREE.PointsMaterial({ color: 0x7DD3FC, size: 0.22, transparent: true, opacity: 0.9, sizeAttenuation: true, depthWrite: false })
      scene.add(new THREE.Points(gnodeGeo, gnodeMat))

      const edgePos = new Float32Array(MAX_EDGES * 6)
      const edgeGeo = new THREE.BufferGeometry()
      edgeGeo.setAttribute('position', new THREE.BufferAttribute(edgePos, 3))
      edgeGeo.setDrawRange(0, 0)
      const edgeMat = new THREE.LineBasicMaterial({ color: 0x7DD3FC, transparent: true, opacity: 0.14 })
      scene.add(new THREE.LineSegments(edgeGeo, edgeMat))

      const pulsePos = new Float32Array(MAX_PULSES * 3)
      const pulseGeo = new THREE.BufferGeometry()
      pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePos, 3))
      const pulseMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.38, transparent: true, opacity: 0.92, sizeAttenuation: true, depthWrite: false })
      scene.add(new THREE.Points(pulseGeo, pulseMat))

      const gpulses: GPulse[] = Array.from({ length: MAX_PULSES }, () => ({ from: 0, to: 0, t: 0, speed: 0, active: false }))
      const activeEdges: [number, number][] = []
      let pulseTimer = 0

      let mx = 0, my = 0
      addListener(document, 'mousemove', (e: Event) => { const ev = e as MouseEvent; mx = (ev.clientX / W - 0.5) * 2; my = (ev.clientY / H - 0.5) * 2 })

      const t0 = performance.now()
      function tick() {
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
        for (const n of gnodes) {
          n.x += n.vx; n.y += n.vy; n.z += n.vz
          if (Math.abs(n.x) > BX) n.vx *= -1
          if (Math.abs(n.y) > BY) n.vy *= -1
          if (Math.abs(n.z) > BZ) n.vz *= -1
        }
        for (let i = 0; i < NODE_COUNT; i++) { gnodePos[i*3]=gnodes[i].x; gnodePos[i*3+1]=gnodes[i].y; gnodePos[i*3+2]=gnodes[i].z }
        gnodeGeo.attributes.position.needsUpdate = true
        activeEdges.length = 0; let ei = 0
        for (let i = 0; i < NODE_COUNT && ei < MAX_EDGES; i++) {
          for (let j = i+1; j < NODE_COUNT && ei < MAX_EDGES; j++) {
            const dx=gnodes[i].x-gnodes[j].x, dy=gnodes[i].y-gnodes[j].y, dz=gnodes[i].z-gnodes[j].z
            if (dx*dx+dy*dy+dz*dz < DIST*DIST) {
              edgePos[ei*6]=gnodes[i].x; edgePos[ei*6+1]=gnodes[i].y; edgePos[ei*6+2]=gnodes[i].z
              edgePos[ei*6+3]=gnodes[j].x; edgePos[ei*6+4]=gnodes[j].y; edgePos[ei*6+5]=gnodes[j].z
              activeEdges.push([i,j]); ei++
            }
          }
        }
        edgeGeo.attributes.position.needsUpdate = true; edgeGeo.setDrawRange(0, ei*2)
        pulseTimer++
        if (pulseTimer > 50 && activeEdges.length > 0) {
          const free = gpulses.findIndex(p => !p.active)
          if (free !== -1) {
            const e = activeEdges[Math.floor(Math.random()*activeEdges.length)]
            gpulses[free] = { from: e[0], to: e[1], t: 0, speed: 0.007+Math.random()*0.007, active: true }
            pulseTimer = 0
          }
        }
        for (let i = 0; i < MAX_PULSES; i++) {
          const p = gpulses[i]
          if (!p.active) { pulsePos[i*3+2] = -9999; continue }
          p.t += p.speed
          if (p.t >= 1) { p.active = false; pulsePos[i*3+2] = -9999; continue }
          const fn=gnodes[p.from], tn=gnodes[p.to]
          pulsePos[i*3]=fn.x+(tn.x-fn.x)*p.t; pulsePos[i*3+1]=fn.y+(tn.y-fn.y)*p.t; pulsePos[i*3+2]=fn.z+(tn.z-fn.z)*p.t
        }
        pulseGeo.attributes.position.needsUpdate = true
        renderer.render(scene, camera)
        requestAnimationFrame(tick)
      }
      tick()
    }

    /* ══ HERO PARTICLES ══ */
    const hc = document.getElementById('h-particles') as HTMLCanvasElement
    if (hc && !skipHeavyFx) {
      const ctx = hc.getContext('2d')!
      let W2: number, H2: number
      const pts: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = []
      const resizeHero = () => { W2 = hc.width = hc.offsetWidth; H2 = hc.height = hc.offsetHeight }
      resizeHero()
      addListener(window, 'resize', resizeHero)
      for (let i = 0; i < 60; i++) pts.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: Math.random() * 1.2 + 0.2, o: Math.random() * 0.22 + 0.04 })
      function drawHero() {
        ctx.clearRect(0, 0, W2, H2)
        for (const p of pts) {
          p.x += p.vx; p.y += p.vy
          if (p.x < 0) p.x = W2; if (p.x > W2) p.x = 0; if (p.y < 0) p.y = H2; if (p.y > H2) p.y = 0
          ctx.globalAlpha = p.o; ctx.fillStyle = 'rgba(240,240,235,1)'
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
        }
        ctx.globalAlpha = 1; requestAnimationFrame(drawHero)
      }
      drawHero()
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
