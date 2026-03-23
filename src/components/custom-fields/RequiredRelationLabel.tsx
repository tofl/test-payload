'use client'

import { FieldLabel, useFormFields } from '@payloadcms/ui'
import type { RelationshipFieldLabelClientComponent } from 'payload'

// Shared label component for Country and Language fields.
// Returns null when domainType is not 'product' (same pattern as HiddenRelationField).
// Renders the standard Payload label with a required asterisk when the field is active.
const RequiredRelationLabel: RelationshipFieldLabelClientComponent = ({ label, path }) => {
  const domainType = useFormFields(
    ([fields]) => fields['domainType']?.value as string | undefined,
  )

  console.log(domainType, label, path)

  if (domainType !== 'product') return null

  return <FieldLabel label={label || path} path={path} required />
}

export default RequiredRelationLabel
