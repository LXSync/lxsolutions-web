'use client'
import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window { YT: any; onYouTubeIframeAPIReady: () => void }
}

export default function VideoPlayer() {
  const playerRef = useRef<any>(null)
  const [paused, setPaused] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    function init() {
      playerRef.current = new window.YT.Player('yt-player', {
        videoId: 'BxShTQvAbCs',
        playerVars: { autoplay: 1, mute: 1, loop: 1, playlist: 'BxShTQvAbCs', controls: 0, disablekb: 1, modestbranding: 1, rel: 0, playsinline: 1 },
        events: { onReady: (e: any) => e.target.playVideo() },
      })
    }
    if (window.YT?.Player) { init() } else {
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => { prev?.(); init() }
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const s = document.createElement('script')
        s.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(s)
      }
    }
  }, [])

  function togglePlay() {
    if (!playerRef.current) return
    paused ? playerRef.current.playVideo() : playerRef.current.pauseVideo()
    setPaused(p => !p)
  }

  function toggleMute() {
    if (!playerRef.current) return
    muted ? playerRef.current.unMute() : playerRef.current.mute()
    setMuted(m => !m)
  }

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000', overflow: 'hidden' }}>
      <div id="yt-player" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      {/* overlay — blocks YouTube hover UI, click = pause/play */}
      <div
        onClick={togglePlay}
        style={{ position: 'absolute', inset: 0, zIndex: 1, cursor: 'none' }}
      />

      {/* controls */}
      <div style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: 2, display: 'flex', gap: '10px' }}>
        <button onClick={togglePlay} aria-label={paused ? 'Reproducir' : 'Pausar'} style={btnStyle}>
          {paused ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3 2l9 5-9 5V2z"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="2" width="4" height="10"/><rect x="8" y="2" width="4" height="10"/></svg>
          )}
        </button>
        <button onClick={toggleMute} aria-label={muted ? 'Activar sonido' : 'Silenciar'} style={btnStyle}>
          {muted ? (
            <svg width="16" height="14" viewBox="0 0 16 14" fill="currentColor"><path d="M1 4.5h3l4-3v11l-4-3H1V4.5zM13 4l-4 6M9 4l4 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/></svg>
          ) : (
            <svg width="16" height="14" viewBox="0 0 16 14" fill="currentColor"><path d="M1 4.5h3l4-3v11l-4-3H1V4.5z"/><path d="M11 3.5c1.5 1 2.5 2.2 2.5 3.5S12.5 9.5 11 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/></svg>
          )}
        </button>
      </div>
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  background: 'rgba(7,7,7,.6)',
  border: '1px solid rgba(240,240,235,.15)',
  color: '#f0f0eb',
  borderRadius: '6px',
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'none',
  backdropFilter: 'blur(8px)',
}
