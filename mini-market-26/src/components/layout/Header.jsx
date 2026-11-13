import { useEffect, useRef } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { gsap } from 'gsap'
import Magnet from '@/components/reactbits/Magnet'
import { useCart } from '@/context/cartContext'
import { CATEGORIES } from '@/data/products'
import { STORE, ROUTES } from '@/constants'

export default function Header() {
  const { count, openCart } = useCart()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const badge = useRef(null)
  const prevCount = useRef(count)

  // GSAP: el contador "rebota" cada vez que se agrega un producto
  useEffect(() => {
    if (count > prevCount.current) {
      gsap.fromTo(badge.current, { scale: 1.9 }, { scale: 1, duration: 0.55, ease: 'elastic.out(1, 0.45)' })
    }
    prevCount.current = count
  }, [count])

  const onSearch = (e) => {
    const value = e.target.value
    navigate(
      { pathname: ROUTES.HOME, search: value ? `?q=${encodeURIComponent(value)}` : '' },
      { replace: true },
    )
  }

  return (
    <header className="header">
      <div className="header__inner">
        <Link to={ROUTES.HOME} className="brand" aria-label={`${STORE.name}, inicio`}>
          <span className="brand__name">
            MINI MARKET <span className="brand__badge">26</span>
          </span>
          <span className="brand__slogan">{STORE.slogan}</span>
        </Link>

        <form className="searchbar" role="search" onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            placeholder="¿Qué necesitas hoy? Arroz, leche, café…"
            value={params.get('q') ?? ''}
            onChange={onSearch}
            aria-label="Buscar productos"
          />
        </form>

        <Magnet padding={40} magnetStrength={4} wrapperClassName="cart-wrap">
          <button type="button" className="cart-btn" onClick={openCart}>
            <span aria-hidden="true">🛒</span>
            <span className="cart-btn__label">Mi carrito</span>
            <span ref={badge} className="cart-btn__count" aria-label={`${count} productos`}>{count}</span>
          </button>
        </Magnet>
      </div>

      <nav className="catnav" aria-label="Secciones del súper">
        <div className="catnav__inner">
          {CATEGORIES.map((c) => (
            <a key={c.slug} href={`/#${c.slug}`}>{c.name}</a>
          ))}
        </div>
      </nav>
    </header>
  )
}
