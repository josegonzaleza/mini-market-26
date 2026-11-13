const ITEMS = [
  ['🚚', 'Entrega a domicilio', 'O recoge en tienda cuando quieras'],
  ['💵', 'Pagas al recibir', 'Efectivo o SINPE Móvil'],
  ['📲', 'Pedido por WhatsApp', 'Confirmamos y preparamos tu compra'],
  ['🏘️', 'Compra de barrio', 'Cerca de ti, con trato cercano'],
]

export default function Benefits() {
  return (
    <ul className="benefits">
      {ITEMS.map(([emoji, title, text]) => (
        <li key={title}>
          <span className="benefits__icon" aria-hidden="true">{emoji}</span>
          <div><strong>{title}</strong><span>{text}</span></div>
        </li>
      ))}
    </ul>
  )
}
