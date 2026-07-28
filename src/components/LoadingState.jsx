import './LoadingState.css'

function LoadingState({ message }) {
  return (
    <section className="loading-state">
      <div className="loading-state__spinner" aria-hidden="true" />
      <p className="loading-state__message">{message}</p>
    </section>
  )
}

export default LoadingState
