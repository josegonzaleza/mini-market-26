// Edita este archivo para cambiar productos, precios (en colones) y secciones.
const p = (name, unit, price, emoji) => ({ name, unit, price, emoji })
// Porcentaje de descuento por producto (aparece en "Ofertas de la semana")
const OFFERS = {
  'abarrotes-1': 12, 'abarrotes-5': 15, 'lacteos-1': 10, 'lacteos-2': 8, 'carnes-1': 12,
  'bebidas-2': 20, 'hogar-1': 15, 'snacks-1': 18, 'frutas-verduras-2': 10, 'panaderia-1': 10,
}
const TONES = {
  'frutas-verduras': '#e3f3d3', carnes: '#fde1de', lacteos: '#e1edfb', panaderia: '#fde9cc',
  abarrotes: '#fff1bd', bebidas: '#d9f1f4', snacks: '#f5e1f2', hogar: '#e2e7f7', 'cuidado-personal': '#e6efdf',
}

const section = (slug, name, emoji, items) => ({
  slug,
  name,
  emoji,
  tone: TONES[slug],
  products: items.map((item, i) => {
    const id = `${slug}-${i + 1}`
    const discount = OFFERS[id]
    const oldPrice = discount && Math.round(item.price / (1 - discount / 100) / 50) * 50
    return { ...item, id, category: slug, tone: TONES[slug], ...(discount && { discount, oldPrice }) }
  }),
})

export const CATEGORIES = [
  section('frutas-verduras', 'Frutas y verduras', '🥬', [
    p('Banano', 'kg', 890, '🍌'),
    p('Piña', 'unidad', 1500, '🍍'),
    p('Tomate', 'kg', 1300, '🍅'),
    p('Cebolla', 'kg', 1100, '🧅'),
    p('Papa', 'kg', 1200, '🥔'),
    p('Aguacate', 'unidad', 600, '🥑'),
    p('Plátano maduro', 'kg', 950, '🍌'),
    p('Chayote', 'unidad', 450, '🥒'),
  ]),
  section('carnes', 'Carnes y embutidos', '🥩', [
    p('Pechuga de pollo', 'kg', 4200, '🍗'),
    p('Carne molida', 'kg', 5300, '🥩'),
    p('Chuleta de cerdo', 'kg', 4100, '🥓'),
    p('Salchichón', '500 g', 2400, '🌭'),
    p('Jamón', '400 g', 2900, '🍖'),
    p('Pescado filet', 'kg', 6500, '🐟'),
  ]),
  section('lacteos', 'Lácteos y huevos', '🥛', [
    p('Leche entera', '1 L', 1050, '🥛'),
    p('Huevos', 'cartón 30', 4300, '🥚'),
    p('Queso turrialba', '500 g', 3200, '🧀'),
    p('Natilla', '400 g', 1350, '🥣'),
    p('Mantequilla', '250 g', 1900, '🧈'),
    p('Yogurt natural', '1 L', 1700, '🍶'),
  ]),
  section('panaderia', 'Panadería', '🍞', [
    p('Pan molde', 'bolsa', 1800, '🍞'),
    p('Pan baguette', 'unidad', 700, '🥖'),
    p('Tortillas de maíz', 'paquete', 1100, '🫓'),
    p('Queque vainilla', 'unidad', 1600, '🍰'),
    p('Galletas dulces', 'paquete', 950, '🍪'),
  ]),
  section('abarrotes', 'Abarrotes', '🍚', [
    p('Arroz', '1,8 kg', 2200, '🍚'),
    p('Frijoles', '800 g', 1500, '🫘'),
    p('Azúcar', '2 kg', 2100, '🧂'),
    p('Aceite vegetal', '1 L', 2300, '🫒'),
    p('Café molido', '500 g', 4200, '☕'),
    p('Salsa Lizano', '700 ml', 2600, '🥫'),
    p('Atún en lata', 'unidad', 1250, '🐟'),
    p('Pasta espagueti', '400 g', 950, '🍝'),
  ]),
  section('bebidas', 'Bebidas', '🥤', [
    p('Agua embotellada', '600 ml', 650, '💧'),
    p('Gaseosa', '2,5 L', 1700, '🥤'),
    p('Jugo de naranja', '1 L', 1500, '🧃'),
    p('Cerveza', 'lata', 900, '🍺'),
    p('Bebida energética', 'lata', 1300, '⚡'),
    p('Té frío', '500 ml', 950, '🍵'),
  ]),
  section('snacks', 'Snacks y dulces', '🍫', [
    p('Papas fritas', 'bolsa', 1300, '🍟'),
    p('Chocolate', 'barra', 1100, '🍫'),
    p('Maní salado', 'bolsa', 800, '🥜'),
    p('Churros', 'bolsa', 700, '🌽'),
    p('Helado', '1 L', 3400, '🍨'),
  ]),
  section('hogar', 'Limpieza y hogar', '🧼', [
    p('Detergente en polvo', '1 kg', 2800, '🧺'),
    p('Cloro', '1 L', 1100, '🧴'),
    p('Jabón de platos', '750 ml', 1600, '🫧'),
    p('Papel higiénico', '12 rollos', 3900, '🧻'),
    p('Bolsas de basura', '30 unidades', 1700, '🗑️'),
  ]),
  section('cuidado-personal', 'Cuidado personal', '🧴', [
    p('Jabón de baño', 'unidad', 650, '🧼'),
    p('Champú', '400 ml', 2900, '🧴'),
    p('Pasta dental', '100 ml', 1600, '🪥'),
    p('Desodorante', 'unidad', 2400, '🧴'),
    p('Toallas sanitarias', 'paquete', 1900, '🩹'),
  ]),
]

export const PRODUCTS = CATEGORIES.flatMap((c) => c.products)
export const PRODUCTS_BY_ID = Object.fromEntries(PRODUCTS.map((x) => [x.id, x]))

export const OFFER_PRODUCTS = PRODUCTS.filter((x) => x.discount)
export const BEST_SELLERS = [
  'abarrotes-1', 'lacteos-1', 'frutas-verduras-1', 'abarrotes-5', 'panaderia-1',
  'lacteos-2', 'bebidas-1', 'abarrotes-4', 'carnes-1', 'snacks-2',
].map((id) => PRODUCTS_BY_ID[id])
