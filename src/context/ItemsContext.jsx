import { createContext, useContext, useMemo, useState } from 'react'
import { items as initialItems } from '../data/items'

const ItemsContext = createContext(null)

export function ItemsProvider({ children }) {
  const [rawItems, setRawItems] = useState(initialItems)

  // Ensure newly added items appear immediately at the top.
  // If the backend provides `createdAt`, it will be used for sorting.
  const addItem = item => {
    const newItem = {
      ...item,
      // assign createdAt on the client if not provided so the item sorts to top immediately
      createdAt: item.createdAt || new Date().toISOString(),
    }
    setRawItems(prevItems => [newItem, ...prevItems])
  }

  // Compute a stable, descending sort (newest first) using available timestamps.
  const items = useMemo(() => {
    // attach original index to preserve stable ordering
    return rawItems
      .map((it, idx) => ({ it, idx }))
      .sort((a, b) => {
        const A = a.it
        const B = b.it

        const parseTime = obj => {
          if (obj.createdAt) return Date.parse(obj.createdAt)
          if (obj.dateReported) {
            // combine dateReported and timeReported when available
            const time = obj.timeReported || '00:00'
            const iso = `${obj.dateReported}T${time}`
            const t = Date.parse(iso)
            if (!Number.isNaN(t)) return t
          }
          return NaN
        }

        const tA = parseTime(A)
        const tB = parseTime(B)

        if (!Number.isNaN(tA) && !Number.isNaN(tB)) {
          return tB - tA
        }

        // Fallback to referenceNumber if available (string compare)
        if (A.referenceNumber && B.referenceNumber) {
          if (A.referenceNumber > B.referenceNumber) return -1
          if (A.referenceNumber < B.referenceNumber) return 1
        }

        // final fallback: preserve insertion order (newer items were prepended)
        return a.idx - b.idx
      })
      .map(x => x.it)
  }, [rawItems])

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
