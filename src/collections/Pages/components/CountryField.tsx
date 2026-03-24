'use client'

import React from 'react'
import type { RelationshipFieldClientComponent } from 'payload'
import { useFormFields, RelationshipField } from '@payloadcms/ui'
import { Domain } from '@/payload-types'

const CountryField: RelationshipFieldClientComponent = ({ path, field }) => {
  const domain = useFormFields(([fields]) => fields['domainObject']?.value as Domain | undefined)

  if (domain && domain.type === 'product') {
    return <RelationshipField path={path} field={{ ...field, required: true }} />
  }

  return null
}

export default CountryField
