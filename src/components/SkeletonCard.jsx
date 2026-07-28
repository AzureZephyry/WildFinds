import './SkeletonCard.css'

function SkeletonCard() {
  return (
    <article className="skeleton-card">
      <div className="skeleton-card__image" />
      <div className="skeleton-card__body">
        <div className="skeleton-card__title" />
        <div className="skeleton-card__meta">
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
        </div>
        <div className="skeleton-card__footer">
          <div className="skeleton-pill" />
          <div className="skeleton-button" />
        </div>
      </div>
    </article>
  )
}

export default SkeletonCard
