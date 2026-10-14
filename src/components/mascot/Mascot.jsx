import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useCart } from '@/context/cartContext'

const SplineMascot = lazy(() => import('./SplineMascot'))
const SPLINE_SCENE = import.meta.env.VITE_SPLINE_SCENE

const GREETINGS = [
  '¡Hola, vecino! Soy Mini 👋',
  '¿Te ayudo con tu lista del súper?',
  'Hoy hay ofertas en la sección de abarrotes 🛒',
  '¡Tu barrio, tu lugar!',
]
const CHEERS = ['¡Buena elección! 🛒', '¡Eso va al carrito! 😄', '¡Excelente, vecino!']
const pick = (list) => list[Math.floor(Math.random() * list.length)]
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Mascot() {
  const { count } = useCart()
  const [hidden, setHidden] = useState(false)
  const [message, setMessage] = useState('')
  const timer = useRef(null)
  const api = useRef({})
  const prevCount = useRef(count)
  const r = {
    svg: useRef(null), jump: useRef(null), body: useRef(null), arm: useRef(null),
    eyeL: useRef(null), eyeR: useRef(null), whiteL: useRef(null), whiteR: useRef(null),
    pupilL: useRef(null), pupilR: useRef(null), smile: useRef(null), big: useRef(null),
  }

  const say = (text, ms = 3600) => {
    setMessage(text)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMessage(''), ms)
  }

  // Animaciones GSAP: ojos que siguen el cursor, sonrisa, parpadeo, saludo y salto
  useEffect(() => {
    if (!r.svg.current) return
    const reduce = reduceMotion()
    const state = { near: false, forced: false }

    const eyes = [[r.whiteL, r.pupilL], [r.whiteR, r.pupilR]].map(([white, pupil]) => ({
      white: white.current,
      x: gsap.quickTo(pupil.current, 'x', { duration: 0.3, ease: 'power3.out' }),
      y: gsap.quickTo(pupil.current, 'y', { duration: 0.3, ease: 'power3.out' }),
    }))

    gsap.set(r.big.current, { opacity: 0, scale: 0.6, svgOrigin: '100 150' })
    const renderMouth = () => {
      const open = state.near || state.forced
      gsap.to(r.smile.current, { opacity: open ? 0 : 1, duration: 0.15 })
      gsap.to(r.big.current, { opacity: open ? 1 : 0, scale: open ? 1 : 0.6, duration: 0.3, ease: 'back.out(2)', svgOrigin: '100 150', overwrite: 'auto' })
    }

    const lookAt = (clientX, clientY) => {
      eyes.forEach((eye) => {
        const box = eye.white.getBoundingClientRect()
        const dx = clientX - (box.left + box.width / 2)
        const dy = clientY - (box.top + box.height / 2)
        const dist = Math.hypot(dx, dy) || 1
        const strength = Math.min(dist / 90, 1) // más cerca del ojo = movimiento más suave
        eye.x((dx / dist) * 9 * strength)
        eye.y((dy / dist) * 9 * strength)
      })
      const body = r.svg.current.getBoundingClientRect()
      const near = Math.hypot(clientX - (body.left + body.width / 2), clientY - (body.top + body.height / 2)) < 260
      if (near !== state.near) {
        state.near = near
        renderMouth()
      }
    }

    const onPointer = (e) => lookAt(e.clientX, e.clientY)
    const onLeave = () => eyes.forEach((eye) => { eye.x(0); eye.y(0) })
    window.addEventListener('pointermove', onPointer)
    window.addEventListener('pointerdown', onPointer)
    document.documentElement.addEventListener('mouseleave', onLeave)

    const wave = () =>
      gsap.to(r.arm.current, { rotation: -24, svgOrigin: '162 150', duration: 0.22, yoyo: true, repeat: 5, ease: 'sine.inOut' })

    const celebrate = () => {
      state.forced = true
      renderMouth()
      gsap.timeline()
        .to(r.jump.current, { y: -28, duration: 0.18, ease: 'power2.out' })
        .to(r.jump.current, { y: 0, duration: 0.45, ease: 'bounce.out' })
      gsap.fromTo(r.jump.current, { rotation: -6 }, { rotation: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)', svgOrigin: '100 230' })
      gsap.delayedCall(1.4, () => { state.forced = false; renderMouth() })
      wave()
    }
    api.current = { wave, celebrate }

    let blinkCall
    let waveCall
    let float
    if (!reduce) {
      float = gsap.to(r.body.current, { y: -6, duration: 1.7, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      const blink = () => {
        gsap.to([r.eyeL.current, r.eyeR.current], { scaleY: 0.1, transformOrigin: '50% 50%', duration: 0.07, yoyo: true, repeat: 1 })
        blinkCall = gsap.delayedCall(gsap.utils.random(2.5, 5.5), blink)
      }
      blinkCall = gsap.delayedCall(2, blink)
      const greet = () => { wave(); waveCall = gsap.delayedCall(11, greet) }
      waveCall = gsap.delayedCall(1.2, greet)
    }
    const hello = setTimeout(() => say(GREETINGS[0], 4200), 1600)

    return () => {
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerdown', onPointer)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      clearTimeout(hello)
      blinkCall?.kill()
      waveCall?.kill()
      float?.kill()
      gsap.killTweensOf(Object.values(r).map((ref) => ref.current).filter(Boolean))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden])

  useEffect(() => () => clearTimeout(timer.current), [])

  // Reacciona cuando el cliente agrega productos al carrito
  useEffect(() => {
    if (count > prevCount.current) {
      api.current.celebrate?.()
      say(pick(CHEERS), 2200)
    }
    prevCount.current = count
  }, [count])

  const onClick = () => {
    api.current.wave?.()
    say(pick(GREETINGS))
  }

  if (hidden) {
    return (
      <button type="button" className="mascot-restore" onClick={() => setHidden(false)} aria-label="Mostrar a Mini, la mascota">
        👋 Mini
      </button>
    )
  }

  return (
    <aside className={`mascot${SPLINE_SCENE ? ' mascot--spline' : ''}`} aria-label="Mini, la mascota de MINI MARKET 26">
      {message && <p className="mascot__bubble" role="status">{message}</p>}
      <button type="button" className="mascot__close" onClick={() => setHidden(true)} aria-label="Ocultar a Mini">×</button>
      {SPLINE_SCENE ? (
        <Suspense fallback={null}><SplineMascot scene={SPLINE_SCENE} /></Suspense>
      ) : (
        <button type="button" className="mascot__hit" onClick={onClick} aria-label="Saludar a Mini">
          <svg ref={r.svg} viewBox="0 0 200 250" role="img" aria-hidden="true">
            <ellipse cx="100" cy="240" rx="54" ry="7" fill="#0b2a5b" opacity="0.18" />
            <g ref={r.jump}>
              <g ref={r.body}>
                <g stroke="#0b2a5b" strokeWidth="6" strokeLinecap="round" fill="none">
                  <path d="M32 150 Q10 158 14 184" />
                  <path d="M68 78 C64 14 136 14 132 78" strokeWidth="9" />
                </g>
                <circle cx="14" cy="190" r="9" fill="#ffc72c" stroke="#0b2a5b" strokeWidth="6" />
                <path d="M38 76 H162 L174 216 Q175 230 160 230 H40 Q25 230 26 216 Z" fill="#ffc72c" stroke="#0b2a5b" strokeWidth="6" strokeLinejoin="round" />
                <text x="100" y="216" textAnchor="middle" fontSize="28" fontWeight="800" fill="#0b2a5b" fontFamily="Segoe UI, system-ui, sans-serif">26</text>

                <g ref={r.eyeL}>
                  <circle ref={r.whiteL} cx="72" cy="118" r="21" fill="#fff" stroke="#0b2a5b" strokeWidth="4" />
                  <g ref={r.pupilL}><circle cx="72" cy="118" r="10" fill="#0b2a5b" /><circle cx="76" cy="113" r="3.2" fill="#fff" /></g>
                </g>
                <g ref={r.eyeR}>
                  <circle ref={r.whiteR} cx="128" cy="118" r="21" fill="#fff" stroke="#0b2a5b" strokeWidth="4" />
                  <g ref={r.pupilR}><circle cx="128" cy="118" r="10" fill="#0b2a5b" /><circle cx="132" cy="113" r="3.2" fill="#fff" /></g>
                </g>
                <ellipse cx="46" cy="148" rx="9" ry="6" fill="#ff8aa1" opacity="0.55" />
                <ellipse cx="154" cy="148" rx="9" ry="6" fill="#ff8aa1" opacity="0.55" />
                <path ref={r.smile} d="M74 150 Q100 172 126 150" fill="none" stroke="#0b2a5b" strokeWidth="5" strokeLinecap="round" />
                <g ref={r.big}>
                  <path d="M70 146 Q100 196 130 146 Z" fill="#0b2a5b" stroke="#0b2a5b" strokeWidth="4" strokeLinejoin="round" />
                  <ellipse cx="100" cy="164" rx="13" ry="6" fill="#ff6f88" />
                </g>

                <g ref={r.arm}>
                  <path d="M162 150 Q184 148 190 124" fill="none" stroke="#0b2a5b" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="190" cy="118" r="9" fill="#ffc72c" stroke="#0b2a5b" strokeWidth="6" />
                </g>
              </g>
            </g>
          </svg>
        </button>
      )}
    </aside>
  )
}
