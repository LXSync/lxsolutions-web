'use client'
import { useState } from 'react'

const CALENDLY = 'https://calendly.com/alexcasadevall11/30min'
const SLOTS_AM = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30']
const SLOTS_PM = ['15:00', '15:30', '16:00', '16:30']
const DAYS_ES   = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const MONTHS_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

function isAvailable(d: Date) {
  const day = d.getDay()
  const today = new Date(); today.setHours(0,0,0,0)
  return day !== 0 && day !== 6 && d >= today
}
function isToday(d: Date) {
  const t = new Date()
  return d.getDate() === t.getDate() && d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear()
}

export default function CalendlyWidget() {
  const now = new Date()
  const [year, setYear]   = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [sel, setSel]     = useState<Date | null>(null)

  function prev() {
    const d = new Date(year, month - 1, 1)
    const t = new Date(); t.setDate(1); t.setHours(0,0,0,0)
    if (d < t) return
    setYear(d.getFullYear()); setMonth(d.getMonth()); setSel(null)
  }
  function next() {
    const d = new Date(year, month + 1, 1)
    setYear(d.getFullYear()); setMonth(d.getMonth()); setSel(null)
  }
  const totalDays = new Date(year, month + 1, 0).getDate()
  const firstDay  = new Date(year, month, 1).getDay()
  const cells: (number | null)[] = Array(firstDay).fill(null)
  for (let i = 1; i <= totalDays; i++) cells.push(i)
  while (cells.length % 7) cells.push(null)

  function book(slot: string) {
    if (!sel) return
    const y = sel.getFullYear()
    const m = String(sel.getMonth() + 1).padStart(2,'0')
    const d = String(sel.getDate()).padStart(2,'0')
    window.open(`${CALENDLY}?date=${y}-${m}-${d}`, '_blank', 'noopener,noreferrer')
  }

  const selLabel = sel ? `${DAYS_ES[sel.getDay()]} ${sel.getDate()} · ${MONTHS_ES[sel.getMonth()]}` : null
  const prevDisabled = year === now.getFullYear() && month === now.getMonth()

  return (
    <div className="lxcal">
      <div className="lxcal-hd">
        <span className="lxcal-month">{MONTHS_ES[month]} {year}</span>
        <div className="lxcal-nav">
          <button onClick={prev} disabled={prevDisabled} aria-label="Mes anterior">‹</button>
          <button onClick={next} aria-label="Mes siguiente">›</button>
        </div>
      </div>
      <div className="lxcal-body">
        <div className="lxcal-grid">
          <div className="lxcal-days">{DAYS_ES.map(d => <div key={d} className="lxcal-day-hd">{d}</div>)}</div>
          <div className="lxcal-cells">
            {cells.map((day, i) => {
              if (!day) return <div key={i} className="lxcal-cell" />
              const date = new Date(year, month, day)
              const avail    = isAvailable(date)
              const today    = isToday(date)
              const selected = sel?.getDate() === day && sel.getMonth() === month && sel.getFullYear() === year
              let cls = 'lxcal-cell'
              if (avail)    cls += ' avail'
              if (today)    cls += ' today'
              if (selected) cls += ' sel'
              return (
                <div key={i} className={cls} onClick={() => avail && setSel(date)}
                  role={avail ? 'button' : undefined} tabIndex={avail ? 0 : undefined}
                  onKeyDown={e => { if (avail && (e.key === 'Enter' || e.key === ' ')) setSel(date) }}
                  aria-label={avail ? `${day} ${MONTHS_ES[month]}` : undefined} aria-pressed={selected || undefined}>
                  {day}
                </div>
              )
            })}
          </div>
        </div>
        <div className="lxcal-slots">
          {sel ? (
            <>
              <div className="lxcal-slots-hd">{selLabel}</div>
              <div className="lxcal-slot-lbl">// Mañana</div>
              {SLOTS_AM.map(s => <button key={s} className="lxcal-slot" onClick={() => book(s)}>{s}</button>)}
              <div className="lxcal-slot-lbl">// Tarde</div>
              {SLOTS_PM.map(s => <button key={s} className="lxcal-slot" onClick={() => book(s)}>{s}</button>)}
            </>
          ) : (
            <div className="lxcal-no-sel">Selecciona<br />un día<br />disponible</div>
          )}
        </div>
      </div>
    </div>
  )
}
