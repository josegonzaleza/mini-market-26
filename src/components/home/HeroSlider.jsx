import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import ShinyText from '@/components/reactbits/ShinyText'
import { BANNERS } from '@/data/banners'

const INTERVAL = 6500
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const track = useRef(null)
  const total = BANNERS.length

  useEffect(() => {
    if (paused || reduceMotion()) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % total), INTERVAL)
    return () => clearInterval(timer)
  }, [paused, total])

  // GSAP: el contenido del banner activo entra en secuencia
  useEffect(() => {
    if (reduceMotion()) return
    const slide = track.current.children[index]
    const ctx = gsap.context(() => {
      gsap.from('.slide__text > *', { opacity: 0, y: 26, duration: 0.7, stagger: 0.1, delay: 0.25, ease: 'power3.out' })
      gsap.from('.bubble', { opacity: 0, scale: 0.5, duration: 0.7, stagger: 0.09, delay: 0.3, ease: 'back.out(1.8)' })
      gsap.set('.bubble', { y: (i) => (i % 2 ? 18 : 0) })
      gsap.to('.bubble', { y: '+=10', duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut', stagger: 0.25 })
    }, slide)
    return () => ctx.revert()
  }, [index])

  const go = (n) => setIndex((n + total) % total)

  return (
    <section
      className="hero"
      aria-roledescription="carrusel"
      aria-label="Novedades de la tienda"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero__track" ref={track} style={{ transform: `translateX(-${index * 100}%)` }}>
        {BANNERS.map((b, k) => {
          const light = b.theme === 'yellow'
          return (
            <article key={b.id} className={`slide slide--${b.theme}`} aria-hidden={k !== index}>
              <div className="slide__text">
                <span className="slide__kicker">
                  <ShinyText text={b.kicker} color={light ? '#0b2a5b' : '#ffffff'} shineColor={light ? '#ffffff' : '#ffc72c'} speed={3} />
                </span>
                <h1>{b.title}</h1>
                <p>{b.text}</p>
                <a className="btn btn--accent btn--lg" href={b.href} tabIndex={k === index ? 0 : -1}>
                  {b.cta}
                </a>
              </div>
              <div className="slide__art" aria-hidden="true">
                {b.art.map((e) => <span key={e} className="bubble">{e}</span>)}
              </div>
            </article>
          )
        })}
      </div>
      <button type="button" className="hero__nav hero__nav--prev" onClick={() => go(index - 1)} aria-label="Banner anterior">‹</button>
      <button type="button" className="hero__nav hero__nav--next" onClick={() => go(index + 1)} aria-label="Banner siguiente">›</button>
      <div className="hero__dots">
        {BANNERS.map((b, k) => (
          <button key={b.id} type="button" className={k === index ? 'is-active' : ''} onClick={() => setIndex(k)} aria-label={`Ir al banner ${k + 1}`} aria-current={k === index} />
        ))}
      </div>
    </section>
  )
}
