import { useState } from 'react'
import FormField from './FormField'
import ImageUploader from './ImageUploader'
import ValidationMessage from './ValidationMessage'
import { BUILDING_OPTIONS } from '../data/buildingOptions'
import { getItemCategories, createReportSubmission } from '../utils/reportUtils'
import { validateReport } from '../utils/validation'

const INITIAL_STATE = {
  itemName: '',
  category: 'ID / Access',
  location: '',
  building: '',
  dateReported: new Date().toISOString().split('T')[0],
  timeReported: new Date().toISOString().slice(11, 16),
  brand: '',
  color: '',
  identifyingMarks: '',
  description: '',
  contactNumber: '',
  email: '',
  imageFile: null,
  imagePreviewUrl: '',
}

function ReportForm({ reportType, onSubmit }) {
  const [values, setValues] = useState(INITIAL_STATE)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSubmitTime, setLastSubmitTime] = useState(0)

  const setField = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleImageChange = file => {
    setField('imageFile', file)
    if (!file) {
      setField('imagePreviewUrl', '')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setField('imagePreviewUrl', String(reader.result || ''))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = event => {
    event.preventDefault()

    if (Date.now() - lastSubmitTime < 1200) {
      return
    }

    const validationErrors = validateReport(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    const payload = createReportSubmission(reportType, {
      ...values,
      imageUrl: values.imagePreviewUrl,
    })

    onSubmit(payload)
    setLastSubmitTime(Date.now())
    setIsSubmitting(false)
    setValues(INITIAL_STATE)
  }

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <FormField label="Item name" htmlFor="itemName">
          <input
            id="itemName"
            type="text"
            value={values.itemName}
            onChange={e => setField('itemName', e.target.value)}
            placeholder="e.g. Student ID card"
            maxLength={80}
            required
          />
          <ValidationMessage message={errors.itemName} />
        </FormField>

        <FormField label="Category" htmlFor="category">
          <select
            id="category"
            value={values.category}
            onChange={e => setField('category', e.target.value)}
            required
          >
            {getItemCategories().map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ValidationMessage message={errors.category} />
        </FormField>

        <FormField label="Location" htmlFor="location">
          <input
            id="location"
            type="text"
            value={values.location}
            onChange={e => setField('location', e.target.value)}
            placeholder="e.g. Main Library"
            maxLength={80}
            required
          />
          <ValidationMessage message={errors.location} />
        </FormField>

        <FormField label="Building" htmlFor="building">
          <select
            id="building"
            value={values.building}
            onChange={e => setField('building', e.target.value)}
            required
          >
            <option value="">Select a building</option>
            {BUILDING_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ValidationMessage message={errors.building} />
        </FormField>

        <FormField label="Date" htmlFor="dateReported">
          <input
            id="dateReported"
            type="date"
            value={values.dateReported}
            onChange={e => setField('dateReported', e.target.value)}
            required
          />
          <ValidationMessage message={errors.dateReported} />
        </FormField>

        <FormField label="Time" htmlFor="timeReported">
          <input
            id="timeReported"
            type="time"
            value={values.timeReported}
            onChange={e => setField('timeReported', e.target.value)}
            required
          />
          <ValidationMessage message={errors.timeReported} />
        </FormField>

        <FormField label="Brand" htmlFor="brand">
          <input
            id="brand"
            type="text"
            value={values.brand}
            onChange={e => setField('brand', e.target.value)}
            placeholder="e.g. Samsung"
            maxLength={40}
            required
          />
          <ValidationMessage message={errors.brand} />
        </FormField>

        <FormField label="Color" htmlFor="color">
          <input
            id="color"
            type="text"
            value={values.color}
            onChange={e => setField('color', e.target.value)}
            placeholder="e.g. Black"
            maxLength={30}
            required
          />
          <ValidationMessage message={errors.color} />
        </FormField>

        <FormField label="Identifying marks" htmlFor="identifyingMarks">
          <textarea
            id="identifyingMarks"
            value={values.identifyingMarks}
            onChange={e => setField('identifyingMarks', e.target.value)}
            placeholder="Describe scratches, labels, or engravings"
            maxLength={120}
          />
          <ValidationMessage message={errors.identifyingMarks} />
        </FormField>

        <FormField label="Description" htmlFor="description">
          <textarea
            id="description"
            value={values.description}
            onChange={e => setField('description', e.target.value)}
            placeholder="Add any extra information"
            maxLength={280}
          />
          <ValidationMessage message={errors.description} />
        </FormField>
      </div>

      <div className="form-grid form-grid--wide">
        <FormField label="Contact number" htmlFor="contactNumber">
          <input
            id="contactNumber"
            type="tel"
            value={values.contactNumber}
            onChange={e => setField('contactNumber', e.target.value)}
            placeholder="e.g. +1234567890"
            required
          />
          <ValidationMessage message={errors.contactNumber} />
        </FormField>

        <FormField label="Email" htmlFor="email">
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={e => setField('email', e.target.value)}
            placeholder="e.g. student@example.com"
            required
          />
          <ValidationMessage message={errors.email} />
        </FormField>
      </div>

      <ImageUploader
        imageFile={values.imageFile}
        onFileChange={handleImageChange}
        errorMessage={errors.imageFile}
      />

      <div className="form-actions">
        <button type="submit" className="primary-button" disabled={isSubmitting}>
          Submit Report
        </button>
      </div>
    </form>
  )
}

export default ReportForm;
