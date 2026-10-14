import { ANNOUNCEMENTS } from '@/constants'

// Banner informativo: los avisos se desplazan continuamente (se pausa al pasar el mouse).
export default function TopBar() {
  return (
    <div className="topbar" role="region" aria-label="Avisos de la tienda">
      <div className="topbar__track">
        {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map((text, i) => (
          <span key={i} aria-hidden={i >= ANNOUNCEMENTS.length}>{text}</span>
        ))}
      </div>
    </div>
  )
}
