import { Link } from 'react-router-dom'
import ItemImage from './ItemImage'
import ReferenceBadge from './ReferenceBadge'

function ItemCard({ item }) {
  const referenceDisplay = item.referenceNumber || item.id

  return (
    <article className="item-card">
      <ItemImage imageUrl={item.imageUrl} />
      <div className="item-card__body">
        <div className="item-card__header">
          <span className="item-type-badge">{item.type}</span>
          <h3 className="item-card__title">{item.name}</h3>
        </div>

        <div className="item-card__meta">
          <div>
            <strong>Reference No.</strong>
            <ReferenceBadge referenceNumber={referenceDisplay} />
          </div>
          <div>
            <strong>Category</strong>
            <span>{item.category}</span>
          </div>
          <div>
            <strong>Location</strong>
            <span>{item.location}</span>
          </div>
          <div>
            <strong>Date Reported</strong>
            <span>{item.dateReported}</span>
          </div>
        </div>

        <div className="item-card__footer">
          <span className="status-pill">{item.status}</span>
          <Link className="view-details" to={`/item/${item.id}`}>
            View details
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ItemCard;
