import { items } from '../data/items'
import { generateReferenceNumber as generateSessionReferenceNumber } from './referenceGenerator'

const ITEM_CATEGORIES = [
  'ID / Access',
  'Accessories',
  'Personal Belongings',
  'Jewellery',
  'Stationery',
  'Other',
]

export function getItemCategories() {
  return ITEM_CATEGORIES
}

export function generateItemId(reportType) {
  const timestamp = Date.now()
  const prefix = reportType === 'found' ? 'found' : 'lost'
  return `${prefix}-${timestamp}`
}

export function createReportSubmission(reportType, values) {
  const itemType = reportType === 'found' ? 'Found' : 'Lost'
  const existingReferenceNumbers = items.map(item => item.referenceNumber || '')

  return {
    id: generateItemId(reportType),
    referenceNumber: generateSessionReferenceNumber(reportType, values.dateReported, existingReferenceNumbers),
    name: values.itemName,
    category: values.category,
    location: values.location,
    building: values.building,
    dateReported: values.dateReported,
    timeReported: values.timeReported,
    brand: values.brand,
    color: values.color,
    identifyingMarks: values.identifyingMarks,
    description: values.description,
    contactNumber: values.contactNumber,
    email: values.email,
    imageUrl: values.imageUrl || '',
    status: 'Submitted',
    type: itemType,
  }
}
