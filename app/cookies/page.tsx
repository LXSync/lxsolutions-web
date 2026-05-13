import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Cookies · LXSOLUTIONS',
  robots: { index: false, follow: false },
}

export default function CookiesPage() {
  return (
    <div className="legal-page">
      <div className="legal-bg" />
      <div className="legal-inner">
        <nav className="legal-nav">
          <span className="ln-brand">LXSOLUTIONS · GRUPO</span>
          <span className="ln-sep">/</span>
          <Link href="/" className="ln-back">← Volver al inicio</Link>
        </nav>

        <p className="lc-tag">// Legal · Cookies</p>
        <h1>Política de<br /><em>Cookies</em></h1>
        <p className="lc-date">Última actualización: mayo 2026 · Directiva 2009/136/CE · LSSI</p>

        <h2>01 · ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que un sitio web almacena en tu navegador cuando
          lo visitas. Sirven para que el sitio recuerde tus preferencias, mantener sesiones activas o
          recopilar información sobre el uso de la web.
        </p>
        <p>
          Esta web usa el mínimo de cookies imprescindible para su funcionamiento. <strong>No usamos
          cookies publicitarias, de rastreo cross-site ni de perfilado.</strong>
        </p>

        <h2>02 · Cookies que utilizamos</h2>
        <table className="legal-table">
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Tipo</th>
              <th>Duración</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>lxs_cookie_consent</td>
              <td>Propia · Funcional</td>
              <td>1 año</td>
              <td>Guarda tu preferencia de consentimiento de cookies para no volver a mostrarte el aviso.</td>
            </tr>
          </tbody>
        </table>
        <p>
          Esta cookie es <strong>estrictamente técnica y funcional</strong> — no recopila datos
          personales ni se comparte con terceros.
        </p>

        <h2>03 · Cookies de terceros</h2>
        <p>Al interactuar con ciertos servicios integrados, esos proveedores pueden establecer sus propias cookies:</p>
        <table className="legal-table">
          <thead>
            <tr>
              <th>Proveedor</th>
              <th>Cuándo</th>
              <th>Más información</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Formspree</td>
              <td>Al enviar el formulario de contacto</td>
              <td><a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Política Formspree</a></td>
            </tr>
          </tbody>
        </table>
        <p>
          Este servicio está bajo su propia política de privacidad. Los datos que recopila
          se rigen por sus respectivos términos y no están bajo nuestro control directo.
        </p>

        <h2>04 · Cómo gestionar y eliminar las cookies</h2>
        <p>
          Puedes gestionar o eliminar las cookies en cualquier momento desde la configuración de tu
          navegador. A continuación, los enlaces directos de los principales navegadores:
        </p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
          <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
        </ul>
        <p>
          Ten en cuenta que desactivar las cookies técnicas puede afectar al funcionamiento correcto
          del sitio.
        </p>

        <h2>05 · Cambios en esta política</h2>
        <p>
          Actualizaremos esta política si incorporamos nuevos servicios o funcionalidades que impliquen
          nuevas cookies. La fecha de última actualización siempre aparece al inicio de esta página.
        </p>

        <div className="lc-box">
          <p>
            ¿Dudas sobre cookies o privacidad? Escríbenos a{' '}
            <a href="mailto:group@lxsolutions.es">group@lxsolutions.es</a>. También puedes consultar nuestra{' '}
            <Link href="/privacidad">Política de Privacidad</Link> completa.
          </p>
        </div>

        <div className="legal-foot">
          <Link href="/">← Inicio</Link>
          <Link href="/privacidad">Política de Privacidad</Link>
          <a href="mailto:group@lxsolutions.es">group@lxsolutions.es</a>
          <span>© 2026 LXSOLUTIONS · GRN</span>
        </div>
      </div>
    </div>
  )
}
