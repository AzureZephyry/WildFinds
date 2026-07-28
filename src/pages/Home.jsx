import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import Tabs from '../components/Tabs'
import ItemCard from '../components/ItemCard'
import Pagination from '../components/Pagination'
import FilterBar from '../components/FilterBar'
import EmptyState from '../components/EmptyState'
import SkeletonList from '../components/SkeletonList'
import { useItems } from '../context/ItemsContext.jsx'
import { useSearchAndFilter } from '../hooks/useSearchAndFilter.js'

const ITEMS_PER_PAGE = 10

function Home() {
  const { items, categories, statuses, buildings } = useItems()
  const [activeTab, setActiveTab] = useState('lost')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    building: '',
    date: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const filteredItems = useSearchAndFilter(items, {
    activeTab,
    searchQuery,
    filters,
  })

  const activeItems = filteredItems.filter(item => item.type.toLowerCase() === activeTab)

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE))
  const currentPageItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1)
    }
  }, [currentPage, totalPages])

  const handleTabChange = tab => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  const handleSearchChange = value => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }))
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setFilters({ category: '', status: '', building: '', date: '' })
    setCurrentPage(1)
  }

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  return (
    <section>
      <section className="top-panel">
        <SearchBar value={searchQuery} onSearchChange={handleSearchChange} />
        <div className="report-section">
          <Link to="/report/lost" className="report-button">
            + Report Lost Item
          </Link>
        </div>
      </section>

      <FilterBar
        filters={filters}
        categories={categories}
        statuses={statuses}
        buildings={buildings}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <section className="content-panel">
        <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
        <div className="tab-content" aria-live="polite">
          {isLoading ? (
            <SkeletonList />
          ) : currentPageItems.length === 0 ? (
            <EmptyState
              title={searchQuery ? 'No items found' : activeTab === 'lost' ? 'No lost items reported yet' : 'No found items available'}
              message={
                searchQuery
                  ? "We couldn't find any items matching your search. Try different keywords or adjust your filters."
                  : activeTab === 'lost'
                  ? 'There are currently no lost item reports available.'
                  : 'No found items have been submitted yet.'
              }
              actionText="Clear filters"
              actionCallback={handleClearFilters}
            />
          ) : (
            currentPageItems.map(item => <ItemCard key={item.id} item={item} />)
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </section>
  )
}

export default Home;
