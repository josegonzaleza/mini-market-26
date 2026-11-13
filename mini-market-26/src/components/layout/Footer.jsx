import { CATEGORIES } from '@/data/products'
import { STORE } from '@/constants'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <p className="footer__brand">MINI MARKET <span>26</span></p>
          <p>{STORE.slogan}. Tu súper de confianza, ahora también en línea.</p>
        </div>
        <div>
          <h4>Secciones</h4>
          <ul>{CATEGORIES.slice(0, 6).map((c) => <li key={c.slug}><a href={`/#${c.slug}`}>{c.name}</a></li>)}</ul>
        </div>
        <div>
          <h4>Cómo comprar</h4>
          <ul>
            <li>1. Agrega productos al carrito</li>
            <li>2. Confirma tus datos</li>
            <li>3. Envía el pedido por WhatsApp</li>
            <li>4. Paga al recibirlo</li>
          </ul>
        </div>
        <div>
          <h4>Contacto</h4>
          <ul>
            <li>WhatsApp: +{STORE.whatsapp}</li>
            <li>Pagos: efectivo o SINPE Móvil</li>
          </ul>
        </div>
      </div>
      <p className="footer__legal">© {new Date().getFullYear()} {STORE.name}. Todos los derechos reservados.</p>
    </footer>
  )
}
