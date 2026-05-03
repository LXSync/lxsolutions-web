import ClientInit from './ClientInit'
import CalendlyWidget from './components/CalendlyWidget'

export default function Home() {
  return (
    <>
      <a href="#hero" className="skip-link">Saltar al contenido</a>

      {/* BG */}
      <canvas id="three-canvas" aria-hidden="true" />
      <div id="bg-grid" aria-hidden="true" />
      <div id="bg-vignette" aria-hidden="true" />
      <div id="bg-noise" aria-hidden="true" />

      {/* Scroll progress */}
      <div id="sp" aria-hidden="true" />

      {/* Cursor */}
      <div id="cur" aria-hidden="true" />
      <div id="cur-ring" aria-hidden="true" />

      {/* Page transition */}
      <div id="pt" aria-hidden="true">
        <div className="pt-corner tl">LXSOLUTIONS</div>
        <div className="pt-corner tr">BCN · 2026</div>
        <div className="pt-corner bl">GROUP</div>
        <div className="pt-corner br">ES</div>
        <div className="pt-inner">
          <div className="pt-line-top" />
          <div className="pt-brand">LXSOLUTIONS · GROUP</div>
          <div className="pt-from-label">SALIENDO DE</div>
          <div className="pt-from-name" id="pt-from-name">INICIO</div>
          <div className="pt-arrow-row">
            <div className="pt-arr-line" />
            <div className="pt-arr-icon">→</div>
            <div className="pt-arr-line" />
          </div>
          <div className="pt-to-label">ENTRANDO EN</div>
          <div className="pt-dest-name" id="pt-dest-name">DIVISIONES</div>
          <div className="pt-line-bot" />
          <div className="pt-status" id="pt-status">Cargando</div>
          <div className="pt-progress"><div className="pt-progress-fill" id="pt-fill" /></div>
        </div>
      </div>

      {/* Cinematic intro */}
      <div id="ci" aria-hidden="true">
        <canvas id="ci-canvas" />
        <div className="ci-corner tl">LXSOLUTIONS</div>
        <div className="ci-corner tr">BARCELONA · 2026</div>
        <div className="ci-corner bl">GROUP · DIVISIÓN 01/03</div>
        <div className="ci-corner br">ES</div>
        <div id="ci-stage">
          <div className="ci-group" id="ci-group">
            <div className="ci-umb" id="ci-umb">LXSOLUTIONS</div>
            <div className="ci-sep" />
            <div className="ci-brands" id="ci-brands">
              <span className="ci-b active" id="ci-b1">LXSYNC</span>
              <span className="ci-dot">·</span>
              <span className="ci-b red" id="ci-b2">LXMEDIA</span>
              <span className="ci-dot">·</span>
              <span className="ci-b pink" id="ci-b3">LXVIRAL</span>
            </div>
          </div>
          <div className="ci-now" id="ci-now">
            <div className="ci-now-pre">Entrando en</div>
            <div className="ci-now-line" />
            <div className="ci-now-brand">LXSOLUTIONS</div>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav id="main-nav" aria-label="Navegación principal">
        <div className="nav-brand">
          <div className="nav-umbrella"><b>LXSOLUTIONS</b> · GRUPO</div>
          <div className="nav-divide" />
          <div className="nav-logo-wrap">
            <div className="nav-logo-inner">
              <a data-nav="home" className="nav-logo" style={{ cursor: 'none' }}>
                <span className="dot" aria-hidden="true" />LXSOLUTIONS
              </a>
            </div>
          </div>
        </div>
        <div className="nav-right">
          <a data-nav="contacto" className="nav-cta-btn" style={{ cursor: 'none' }}>
            Agendar llamada <span className="nav-cta-arr">→</span>
          </a>
          <button id="nav-menu-btn" className="nav-menu-btn" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-overlay">
            <div className="nmb-bars"><span /><span /></div>
            <span className="nmb-label">Menú</span>
          </button>
        </div>
      </nav>

      {/* NAV OVERLAY */}
      <div id="nav-overlay" role="dialog" aria-label="Menú de navegación" aria-hidden="true">
        <canvas id="nvo-canvas" aria-hidden="true" />
        <div className="nvo-scanlines" aria-hidden="true" />
        <div className="nvo-corner nvo-tl">LXSOLUTIONS · GRUPO</div>
        <div className="nvo-corner nvo-br">BCN · 2026</div>
        <button id="nvo-close" aria-label="Cerrar menú">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="nvc-label">Cerrar</span>
        </button>
        <div className="nvo-inner">
          <div className="nvo-brand">
            <span className="nvo-dot" aria-hidden="true" />LXSOLUTIONS GROUP
          </div>
          <nav className="nvo-links" aria-label="Navegación overlay">
            <a data-nav="home" className="nvo-link" role="button">
              <span className="nvo-num">01</span><span className="nvo-text">Inicio</span><span className="nvo-arr">→</span>
            </a>
            <a data-nav="empresas" className="nvo-link" role="button">
              <span className="nvo-num">02</span><span className="nvo-text">Divisiones</span><span className="nvo-arr">→</span>
            </a>
            <a data-nav="contacto" className="nvo-link" role="button">
              <span className="nvo-num">03</span><span className="nvo-text">Contacto</span><span className="nvo-arr">→</span>
            </a>
          </nav>
          <div className="nvo-foot">
            <a data-nav="contacto" className="nvo-cta" style={{ cursor: 'none' }}>
              Agendar llamada →
            </a>
            <span className="nvo-contact">info@lxsync.com · Barcelona</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════ */}
      {/* PAGE: HOME                              */}
      {/* ═══════════════════════════════════════ */}
      <div id="page-home" className="page active">
        <section id="hero">
          <div className="h-eyebrow">
            <span className="ey-dot" aria-hidden="true" />
            LXSOLUTIONS · GRUPO EMPRESARIAL · BARCELONA
          </div>
          <h1 className="h-title">LXSOLUTIONS</h1>
          <p className="h-sub">
            Tres divisiones construidas para transformar cómo las empresas trabajan, comunican y crecen.
            Automatización, contenido y redes — un solo grupo.
          </p>
          <div className="h-btns">
            <a data-nav="empresas" className="btn btn-p" style={{ cursor: 'none' }}>
              Ver divisiones
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
                <path d="M1 6h12M9 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a data-nav="contacto" className="btn btn-ghost" style={{ cursor: 'none' }}>
              Agendar llamada
            </a>
          </div>
          <div className="h-brands" aria-hidden="true">
            <span className="h-brand-item sync">LXSYNC</span>
            <span className="h-brand-sep">·</span>
            <span className="h-brand-item media">LXMEDIA</span>
            <span className="h-brand-sep">·</span>
            <span className="h-brand-item viral">LXVIRAL</span>
          </div>
        </section>

        {/* Company cards */}
        <section className="section">
          <div className="container">
            <div className="sec-label">01 / Divisiones</div>
            <div className="sec-title rw">Tres marcas.<br />Un sistema.</div>
            <div className="co-grid">

              <div className="co-card co-sync rw d1">
                <div className="co-num">01 · Automatización e IA</div>
                <div className="co-name">LXSYNC</div>
                <div className="co-tag">Operativa · B2B · Diagnóstico</div>
                <p className="co-desc">
                  Diseñamos e implementamos flujos de automatización con IA a medida para empresas que ya no quieren
                  depender de procesos manuales. Diagnóstico primero, implementación después.
                </p>
                <a href="https://lxsync-web.vercel.app" target="_blank" rel="noopener noreferrer" className="co-link">
                  Visitar LXSYNC
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M1 11L11 1M11 1H4M11 1v7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              <div className="co-card co-media rw d2">
                <div className="co-num">02 · Contenido & YouTube</div>
                <div className="co-name">LXMEDIA</div>
                <div className="co-tag">YouTube · Producción · Monetización</div>
                <p className="co-desc">
                  Creamos contenido de video profesional para YouTube enfocado en automatización e IA para empresas.
                  Generamos ingresos recurrentes para nuestros clientes a través de canales propios.
                </p>
                <a data-nav="empresas" className="co-link" style={{ cursor: 'none' }}>
                  Saber más
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              <div className="co-card co-viral rw d3">
                <div className="co-num">03 · Redes Sociales</div>
                <div className="co-name">LXVIRAL</div>
                <div className="co-tag">Instagram · TikTok · Viral</div>
                <p className="co-desc">
                  Estrategia y producción de contenido para Instagram y TikTok centrado en automatización e IA.
                  Crecimiento orgánico, comunidades activas y contenido que convierte.
                </p>
                <a data-nav="empresas" className="co-link" style={{ cursor: 'none' }}>
                  Saber más
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="stats-grid rw">
              <div className="stat-item">
                <span className="stat-n" data-count="3" data-suffix="">3</span>
                <div className="stat-l">Divisiones activas</div>
                <div className="stat-bar" />
              </div>
              <div className="stat-item">
                <span className="stat-n" data-count="100" data-suffix="%">100%</span>
                <div className="stat-l">Datos propietarios</div>
                <div className="stat-bar" />
              </div>
              <div className="stat-item">
                <span className="stat-n" data-count="2026" data-suffix="">2026</span>
                <div className="stat-l">Fundado · Barcelona</div>
                <div className="stat-bar" />
              </div>
              <div className="stat-item">
                <span className="stat-n" data-count="24" data-suffix="h">24h</span>
                <div className="stat-l">Tiempo de respuesta</div>
                <div className="stat-bar" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section" style={{ paddingTop: 0, paddingBottom: '120px' }}>
          <div className="container">
            <div className="rw" style={{ borderTop: '1px solid var(--line)', paddingTop: '72px', textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center', marginBottom: '20px' }}>¿Trabajamos juntos?</div>
              <h2 style={{ fontFamily: 'var(--f-disp)', fontSize: 'clamp(40px,6vw,80px)', lineHeight: '.9', letterSpacing: '.01em', marginBottom: '20px' }}>
                Hablemos de tu proyecto.
              </h2>
              <p style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(240,240,235,.45)', marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px' }}>
                30 minutos. Sin compromiso. Te contamos qué división encaja mejor con lo que necesitas.
              </p>
              <a data-nav="contacto" className="btn btn-p" style={{ cursor: 'none' }}>
                Agendar llamada →
              </a>
            </div>
          </div>
        </section>

        <footer>
          <div className="ft-top">
            <div className="ft-brand">
              <div className="ft-umb"><b>LXSOLUTIONS</b> · GRUPO</div>
              <div className="ft-logo"><span className="dot" />LXSOLUTIONS</div>
              <p className="ft-tag">Automatización e IA, contenido YouTube y redes sociales para empresas que ya no quieren depender de procesos manuales. Barcelona, 2026.</p>
            </div>
            <div className="ft-col">
              <h5>Divisiones</h5>
              <ul>
                <li><a href="https://lxsync-web.vercel.app" target="_blank" rel="noopener noreferrer">LXSYNC — Automatización</a></li>
                <li><a data-nav="empresas">LXMEDIA — YouTube</a></li>
                <li><a data-nav="empresas">LXVIRAL — Redes sociales</a></li>
              </ul>
            </div>
            <div className="ft-col">
              <h5>Contacto</h5>
              <ul>
                <li><a href="mailto:info@lxsync.com">info@lxsync.com</a></li>
                <li><a data-nav="contacto">Agendar llamada</a></li>
                <li><a href="/privacidad">Política de privacidad</a></li>
              </ul>
            </div>
          </div>
          <div className="ft-bot">
            <div className="ft-copy">© 2026 LXSOLUTIONS · Made in BCN</div>
            <div className="ft-socials">
              <a href="#">LinkedIn</a>
              <a href="#">Instagram</a>
              <a href="#">YouTube</a>
            </div>
          </div>
        </footer>
      </div>

      {/* ═══════════════════════════════════════ */}
      {/* PAGE: EMPRESAS                          */}
      {/* ═══════════════════════════════════════ */}
      <div id="page-empresas" className="page">
        <div className="page-hdr">
          <div className="ph-meta">02 / LXSOLUTIONS · Divisiones</div>
          <h1 className="ph-title">Tres<br /><em>divisiones.</em></h1>
          <p className="ph-sub">Cada marca opera de forma independiente con su propio modelo de negocio, pero comparten el mismo ADN: sistemas que trabajan por ti.</p>
        </div>

        {/* LXSync */}
        <div className="emp-section emp-sync">
          <div className="container">
            <div className="emp-card">
              <div className="emp-left">
                <div className="emp-num">01 · Automatización e IA</div>
                <div className="emp-name">LXSYNC</div>
                <div className="emp-tag-row">
                  <span className="emp-tag">Automatización</span>
                  <span className="emp-tag">Agentes IA</span>
                  <span className="emp-tag">B2B</span>
                  <span className="emp-tag">Diagnóstico</span>
                </div>
                <div className="emp-cta">
                  <a href="https://lxsync-web.vercel.app" target="_blank" rel="noopener noreferrer" className="btn btn-p">
                    Visitar LXSYNC →
                  </a>
                </div>
              </div>
              <div className="emp-right">
                <p className="emp-desc">
                  Diseñamos e implementamos automatizaciones con IA a medida para empresas B2B que quieren eliminar tareas
                  manuales, reducir errores y operar en piloto automático. Empezamos con un diagnóstico operativo — sin
                  vender nada antes de entender tu negocio.
                </p>
                <div className="emp-feats">
                  <div className="emp-feat">Diagnóstico operativo: mapeamos dónde pierdes tiempo y dinero antes de proponer nada</div>
                  <div className="emp-feat">Agentes IA que gestionan leads, soporte y operaciones 24/7 sin intervención humana</div>
                  <div className="emp-feat">Flujos con n8n, Make, GPT-4o y tu stack actual — sin migrar nada</div>
                  <div className="emp-feat">Implementación en 2–4 semanas. Precio fijo. Datos 100% tuyos</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LXMedia */}
        <div className="emp-section emp-media">
          <div className="container">
            <div className="emp-card">
              <div className="emp-left">
                <div className="emp-num">02 · Contenido & YouTube</div>
                <div className="emp-name">LXMEDIA</div>
                <div className="emp-tag-row">
                  <span className="emp-tag">YouTube</span>
                  <span className="emp-tag">Producción</span>
                  <span className="emp-tag">Monetización</span>
                  <span className="emp-tag">Automatización</span>
                </div>
                <div className="emp-cta">
                  <a data-nav="contacto" className="btn btn-p" style={{ cursor: 'none', background: 'var(--red)', color: '#fff' }}>
                    Hablar con LXMEDIA →
                  </a>
                </div>
              </div>
              <div className="emp-right">
                <p className="emp-desc">
                  Creamos canales de YouTube profesionales para empresas del sector de la automatización e IA. Producimos
                  los videos, gestionamos el canal y monetizamos la audiencia — generando una fuente de ingresos recurrente
                  para nuestros clientes mientras posicionan su marca como referente.
                </p>
                <div className="emp-feats">
                  <div className="emp-feat">Producción completa de video: guion, grabación, edición y publicación</div>
                  <div className="emp-feat">Contenido enfocado en automatización, IA y productividad empresarial</div>
                  <div className="emp-feat">Estrategia de crecimiento orgánico: SEO en YouTube, thumbnails y títulos optimizados</div>
                  <div className="emp-feat">Monetización del canal: AdSense, sponsorships y productos digitales</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LXViral */}
        <div className="emp-section emp-viral">
          <div className="container">
            <div className="emp-card">
              <div className="emp-left">
                <div className="emp-num">03 · Redes Sociales</div>
                <div className="emp-name">LXVIRAL</div>
                <div className="emp-tag-row">
                  <span className="emp-tag">Instagram</span>
                  <span className="emp-tag">TikTok</span>
                  <span className="emp-tag">Viral</span>
                  <span className="emp-tag">Comunidad</span>
                </div>
                <div className="emp-cta">
                  <a data-nav="contacto" className="btn btn-p" style={{ cursor: 'none', background: 'var(--pink)', color: '#070707' }}>
                    Hablar con LXVIRAL →
                  </a>
                </div>
              </div>
              <div className="emp-right">
                <p className="emp-desc">
                  Estrategia y producción de contenido para Instagram y TikTok con foco en automatización, IA y tecnología
                  para empresas. Creamos contenido que educa, entretiene y convierte — generando comunidades activas que
                  se traducen en clientes reales.
                </p>
                <div className="emp-feats">
                  <div className="emp-feat">Producción de reels, carruseles y videos cortos optimizados para cada plataforma</div>
                  <div className="emp-feat">Estrategia de contenido mensual: calendario, temas y formatos virales</div>
                  <div className="emp-feat">Crecimiento orgánico con hashtags, colaboraciones y tendencias del sector</div>
                  <div className="emp-feat">Conversión: de seguidor a lead cualificado con CTAs integrados en el contenido</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <div className="ft-top">
            <div className="ft-brand">
              <div className="ft-umb"><b>LXSOLUTIONS</b> · GRUPO</div>
              <div className="ft-logo"><span className="dot" />LXSOLUTIONS</div>
              <p className="ft-tag">Automatización, contenido y redes para empresas. Barcelona, 2026.</p>
            </div>
            <div className="ft-col">
              <h5>Divisiones</h5>
              <ul>
                <li><a href="https://lxsync-web.vercel.app" target="_blank" rel="noopener noreferrer">LXSYNC — Automatización</a></li>
                <li><a data-nav="empresas">LXMEDIA — YouTube</a></li>
                <li><a data-nav="empresas">LXVIRAL — Redes sociales</a></li>
              </ul>
            </div>
            <div className="ft-col">
              <h5>Contacto</h5>
              <ul>
                <li><a href="mailto:info@lxsync.com">info@lxsync.com</a></li>
                <li><a data-nav="contacto">Agendar llamada</a></li>
              </ul>
            </div>
          </div>
          <div className="ft-bot">
            <div className="ft-copy">© 2026 LXSOLUTIONS · Made in BCN</div>
            <div className="ft-socials"><a href="#">LinkedIn</a><a href="#">Instagram</a><a href="#">YouTube</a></div>
          </div>
        </footer>
      </div>

      {/* ═══════════════════════════════════════ */}
      {/* PAGE: CONTACTO                          */}
      {/* ═══════════════════════════════════════ */}
      <div id="page-contacto" className="page">
        <div className="page-hdr">
          <div className="ph-meta">03 / LXSOLUTIONS · Contacto</div>
          <h1 className="ph-title">Agendar<br /><em>llamada.</em></h1>
          <p className="ph-sub">30 minutos. Sin compromiso. Te contamos qué división encaja mejor con lo que necesitas — o si no somos la mejor opción, también te lo decimos.</p>
        </div>

        <section className="section">
          <div className="container">
            <div className="contact-layout">
              <div className="cf-left">
                <div className="cf-head">// Información de contacto</div>
                <div className="cf-info-item">
                  <div className="cf-info-label">Email</div>
                  <div className="cf-info-val"><a href="mailto:info@lxsync.com">info@lxsync.com</a></div>
                </div>
                <div className="cf-info-item">
                  <div className="cf-info-label">Ubicación</div>
                  <div className="cf-info-val">Barcelona, España</div>
                </div>
                <div className="cf-info-item">
                  <div className="cf-info-label">Grupo</div>
                  <div className="cf-info-val">LXSOLUTIONS · LXSYNC · LXMEDIA · LXVIRAL</div>
                </div>
                <div className="cf-info-item">
                  <div className="cf-info-label">Divisiones</div>
                  <div className="cf-info-val">
                    <a href="https://lxsync-web.vercel.app" target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginBottom: '4px' }}>lxsync.com →</a>
                  </div>
                </div>
                <p className="cf-note">// Respuesta en &lt;24h · Sin spam · NDA disponible</p>
              </div>
              <div className="cf-right">
                <div className="cf-cal-head">// Reserva directa</div>
                <CalendlyWidget />
                <p style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', letterSpacing: '.2em', color: 'rgba(240,240,235,.18)', textTransform: 'uppercase', marginTop: '16px' }}>
                  // 30 min · Video call · Sin compromiso
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <div className="ft-top">
            <div className="ft-brand">
              <div className="ft-umb"><b>LXSOLUTIONS</b> · GRUPO</div>
              <div className="ft-logo"><span className="dot" />LXSOLUTIONS</div>
              <p className="ft-tag">Automatización, contenido y redes para empresas. Barcelona, 2026.</p>
            </div>
            <div className="ft-col">
              <h5>Divisiones</h5>
              <ul>
                <li><a href="https://lxsync-web.vercel.app" target="_blank" rel="noopener noreferrer">LXSYNC — Automatización</a></li>
                <li><a data-nav="empresas">LXMEDIA — YouTube</a></li>
                <li><a data-nav="empresas">LXVIRAL — Redes sociales</a></li>
              </ul>
            </div>
            <div className="ft-col">
              <h5>Contacto</h5>
              <ul>
                <li><a href="mailto:info@lxsync.com">info@lxsync.com</a></li>
                <li><a data-nav="contacto">Agendar llamada</a></li>
              </ul>
            </div>
          </div>
          <div className="ft-bot">
            <div className="ft-copy">© 2026 LXSOLUTIONS · Made in BCN</div>
            <div className="ft-socials"><a href="#">LinkedIn</a><a href="#">Instagram</a><a href="#">YouTube</a></div>
          </div>
        </footer>
      </div>

      <ClientInit />
    </>
  )
}
