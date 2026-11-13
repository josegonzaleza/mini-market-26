import SpotlightCard from '@/components/reactbits/SpotlightCard'
import { CATEGORIES } from '@/data/products'

export default function CategoryTiles() {
  return (
    <section className="block" aria-label="Compra por sección">
      <div className="block__head"><h2>Compra por sección</h2></div>
      <div className="tiles">
        {CATEGORIES.map((c) => (
          <SpotlightCard key={c.slug} theme="light" spotlightColor="#ffc72c" intensity={0.5} spotlightSize={190} style={{ padding: 0, borderRadius: 14 }}>
            <a href={`#${c.slug}`} className="tile">
              <span className="tile__icon" style={{ background: c.tone }} aria-hidden="true">{c.emoji}</span>
              {c.name}
            </a>
          </SpotlightCard>
        ))}
      </div>
    </section>
  )
}
