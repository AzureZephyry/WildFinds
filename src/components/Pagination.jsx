function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null
  }

  const pageButtons = [...Array(totalPages)].map((_, index) => {
    const page = index + 1
    return (
      <button
        key={page}
        type="button"
        className={page === currentPage ? 'active' : ''}
        disabled={page === currentPage}
        onClick={() => onPageChange(page)}
      >
        {page}
      </button>
    )
  })

  return (
    <nav className="pagination" aria-label="Pagination">
      {pageButtons}
      {currentPage < totalPages && (
        <button type="button" onClick={() => onPageChange(currentPage + 1)}>
          Next
        </button>
      )}
    </nav>
  )
}

export default Pagination;
