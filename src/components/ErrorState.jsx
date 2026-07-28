import { Link } from 'react-router-dom'
import './ErrorState.css'

function ErrorState({ title, message, actionText = 'Return to items', actionUrl = '/' }) {
  return (
    <section className="error-state-card">
      <div className="error-state-content">
        <p className="error-state-eyebrow">Item unavailable</p>
        <h2 className="error-state-title">{title}</h2>
        <p className="error-state-message">{message}</p>
        <Link to={actionUrl} className="secondary-link">
          {actionText}
        </Link>
      </div>
    </section>
  )
}

export default ErrorState
