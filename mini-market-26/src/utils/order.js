import { DELIVERY } from '@/constants'
import { formatCRC } from './formatters'

export const createOrderId = () =>
  `MM26-${Date.now().toString(36).toUpperCase().slice(-6)}`

export function buildOrderMessage({ orderId, customer, items, total }) {
  const lines = items.map(
    ({ product, qty }) =>
      `• ${qty} x ${product.name} (${product.unit}) = ${formatCRC(product.price * qty)}`,
  )
  const isHome = customer.delivery === DELIVERY.HOME

  return [
    `🛒 *NUEVO PEDIDO ${orderId}*`,
    '',
    ...lines,
    '',
    `*Total: ${formatCRC(total)}*`,
    '',
    `👤 Cliente: ${customer.name}`,
    `📞 Teléfono: ${customer.phone}`,
    `🚚 Entrega: ${customer.delivery}`,
    isHome ? `📍 Dirección: ${customer.address}` : null,
    `💵 Pago al recibir: ${customer.payment}`,
    customer.notes ? `📝 Notas: ${customer.notes}` : null,
  ]
    .filter((line) => line !== null)
    .join('\n')
}

export const whatsappLink = (number, message) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`
