'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (!localStorage.getItem('lxsol_cookie_consent')) {
      const t = setTimeout(() => setShow(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])
  function accept(level: 'all' | 'essential') {
    localStorage.setItem('lxsol_cookie_consent', level)
    setShow(false)
  }
  if (!show) return null
  return (
    <div className="cb-overlay" role="dialog" aria-modal="true" aria-label="Aviso de cookies">
      <div className="cb-panel">
        <div className="cb-corner cb-tl" /><div className="cb-corner cb-tr" />
        <div className="cb-corner cb-bl" /><div className="cb-corner cb-br" />
        <div className="cb-label">// PRIVACIDAD · CONSENTIMIENTO</div>
        <div className="cb-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 3L4 8v8c0 7.18 5.16 13.9 12 15.5C22.84 29.9 28 23.18 28 16V8L16 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            <path d="M11 16l3.5 3.5L21 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="cb-title">Cookies &amp; Privacidad</h2>
        <p className="cb-body">Usamos <strong>cookies técnicas</strong> esenciales y de terceros (Calendly) para reservas. Sin rastreo publicitario.</p>
        <div className="cb-links">
          <Link href="/cookies">Política de cookies</Link>
          <span className="cb-sep">·</span>
          <Link href="/privacidad">Privacidad</Link>
        </div>
        <div className="cb-actions">
          <button className="cb-btn-e" onClick={() => accept('essential')}>Solo esenciales</button>
          <button className="cb-btn-a" onClick={() => accept('all')}>Aceptar todo</button>
        </div>
      </div>
    </div>
  )
}
