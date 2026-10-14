import { useCart } from '@/context/cartContext'
import { formatCRC } from '@/utils/formatters'
import QtyStepper from '@/components/common/QtyStepper'

export default function ProductCard({ product }) {
  const { qtyOf, setQty } = useCart()
  const qty = qtyOf(product.id)

  return (
    <article className="card">
      <div className="card__img" style={{ background: product.tone }} aria-hidden="true">
        {product.discount && <span className="card__badge">-{product.discount}%</span>}
        {product.emoji}
      </div>
      <h3 className="card__name">{product.name}</h3>
      <p className="card__unit">{product.unit}</p>
      <p className="card__price">
        {formatCRC(product.price)}
        {product.oldPrice && <s>{formatCRC(product.oldPrice)}</s>}
      </p>
      {qty === 0 ? (
        <button type="button" className="btn btn--primary" onClick={() => setQty(product.id, 1)}>
          Agregar
        </button>
      ) : (
        <QtyStepper qty={qty} name={product.name} onChange={(n) => setQty(product.id, n)} />
      )}
    </article>
  )
}
