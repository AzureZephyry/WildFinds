import { Link, useParams } from 'react-router-dom'
import { items } from '../data/items'
import ItemSummary from '../components/ItemSummary'
import ErrorState from '../components/ErrorState'

function ItemDetails() {
  const { id } = useParams()
  const item = items.find(item => item.id === id)

  if (!item) {
    return (
      <main className="page-layout">
        <section className="form-panel item-details-panel">
          <ErrorState
            title="Item unavailable"
            message="This item may have been removed or the link may be invalid."
          />
        </section>
      </main>
    )
  }

  const referenceDisplay = item.referenceNumber || item.id
  const actionLabel = item.type === 'Found' ? 'Claim this item' : 'Report if this matches your lost item'
  const actionPath = item.type === 'Found' ? `/claim/${item.id}` : `/match/${item.id}`

  return (
    <main className="page-layout">
      <section className="form-panel item-details-panel">
        <div className="page-heading">
          <p className="eyebrow">Item details</p>
          <h1>{item.name}</h1>
          <span className="detail-badge">{item.type}</span>
          <p className="site-note">
            Review the full item details below and use the navigation menu to return to other pages.
          </p>
        </div>

        <ItemSummary item={item} />

        <div className="detail-action">
          <Link to={actionPath} className="primary-button item-action-button">
            {actionLabel}
          </Link>
          <Link to="/" className="secondary-link">
            Back to items
          </Link>
        </div>
      </section>
    </main>
  )
}

export default ItemDetails;
