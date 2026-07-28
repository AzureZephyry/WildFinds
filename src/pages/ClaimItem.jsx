import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { items } from '../data/items'
import { showSuccess, showError } from '../utils/notifications.js'
import ItemSummary from '../components/ItemSummary'
import ErrorState from '../components/ErrorState'
import FormField from '../components/FormField'

function ClaimItem() {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = items.find(item => item.id === id)
  const [claimantName, setClaimantName] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [proofDetails, setProofDetails] = useState('')

  if (!item) {
    return (
      <main className="page-layout">
        <section className="form-panel report-panel">
          <ErrorState
            title="Item unavailable"
            message="This claim page may be invalid because the item was removed or the link is incorrect."
          />
        </section>
      </main>
    )
  }

  if (item.type !== 'Found') {
    return (
      <main className="page-layout">
        <section className="form-panel report-panel">
          <div className="page-heading">
            <p className="eyebrow">Claim</p>
            <h1>Invalid item type</h1>
            <p className="site-note">Only found items may be claimed here.</p>
          </div>
        </section>
      </main>
    )
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!claimantName || !contactInfo || !proofDetails) {
      showError('Please complete all fields before submitting your claim.')
      return
    }
    showSuccess('Claim request submitted successfully')
    navigate('/')
  }

  return (
    <main className="page-layout">
      <section className="form-panel report-panel">
        <div className="page-heading">
          <p className="eyebrow">Claim</p>
          <h1>Claim this item</h1>
          <p className="site-note">Provide your details to claim the found item.</p>
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

          <FormField label="Proof / identifying details" htmlFor="proofDetails">
            <textarea
              id="proofDetails"
              value={proofDetails}
              onChange={e => setProofDetails(e.target.value)}
              required
            />
          </FormField>

          <button type="submit" className="primary-button">
            Submit claim
          </button>
        </form>
      </section>
    </main>
  )
}

export default ClaimItem;
