import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Carousel({ id, title, subtitle, children }) {
  const rail = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  const update = useCallback(() => {
    const el = rail.current
    if (!el) return
    setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    })
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  // GSAP: las tarjetas entran en cascada cuando el carrusel aparece en pantalla
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from(rail.current.children, {
        opacity: 0, y: 28, duration: 0.55, stagger: 0.06, ease: 'power2.out', clearProps: 'transform,opacity',
        scrollTrigger: { trigger: rail.current, start: 'top 88%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  const move = (dir) =>
    rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.85, behavior: 'smooth' })

  return (
    <section id={id} className="block" aria-label={title}>
      <div className="block__head">
        <div>
          <h2>{title}</h2>
          {subtitle && <p className="muted">{subtitle}</p>}
        </div>
        <div className="arrows">
          <button type="button" className="arrow" onClick={() => move(-1)} disabled={edge.start} aria-label={`Anterior en ${title}`}>‹</button>
          <button type="button" className="arrow" onClick={() => move(1)} disabled={edge.end} aria-label={`Siguiente en ${title}`}>›</button>
        </div>
      </div>
      <div className="rail" ref={rail} onScroll={update}>
        {children}
      </div>
    </section>
  )
}
