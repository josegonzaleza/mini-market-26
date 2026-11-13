import { useEffect, useMemo, useReducer, useState } from 'react'
import { CartContext } from './cartContext'
import { PRODUCTS_BY_ID } from '@/data/products'
import { getItem, setItem } from '@/utils/storage'

// Estado del carrito: { [productId]: cantidad }
function reducer(state, action) {
  switch (action.type) {
    case 'set': {
      const next = { ...state }
      if (action.qty <= 0) delete next[action.id]
      else next[action.id] = action.qty
      return next
    }
    case 'clear':
      return {}
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, null, () => getItem('cart', {}))
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => setItem('cart', cart), [cart])

  const value = useMemo(() => {
    const items = Object.entries(cart)
      .filter(([id]) => PRODUCTS_BY_ID[id])
      .map(([id, qty]) => ({ product: PRODUCTS_BY_ID[id], qty }))
    return {
      items,
      count: items.reduce((sum, i) => sum + i.qty, 0),
      total: items.reduce((sum, i) => sum + i.qty * i.product.price, 0),
      qtyOf: (id) => cart[id] ?? 0,
      setQty: (id, qty) => dispatch({ type: 'set', id, qty }),
      clear: () => dispatch({ type: 'clear' }),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }
  }, [cart, isOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
