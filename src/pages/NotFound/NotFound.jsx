import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants'

export default function NotFound() {
  return (
    <section className="panel panel--center">
      <h1>Página no encontrada</h1>
      <p className="muted">La dirección que buscas no existe.</p>
      <Link to={ROUTES.HOME} className="btn btn--primary">Volver al inicio</Link>
    </section>
  )
}
