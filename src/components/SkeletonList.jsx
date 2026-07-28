import './SkeletonList.css'
import SkeletonCard from './SkeletonCard'

function SkeletonList({ count = 4 }) {
  return (
    <div className="skeleton-list">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  )
}

export default SkeletonList
