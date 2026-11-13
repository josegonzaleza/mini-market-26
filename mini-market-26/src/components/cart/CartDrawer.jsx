import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '@/context/cartContext'
import { ROUTES } from '@/constants'
import { formatCRC } from '@/utils/formatters'
import StarBorder from '@/components/reactbits/StarBorder'
import QtyStepper from '@/components/common/QtyStepper'

export default function CartDrawer() {
  const { isOpen, closeCart, items, total, setQty } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => e.key === 'Escape' && closeCart()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeCart])

  if (!isOpen) return null

  const goCheckout = () => {
    closeCart()
    navigate(ROUTES.CHECKOUT)
  }

  return (
    <div className="drawer" role="dialog" aria-modal="true" aria-label="Carrito de compras">
      <div className="drawer__overlay" onClick={closeCart} />
      <aside className="drawer__panel">
        <div className="drawer__head">
          <h2>Mi carrito</h2>
          <button type="button" className="btn btn--ghost" onClick={closeCart}>
            Cerrar
          </button>
        </div>

        {items.length === 0 ? (
          <p className="muted drawer__empty">
            Tu carrito está vacío. Agrega productos desde las secciones del súper.
          </p>
        ) : (
          <>
            <ul className="drawer__list">
              {items.map(({ product, qty }) => (
                <li key={product.id} className="line">
                  <span className="line__emoji" aria-hidden="true">{product.emoji}</span>
                  <div className="line__info">
                    <strong>{product.name}</strong>
                    <span className="muted">{product.unit} · {formatCRC(product.price)}</span>
                  </div>
                  <QtyStepper qty={qty} name={product.name} onChange={(n) => setQty(product.id, n)} />
                </li>
              ))}
            </ul>
            <div className="drawer__foot">
              <p className="total"><span>Total</span><strong>{formatCRC(total)}</strong></p>
              <StarBorder as="button" type="button" className="star-cta" color="#ffc72c" backgroundColor="#0b2a5b" borderColor="#0b2a5b" textColor="#ffffff" speed="5s" onClick={goCheckout}>
                Hacer pedido
              </StarBorder>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
