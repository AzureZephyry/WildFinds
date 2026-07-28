function ValidationMessage({ message }) {
  if (!message) {
    return null
  }

  return <p className="validation-message">{message}</p>
}

export default ValidationMessage
