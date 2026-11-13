export const STORE = {
  name: 'MINI MARKET 26',
  slogan: 'Tu barrio, tu lugar',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER ?? '50688888888',
}

export const ROUTES = { HOME: '/', CHECKOUT: '/pedido' }

export const DELIVERY = { PICKUP: 'Recoger en tienda', HOME: 'Entrega a domicilio' }
export const PAYMENTS = ['Efectivo', 'SINPE Móvil']

export const ANNOUNCEMENTS = [
  '🚚 Entrega a domicilio en tu barrio',
  '💵 Paga al recibir: efectivo o SINPE Móvil',
  '⭐ Tu barrio, tu lugar',
  '📲 Recibimos tu pedido por WhatsApp y lo preparamos para ti',
  '🛒 Más de 50 productos en 9 secciones',
]
