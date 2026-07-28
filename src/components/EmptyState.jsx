import './EmptyState.css'

function EmptyState({ title, message, actionText, actionCallback }) {
  return (
    <section className="empty-state-card">
      <div className="empty-state-content">
        <p className="empty-state-eyebrow">No results</p>
        <h2 className="empty-state-title">{title}</h2>
        <p className="empty-state-message">{message}</p>
        {actionText && actionCallback && (
          <button type="button" className="primary-button" onClick={actionCallback}>
            {actionText}
          </button>
        )}
      </div>
    </section>
  )
}

export default EmptyState
