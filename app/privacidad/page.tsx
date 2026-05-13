import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidad · LXSOLUTIONS',
  robots: { index: false, follow: false },
}

export default function PrivacidadPage() {
  return (
    <div className="legal-page">
      <div className="legal-bg" />
      <div className="legal-inner">
        <nav className="legal-nav">
          <span className="ln-brand">LXSOLUTIONS · GRUPO</span>
          <span className="ln-sep">/</span>
          <Link href="/" className="ln-back">← Volver al inicio</Link>
        </nav>

        <p className="lc-tag">// Legal · Privacidad</p>
        <h1>Política de<br /><em>Privacidad</em></h1>
        <p className="lc-date">Última actualización: mayo 2026 · RGPD aplicable</p>

        <h2>01 · Responsable del tratamiento</h2>
        <p>
          <strong>LXSOLUTIONS</strong>, grupo empresarial con domicilio en
          Girona (España) y dirección de contacto <a href="mailto:group@lxsolutions.es">group@lxsolutions.es</a>.
        </p>
        <div className="lc-box">
          <p>Para cualquier consulta relacionada con el tratamiento de tus datos personales, escríbenos a <strong>group@lxsolutions.es</strong> con el asunto «Protección de datos».</p>
        </div>

        <h2>02 · Datos que recogemos</h2>
        <p>Recogemos únicamente los datos que tú nos proporcionas a través del formulario de contacto:</p>
        <ul>
          <li><strong>Nombre</strong> — para identificarte en nuestra comunicación.</li>
          <li><strong>Empresa</strong> — para contextualizar tu caso de uso.</li>
          <li><strong>Email</strong> — canal principal de respuesta.</li>
          <li><strong>WhatsApp</strong> (opcional) — si prefieres contacto por mensaje.</li>
          <li><strong>Área de interés</strong> — para orientarte hacia la división correcta del grupo.</li>
          <li><strong>Mensaje libre</strong> — descripción de tu situación o consulta.</li>
        </ul>
        <p>No recogemos datos de navegación, no usamos Google Analytics ni ninguna herramienta de rastreo publicitario.</p>

        <h2>03 · Finalidad del tratamiento</h2>
        <ul>
          <li>Responder a tu consulta y derivarte a la división del grupo más adecuada (LXSYNC, LXMEDIA o LXVIRAL).</li>
          <li>Enviar información relacionada con los servicios del grupo LXSOLUTIONS que hayas solicitado.</li>
          <li>Gestionar la relación contractual si decides contratar nuestros servicios.</li>
        </ul>
        <p>No utilizamos tus datos para publicidad, no los cedemos a terceros con fines comerciales y no tomamos decisiones automatizadas basadas en perfiles.</p>

        <h2>04 · Base legal del tratamiento</h2>
        <p>
          El tratamiento de tus datos se basa en tu <strong>consentimiento</strong> (Art. 6.1.a RGPD) al
          enviar el formulario, y en el <strong>interés legítimo</strong> (Art. 6.1.f RGPD) para la gestión
          de la relación precontractual. Si contratamos servicios, la base legal es la{' '}
          <strong>ejecución del contrato</strong> (Art. 6.1.b RGPD).
        </p>

        <h2>05 · Destinatarios y encargados</h2>
        <p>Tus datos son gestionados por los siguientes terceros en calidad de encargados del tratamiento:</p>
        <table className="legal-table">
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Uso</th>
              <th>Ubicación</th>
              <th>Política de privacidad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Formspree</td>
              <td>Recepción y envío del formulario de contacto</td>
              <td>EE. UU. (SCCs)</td>
              <td><a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Ver política</a></td>
            </tr>
          </tbody>
        </table>
        <p>No vendemos ni cedemos tus datos a ningún tercero con fines distintos a los descritos.</p>

        <h2>06 · Plazo de conservación</h2>
        <p>
          Conservamos tus datos durante el tiempo necesario para gestionar tu consulta y, en su caso,
          la relación contractual. Si no se formaliza ningún contrato, los datos se eliminan a los
          <strong> 2 años</strong> desde el último contacto. Los datos contractuales se conservan durante
          el plazo legalmente exigido (hasta 6 años en materia mercantil y fiscal).
        </p>

        <h2>07 · Tus derechos</h2>
        <p>En virtud del RGPD y la LOPDGDD, tienes los siguientes derechos sobre tus datos:</p>
        <ul>
          <li><strong>Acceso</strong> — conocer qué datos tenemos sobre ti.</li>
          <li><strong>Rectificación</strong> — corregir datos inexactos o incompletos.</li>
          <li><strong>Supresión</strong> — solicitar que borremos tus datos («derecho al olvido»).</li>
          <li><strong>Portabilidad</strong> — recibir tus datos en formato estructurado y legible.</li>
          <li><strong>Oposición</strong> — oponerte al tratamiento basado en interés legítimo.</li>
          <li><strong>Limitación</strong> — solicitar que suspendamos temporalmente el tratamiento.</li>
          <li><strong>Retirar el consentimiento</strong> — en cualquier momento, sin efecto retroactivo.</li>
        </ul>
        <p>
          Para ejercer cualquiera de estos derechos, escríbenos a{' '}
          <a href="mailto:group@lxsolutions.es">group@lxsolutions.es</a> con el asunto «Derechos RGPD» e
          indica el derecho que deseas ejercer. Responderemos en el plazo máximo de 30 días.
        </p>
        <p>
          Si consideras que el tratamiento no es conforme, puedes presentar una reclamación ante la{' '}
          <strong>Agencia Española de Protección de Datos (AEPD)</strong>:{' '}
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>.
        </p>

        <h2>08 · Cookies</h2>
        <p>
          Esta web utiliza cookies técnicas estrictamente necesarias para su funcionamiento. Consulta
          nuestra <Link href="/cookies">Política de Cookies</Link> para más información.
        </p>

        <h2>09 · Cambios en esta política</h2>
        <p>
          Podemos actualizar esta política cuando sea necesario por cambios legales o en nuestros
          servicios. Publicaremos la nueva versión en esta página con la fecha de actualización.
          Si los cambios son relevantes, te lo comunicaremos por email si tenemos tu dirección.
        </p>

        <div className="legal-foot">
          <Link href="/">← Inicio</Link>
          <Link href="/cookies">Política de Cookies</Link>
          <a href="mailto:group@lxsolutions.es">group@lxsolutions.es</a>
          <span>© 2026 LXSOLUTIONS · GRN</span>
        </div>
      </div>
    </div>
  )
}
