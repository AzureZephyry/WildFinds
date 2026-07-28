import { createContext, useContext, useMemo, useState } from 'react'
import { items as initialItems } from '../data/items'

const ItemsContext = createContext(null)

export function ItemsProvider({ children }) {
  const [items, setItems] = useState(initialItems)

  const addItem = item => {
    setItems(prevItems => [...prevItems, item])
  }

  const categories = useMemo(
    () => Array.from(new Set(items.map(item => item.category).filter(Boolean))).sort(),
    [items]
  )

  const statuses = useMemo(
    () => Array.from(new Set(items.map(item => item.status).filter(Boolean))).sort(),
    [items]
  )

  const buildings = useMemo(
    () => Array.from(new Set(items.map(item => item.building).filter(Boolean))).sort(),
    [items]
  )

  return (
    <ItemsContext.Provider value={{ items, addItem, categories, statuses, buildings }}>
      {children}
    </ItemsContext.Provider>
  )
}

export function useItems() {
  const context = useContext(ItemsContext)
  if (!context) {
    throw new Error('useItems must be used within ItemsProvider')
  }
  return context
}
