'use client'

import React from 'react'
import type { TextFieldClientComponent } from 'payload'
import { useFormFields, TextField } from '@payloadcms/ui'
import { Domain } from '@/payload-types'

const NameField: TextFieldClientComponent = ({ path, field }) => {
  const domain = useFormFields(([fields]) => fields['domainObject']?.value as Domain | undefined)

  if (domain && domain.type === 'country') {
    return <TextField path={path} field={{ ...field, required: true }} />
  }

  return null
}

export default NameField
