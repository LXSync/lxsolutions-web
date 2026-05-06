import ClientInit from './ClientInit'
import CalendlyWidget from './components/CalendlyWidget'
import ContactForm from './components/ContactForm'
import VideoPlayer from './components/VideoPlayer'

export default function Home() {
  return (
    <>
      <a href="#hero" className="skip-link">Saltar al contenido</a>

      {/* BG */}
      <canvas id="three-canvas" aria-hidden="true" />
      <div id="bg-grid" aria-hidden="true" />
      <div id="bg-vignette" aria-hidden="true" />
      <div id="bg-noise" aria-hidden="true" />
      <div id="bg-scan" aria-hidden="true" />

      {/* Scroll progress */}
      <div id="sp" aria-hidden="true" />


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
              <span className="ci-b purple" id="ci-b3">LXVIRAL</span>
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
              <a data-nav="home" className="nav-logo">
                <span className="dot" aria-hidden="true" />LXSOLUTIONS
              </a>
            </div>
          </div>
        </div>
        <div className="nav-right">
          <a data-nav="contacto" className="nav-cta-btn">
            Agendar llamada <span className="nav-cta-arr">→</span>
          </a>
          <button id="nav-menu-btn" className="nav-menu-btn" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-overlay">
            <div className="nmb-bars"><span /><span /></div>
            <span className="nmb-label">Menú</span>
          </button>
        </div>
      </nav>

      {/* NAV OVERLAY */}
      <div id="nav-overlay" role="dialog" aria-label="Menú de navegación" aria-hidden="true" aria-modal="true">
        <canvas id="nvo-canvas" aria-hidden="true" />
        <div className="nvo-scanlines" aria-hidden="true" />
        <div className="nvo-corner nvo-tl">LXSOLUTIONS · GRUPO</div>
        <div className="nvo-corner nvo-br">BCN · 2026</div>
        <button className="nvo-close" id="nvo-close" aria-label="Cerrar menú">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="nvc-label">CERRAR</span>
        </button>
        <div className="nvo-inner">
          <div className="nvo-brand">
            <span className="nvo-dot" aria-hidden="true" />LXSOLUTIONS GROUP
          </div>
          <nav className="nvo-links" aria-label="Navegación overlay">
            <a data-nav="home" className="nvo-link">
              <span className="nvo-num">01</span>
              <span className="nvo-text">Inicio</span>
              <span className="nvo-desc">El grupo</span>
            </a>
            <a data-nav="empresas" className="nvo-link">
              <span className="nvo-num">02</span>
              <span className="nvo-text">Divisiones</span>
              <span className="nvo-desc">Tres marcas</span>
            </a>
            <a data-nav="contacto" className="nvo-link">
              <span className="nvo-num">03</span>
              <span className="nvo-text">Contacto</span>
              <span className="nvo-desc">Agendar llamada</span>
            </a>
          </nav>
          <div className="nvo-foot">
            <a data-nav="contacto" className="nvo-cta">
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
          <canvas id="h-particles" aria-hidden="true" />
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
            <a data-nav="empresas" className="btn btn-p">
              Ver divisiones
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
                <path d="M1 6h12M9 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a data-nav="contacto" className="btn btn-ghost">
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

        {/* Video */}
        <section style={{ paddingBottom: '80px', width: '100%' }}>
          <VideoPlayer />
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
              <a data-nav="contacto" className="btn btn-p">
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
                  <a data-nav="contacto" className="btn btn-p" style={{ background: 'var(--red)', color: '#fff' }}>
                    Hablar con LXMEDIA →
                  </a>
                </div>
              </div>
              <div className="emp-right">
                <p className="emp-desc">
                  Creamos y gestionamos el canal de YouTube de tu empresa desde cero. Nos encargamos de todo —
                  guion, grabación, edición y publicación — para que tu marca tenga presencia profesional en YouTube
                  sin que tengas que dedicarle tiempo.
                </p>
                <div className="emp-feats">
                  <div className="emp-feat">Creación del canal y configuración profesional desde cero</div>
                  <div className="emp-feat">Producción completa de video: guion, grabación, edición y publicación</div>
                  <div className="emp-feat">Contenido adaptado a tu empresa, tu sector y tu audiencia objetivo</div>
                  <div className="emp-feat">Estrategia de crecimiento: SEO en YouTube, thumbnails y títulos optimizados para que te encuentren</div>
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
                  <a data-nav="contacto" className="btn btn-p" style={{ background: 'var(--purple)', color: '#070707' }}>
                    Hablar con LXVIRAL →
                  </a>
                </div>
              </div>
              <div className="emp-right">
                <p className="emp-desc">
                  Hacemos viral tu empresa en Instagram y TikTok. Creamos el contenido de tu marca,
                  lo publicamos en tus cuentas y lo optimizamos para que llegue al máximo de personas —
                  tú solo tienes que ver cómo crece tu audiencia.
                </p>
                <div className="emp-feats">
                  <div className="emp-feat">Gestión completa de tu Instagram y TikTok: contenido, publicación y comunidad</div>
                  <div className="emp-feat">Producción de reels, carruseles y videos cortos adaptados a tu empresa</div>
                  <div className="emp-feat">Estrategia viral: formatos, tendencias y timing para maximizar el alcance</div>
                  <div className="emp-feat">Tu empresa llega a miles de potenciales clientes sin invertir en publicidad</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Finale: all brands united ── */}
        <div className="emp-finale">
          <div className="emp-finale-hd">
            <div className="emp-finale-umb">LXSOLUTIONS · GROUP</div>
            <h2 className="emp-finale-title">Un solo grupo.<br /><em>Tres divisiones.</em></h2>
          </div>
          <div className="emp-finale-grid">
            <div className="emp-fb emp-fb-sync">
              <div className="emp-fb-num">01</div>
              <div className="emp-fb-name">LXSYNC</div>
              <div className="emp-fb-tags">
                <span className="emp-fb-tag">Automatización</span>
                <span className="emp-fb-tag">Agentes IA</span>
                <span className="emp-fb-tag">B2B</span>
                <span className="emp-fb-tag">Diagnóstico</span>
              </div>
              <p className="emp-fb-desc">Diseñamos e implementamos automatizaciones con IA a medida para empresas B2B que quieren eliminar tareas manuales, reducir errores y operar en piloto automático. Empezamos con un diagnóstico operativo — sin vender nada antes de entender tu negocio.</p>
              <ul className="emp-fb-feats">
                <li>Diagnóstico operativo: mapeamos dónde pierdes tiempo y dinero antes de proponer nada</li>
                <li>Agentes IA que gestionan leads, soporte y operaciones 24/7 sin intervención humana</li>
                <li>Flujos con n8n, Make, GPT-4o y tu stack actual — sin migrar nada</li>
                <li>Implementación en 2–4 semanas. Precio fijo. Datos 100% tuyos</li>
              </ul>
              <a className="emp-fb-btn emp-fb-btn-sync" href="https://lxsync-web.vercel.app" target="_blank" rel="noopener noreferrer">Visitar LXSYNC →</a>
            </div>
            <div className="emp-fb-sep"><div className="emp-fb-sep-line" /></div>
            <div className="emp-fb emp-fb-media">
              <div className="emp-fb-num">02</div>
              <div className="emp-fb-name">LXMEDIA</div>
              <div className="emp-fb-tags">
                <span className="emp-fb-tag">YouTube</span>
                <span className="emp-fb-tag">Producción</span>
                <span className="emp-fb-tag">Monetización</span>
                <span className="emp-fb-tag">Automatización</span>
              </div>
              <p className="emp-fb-desc">Creamos y gestionamos el canal de YouTube de tu empresa desde cero. Nos encargamos de todo — guion, grabación, edición y publicación — para que tu marca tenga presencia profesional en YouTube sin que tengas que dedicarle tiempo.</p>
              <ul className="emp-fb-feats">
                <li>Creación del canal y configuración profesional desde cero</li>
                <li>Producción completa de video: guion, grabación, edición y publicación</li>
                <li>Contenido adaptado a tu empresa, tu sector y tu audiencia objetivo</li>
                <li>SEO en YouTube, thumbnails y títulos optimizados para que te encuentren</li>
              </ul>
              <a className="emp-fb-btn emp-fb-btn-media" data-nav="contacto">Hablar con LXMEDIA →</a>
            </div>
            <div className="emp-fb-sep"><div className="emp-fb-sep-line" /></div>
            <div className="emp-fb emp-fb-viral">
              <div className="emp-fb-num">03</div>
              <div className="emp-fb-name">LXVIRAL</div>
              <div className="emp-fb-tags">
                <span className="emp-fb-tag">Instagram</span>
                <span className="emp-fb-tag">TikTok</span>
                <span className="emp-fb-tag">Viral</span>
                <span className="emp-fb-tag">Comunidad</span>
              </div>
              <p className="emp-fb-desc">Hacemos viral tu empresa en Instagram y TikTok. Creamos el contenido de tu marca, lo publicamos en tus cuentas y lo optimizamos para que llegue al máximo de personas — tú solo tienes que ver cómo crece tu audiencia.</p>
              <ul className="emp-fb-feats">
                <li>Gestión completa de tu Instagram y TikTok: contenido, publicación y comunidad</li>
                <li>Producción de reels, carruseles y videos cortos adaptados a tu empresa</li>
                <li>Estrategia viral: formatos, tendencias y timing para maximizar el alcance</li>
                <li>Tu empresa llega a miles de potenciales clientes sin invertir en publicidad</li>
              </ul>
              <a className="emp-fb-btn emp-fb-btn-viral" data-nav="contacto">Hablar con LXVIRAL →</a>
            </div>
          </div>
          <div className="emp-finale-cta">
            <div className="emp-finale-cta-label">¿Listo para transformar tu empresa?</div>
            <a data-nav="contacto" className="btn btn-p">Agendar llamada gratuita →</a>
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
        <section className="contact-cta rw">
          <div className="contact-cta-inner">
            <div className="contact-cta-label">Contacto · LXSOLUTIONS Group</div>
            <h1 className="contact-cta-title">Hablemos de<br /><em>tu proyecto.</em></h1>
            <p className="contact-cta-sub">30 minutos. Sin compromiso. Te contamos qué división encaja mejor con lo que necesitas — o si no somos la mejor opción, también te lo decimos.</p>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
          <div className="container">
            <div className="contact2-layout rw">
              <div>
                <div className="contact2-head">Cuéntanos</div>
                <ContactForm />
              </div>
              <div>
                <div className="contact2-head">Reserva tu llamada</div>
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
