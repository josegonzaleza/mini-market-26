# MINI MARKET 26 · Tu barrio, tu lugar

Tienda en línea (React + Vite). Incluye banner informativo, slider principal y carruseles de productos. Los clientes arman su carrito, confirman el pedido
y este se envía por WhatsApp al súper. No hay pasarela de pago: se paga al recibir.

## Configuración

```bash
npm install
cp .env.example .env     # y escribe el WhatsApp del súper en VITE_WHATSAPP_NUMBER
npm run dev
```

El número va con código de país y sin símbolos (ej. `50688881234`).

## Dónde cambiar cosas

- Productos, precios y secciones: `src/data/products.js`
- Nombre, eslogan y opciones de entrega/pago: `src/constants/index.js`
- Colores: `src/styles/variables.css`
- Mensaje del pedido: `src/utils/order.js`

## Estructura

```
src/
├── components/   common · layout · products · cart
├── constants/    datos de la tienda y rutas
├── context/      carrito (estado global)
├── data/         catálogo de productos
├── pages/        Home · Checkout · NotFound
├── routes/       rutas
├── styles/       variables y estilos
└── utils/        formato de precios y armado del pedido
```

## Animaciones y mascota

- **GSAP**: entrada animada del slider, cascada de tarjetas en los carruseles, rebote del contador del carrito y toda la animación de la mascota.
- **React Bits** (`src/components/reactbits/`, copiados del repositorio oficial): `ClickSpark` (chispas al hacer clic), `AnimatedContent` (aparición al hacer scroll), `SpotlightCard` (luz que sigue al mouse en las secciones), `ShinyText`, `Magnet` (botón del carrito) y `StarBorder` (botón "Hacer pedido").
- **Mini, la mascota** (`src/components/mascot/`): sus ojos siguen el cursor, sonríe cuando el mouse se acerca, parpadea, saluda y celebra cuando se agrega un producto al carrito.

### Usar una mascota 3D de Spline (opcional)

1. En [spline.design](https://spline.design) crea o importa tu personaje y agrega eventos como *Look At* (mirar al cursor) o *Mouse Hover* (sonreír).
2. Exporta con **Export → Code → React** y copia la URL de la escena (`https://prod.spline.design/.../scene.splinecode`).
3. Pégala en `.env` como `VITE_SPLINE_SCENE=` y reinicia `npm run dev`. Si queda vacío, se usa la mascota SVG.
