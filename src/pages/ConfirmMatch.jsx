import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { items } from '../data/items'
import { showSuccess, showError } from '../utils/notifications.js'
import ItemSummary from '../components/ItemSummary'
import ErrorState from '../components/ErrorState'
import FormField from '../components/FormField'

function ConfirmMatch() {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = items.find(item => item.id === id)
  const [claimantName, setClaimantName] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [matchDetails, setMatchDetails] = useState('')

  if (!item) {
    return (
      <main className="page-layout">
        <section className="form-panel report-panel">
          <ErrorState
            title="Item unavailable"
            message="This match page may be invalid because the item was removed or the link is incorrect."
          />
        </section>
      </main>
    )
  }

  if (item.type !== 'Lost') {
    return (
      <main className="page-layout">
        <section className="form-panel report-panel">
          <div className="page-heading">
            <p className="eyebrow">Confirm</p>
            <h1>Invalid item type</h1>
            <p className="site-note">Only lost items may be confirmed here.</p>
          </div>
        </section>
      </main>
    )
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!claimantName || !contactInfo || !matchDetails) {
      showError('Please complete all fields before submitting your match request.')
      return
    }
    showSuccess('Match request submitted successfully')
    navigate('/')
  }

  return (
    <main className="page-layout">
      <section className="form-panel report-panel">
        <div className="page-heading">
          <p className="eyebrow">Confirm</p>
          <h1>Match this lost item</h1>
          <p className="site-note">Provide details to confirm this item is your lost property.</p>
        </div>

        <ItemSummary item={item} />

        <form className="report-form" onSubmit={handleSubmit}>
          <FormField label="Your name" htmlFor="claimantName">
            <input
              id="claimantName"
              type="text"
              value={claimantName}
              onChange={e => setClaimantName(e.target.value)}
              required
            />
          </FormField>

          <FormField label="Contact information" htmlFor="contactInfo">
            <input
              id="contactInfo"
              type="text"
              value={contactInfo}
              onChange={e => setContactInfo(e.target.value)}
              required
            />
          </FormField>

          <FormField label="Explanation of why this matches" htmlFor="matchDetails">
            <textarea
              id="matchDetails"
              value={matchDetails}
              onChange={e => setMatchDetails(e.target.value)}
              required
            />
          </FormField>

          <button type="submit" className="primary-button">
            Submit match confirmation
          </button>
        </form>
      </section>
    </main>
  )
}

export default ConfirmMatch;
