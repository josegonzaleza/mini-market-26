import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '@/context/cartContext'
import { DELIVERY, PAYMENTS, ROUTES, STORE } from '@/constants'
import { formatCRC } from '@/utils/formatters'
import { buildOrderMessage, createOrderId, whatsappLink } from '@/utils/order'

const EMPTY = { name: '', phone: '', delivery: DELIVERY.PICKUP, address: '', payment: PAYMENTS[0], notes: '' }

export default function Checkout() {
  const { items, total, clear } = useCart()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(null) // { orderId, link }

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const err = {}
    if (form.name.trim().length < 3) err.name = 'Escribe tu nombre completo.'
    if (form.phone.replace(/\D/g, '').length < 8) err.phone = 'Escribe un teléfono de 8 dígitos.'
    if (form.delivery === DELIVERY.HOME && form.address.trim().length < 8)
      err.address = 'Indica una dirección con señas claras.'
    return err
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length) return

    const orderId = createOrderId()
    const message = buildOrderMessage({ orderId, customer: form, items, total })
    const link = whatsappLink(STORE.whatsapp, message)
    window.open(link, '_blank', 'noopener')
    setSent({ orderId, link })
    clear()
  }

  if (sent) {
    return (
      <section className="panel panel--center">
        <h1>¡Pedido confirmado! ✅</h1>
        <p>Tu número de pedido es <strong>{sent.orderId}</strong>.</p>
        <p className="muted">
          Se abrió WhatsApp con tu pedido listo. Presiona <strong>Enviar</strong> para que
          {' '}{STORE.name} lo reciba y comience a prepararlo.
        </p>
        <a className="btn btn--primary btn--lg" href={sent.link} target="_blank" rel="noopener noreferrer">
          Abrir WhatsApp de nuevo
        </a>
        <Link to={ROUTES.HOME} className="btn btn--ghost">Volver al inicio</Link>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="panel panel--center">
        <h1>Tu carrito está vacío</h1>
        <p className="muted">Agrega productos para poder hacer tu pedido.</p>
        <Link to={ROUTES.HOME} className="btn btn--primary">Ir a comprar</Link>
      </section>
    )
  }

  const isHome = form.delivery === DELIVERY.HOME

  return (
    <div className="checkout">
      <form className="panel" onSubmit={onSubmit} noValidate>
        <h1>Confirmar pedido</h1>

        <label className="field">
          <span>Nombre completo</span>
          <input value={form.name} onChange={set('name')} autoComplete="name" />
          {errors.name && <em className="error">{errors.name}</em>}
        </label>

        <label className="field">
          <span>Teléfono</span>
          <input value={form.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" />
          {errors.phone && <em className="error">{errors.phone}</em>}
        </label>

        <label className="field">
          <span>¿Cómo quieres recibir tu pedido?</span>
          <select value={form.delivery} onChange={set('delivery')}>
            {Object.values(DELIVERY).map((d) => <option key={d}>{d}</option>)}
          </select>
        </label>

        {isHome && (
          <label className="field">
            <span>Dirección de entrega</span>
            <textarea rows="2" value={form.address} onChange={set('address')} />
            {errors.address && <em className="error">{errors.address}</em>}
          </label>
        )}

        <label className="field">
          <span>Forma de pago (al recibir)</span>
          <select value={form.payment} onChange={set('payment')}>
            {PAYMENTS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>

        <label className="field">
          <span>Notas del pedido (opcional)</span>
          <textarea rows="2" value={form.notes} onChange={set('notes')} />
        </label>

        <button type="submit" className="btn btn--primary btn--lg">Confirmar pedido</button>
        <p className="muted small">No se cobra nada en línea: pagas al recibir tu pedido.</p>
      </form>

      <aside className="panel summary">
        <h2>Resumen</h2>
        <ul>
          {items.map(({ product, qty }) => (
            <li key={product.id}>
              <span>{qty} × {product.name}</span>
              <span>{formatCRC(product.price * qty)}</span>
            </li>
          ))}
        </ul>
        <p className="total"><span>Total</span><strong>{formatCRC(total)}</strong></p>
      </aside>
    </div>
  )
}
