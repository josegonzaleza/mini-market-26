import Spline from '@splinetool/react-spline'

// Mascota 3D hecha en Spline. Los movimientos (mirar al cursor, sonreír) se
// configuran en el editor de Spline con eventos "Mouse Hover" / "Look At".
export default function SplineMascot({ scene }) {
  return <Spline scene={scene} />
}
