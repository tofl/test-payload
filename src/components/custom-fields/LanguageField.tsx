'use client'

import React from 'react'
import { useFormFields, RelationshipField } from '@payloadcms/ui'
import type { RelationshipFieldClientComponent } from 'payload'

const LanguageField: RelationshipFieldClientComponent = (props) => {
  const domainType = useFormFields(
    ([fields]) => fields['domainType']?.value as string | undefined,
  )

  if (domainType !== 'product') return null

  return <RelationshipField {...props} />
}

export default LanguageField
