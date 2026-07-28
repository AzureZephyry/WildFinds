const sessionReferenceSet = new Set()

function formatReferenceYear(dateString) {
  const normalizedDate = String(dateString || '').trim()
  const parsedDate = new Date(normalizedDate)

  if (Number.isNaN(parsedDate.getTime())) {
    return new Date().getFullYear().toString()
  }

  return parsedDate.getFullYear().toString()
}

function getReferencePrefix(reportType) {
  return reportType === 'found' ? 'WF-F' : 'WF-L'
}

function extractSequence(referenceNumber) {
  const sequencePart = String(referenceNumber).split('-').pop()
  const sequence = Number(sequencePart)
  return Number.isNaN(sequence) ? 0 : sequence
}

export function generateReferenceNumber(reportType, dateReported, existingReferenceNumbers = []) {
  const prefix = getReferencePrefix(reportType)
  const referenceYear = formatReferenceYear(dateReported)
  const existingRefs = [
    ...existingReferenceNumbers,
    ...Array.from(sessionReferenceSet),
  ].filter(ref => String(ref).startsWith(`${prefix}-${referenceYear}-`))

  let highestSequence = 0

  existingRefs.forEach(ref => {
    const sequence = extractSequence(ref)
    if (sequence > highestSequence) {
      highestSequence = sequence
    }
  })

  const nextSequence = String(highestSequence + 1).padStart(6, '0')
  const referenceNumber = `${prefix}-${referenceYear}-${nextSequence}`
  sessionReferenceSet.add(referenceNumber)

  return referenceNumber
}
