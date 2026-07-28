import { useMemo } from 'react'
import { filterByTab, applyFilters } from '../utils/filterItems'
import { searchItems } from '../utils/searchItems'

export function useSearchAndFilter(items, { activeTab, searchQuery, filters }) {
  return useMemo(() => {
    const tabFiltered = filterByTab(items, activeTab)
    const searched = searchItems(tabFiltered, searchQuery)
    const filtered = applyFilters(searched, filters)
    return filtered
  }, [items, activeTab, searchQuery, filters])
}
