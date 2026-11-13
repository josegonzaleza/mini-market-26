export default function QtyStepper({ qty, name, onChange }) {
  return (
    <div className="stepper" role="group" aria-label={`Cantidad de ${name}`}>
      <button type="button" onClick={() => onChange(qty - 1)} aria-label={`Quitar uno de ${name}`}>
        −
      </button>
      <span aria-live="polite">{qty}</span>
      <button type="button" onClick={() => onChange(qty + 1)} aria-label={`Agregar uno de ${name}`}>
        +
      </button>
    </div>
  )
}
