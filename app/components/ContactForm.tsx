'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const [form, setForm] = useState({ nombre: '', empresa: '', email: '', whatsapp: '', division: '', mensaje: '' })

  function set(k: string, v: string) { setForm(p => ({ ...p, [k]: v })) }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setState('sending')
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setState(r.ok ? 'ok' : 'err')
    } catch {
      setState('err')
    }
  }

  if (state === 'ok') return (
    <div className="cf2-success">
      <div className="cf2-ok-icon">✓</div>
      <div className="cf2-ok-title">Mensaje recibido.</div>
      <div className="cf2-ok-sub">Te contactamos en menos de 24 horas.</div>
    </div>
  )

  return (
    <form className="cf2-form" onSubmit={submit} noValidate>
      <div className="cf2-row">
        <div className="cf2-field">
          <label className="cf2-lbl">Nombre *</label>
          <input className="cf2-inp" type="text" required placeholder="Tu nombre" value={form.nombre} onChange={e => set('nombre', e.target.value)} />
        </div>
        <div className="cf2-field">
          <label className="cf2-lbl">Empresa *</label>
          <input className="cf2-inp" type="text" required placeholder="Tu empresa" value={form.empresa} onChange={e => set('empresa', e.target.value)} />
        </div>
      </div>
      <div className="cf2-row">
        <div className="cf2-field">
          <label className="cf2-lbl">Email *</label>
          <input className="cf2-inp" type="email" required placeholder="tu@empresa.com" value={form.email} onChange={e => set('email', e.target.value)} />
        </div>
        <div className="cf2-field">
          <label className="cf2-lbl">WhatsApp</label>
          <input className="cf2-inp" type="tel" placeholder="+34 600 000 000" value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} />
        </div>
      </div>
      <div className="cf2-field">
        <label className="cf2-lbl">División de interés</label>
        <select className="cf2-sel" value={form.division} onChange={e => set('division', e.target.value)}>
          <option value="">Selecciona una opción</option>
          <option value="LXSYNC — Automatización e IA">LXSYNC — Automatización e IA</option>
          <option value="LXMEDIA — YouTube & Contenido">LXMEDIA — YouTube &amp; Contenido</option>
          <option value="LXVIRAL — Redes Sociales">LXVIRAL — Redes Sociales</option>
          <option value="Varias divisiones">Varias divisiones</option>
          <option value="No lo tengo claro aún">No lo tengo claro aún</option>
        </select>
      </div>
      <div className="cf2-field">
        <label className="cf2-lbl">¿Cuál es tu reto?</label>
        <textarea className="cf2-ta" rows={4} placeholder="Cuéntanos brevemente qué quieres mejorar o automatizar." value={form.mensaje} onChange={e => set('mensaje', e.target.value)} />
      </div>
      <div className="cf2-footer">
        <span className="cf2-note">Respuesta &lt;24h · Sin spam · NDA disponible</span>
        <button className="cf2-btn" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Enviando...' : 'Enviar mensaje →'}
        </button>
      </div>
      {state === 'err' && <div className="cf2-err">Error al enviar. Inténtalo de nuevo.</div>}
    </form>
  )
}
