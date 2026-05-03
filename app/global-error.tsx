'use client'
export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="es">
      <body style={{ background: '#070707', color: '#f0f0eb', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.3em', opacity: 0.4, marginBottom: '16px' }}>ERROR</p>
          <button onClick={reset} style={{ background: '#f0f0eb', color: '#070707', border: 'none', padding: '12px 28px', cursor: 'pointer' }}>
            Reintentar
          </button>
        </div>
      </body>
    </html>
  )
}
