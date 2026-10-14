import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '@/components/products/ProductCard'
import Carousel from '@/components/common/Carousel'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import HeroSlider from '@/components/home/HeroSlider'
import Benefits from '@/components/home/Benefits'
import CategoryTiles from '@/components/home/CategoryTiles'
import { BEST_SELLERS, CATEGORIES, OFFER_PRODUCTS, PRODUCTS } from '@/data/products'
import { normalize } from '@/utils/formatters'

const cards = (list) => list.map((x) => <ProductCard key={x.id} product={x} />)

export default function Home() {
  const [params] = useSearchParams()
  const query = (params.get('q') ?? '').trim()
  const q = normalize(query)
  const results = useMemo(
    () => (q ? PRODUCTS.filter((x) => normalize(x.name).includes(q)) : []),
    [q],
  )

  // Si se llega con #seccion en la URL, baja hasta esa sección.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  if (q) {
    return (
      <section className="block">
        <div className="block__head"><h2>Resultados para {query}</h2></div>
        {results.length === 0 ? (
          <p className="muted">No encontramos productos con esa búsqueda. Prueba con otra palabra.</p>
        ) : (
          <div className="grid">{cards(results)}</div>
        )}
      </section>
    )
  }

  return (
    <>
      <HeroSlider />
      <AnimatedContent distance={40} duration={0.8}><Benefits /></AnimatedContent>
      <AnimatedContent distance={40} duration={0.8}><CategoryTiles /></AnimatedContent>
      <Carousel id="ofertas" title="Ofertas de la semana" subtitle="Precios rebajados por tiempo limitado">
        {cards(OFFER_PRODUCTS)}
      </Carousel>
      <Carousel id="mas-vendidos" title="Los más vendidos" subtitle="Lo que más piden nuestros vecinos">
        {cards(BEST_SELLERS)}
      </Carousel>
      {CATEGORIES.map((c) => (
        <Carousel key={c.slug} id={c.slug} title={`${c.emoji} ${c.name}`}>
          {cards(c.products)}
        </Carousel>
      ))}
    </>
  )
}
