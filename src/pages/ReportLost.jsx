import { useNavigate } from 'react-router-dom'
import { useItems } from '../context/ItemsContext.jsx'
import { showSuccess } from '../utils/notifications.js'
import ReportForm from '../components/ReportForm'

function ReportLost() {
  const navigate = useNavigate()
  const { addItem } = useItems()

  const handleSubmit = item => {
    addItem(item)
    showSuccess(`Lost item report created for ${item.name}`)
    navigate('/')
  }

  return (
    <main className="page-layout">
      <section className="form-panel report-panel">
        <div className="page-heading">
          <p className="eyebrow">Report</p>
          <h1>Report a lost item</h1>
          <p className="site-note">
            Provide details below and submit the report. You will return to the homepage afterward.
          </p>
        </div>

        <ReportForm reportType="lost" onSubmit={handleSubmit} />
      </section>
    </main>
  )
}

export default ReportLost;
