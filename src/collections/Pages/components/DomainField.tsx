'use client'

import { useEffect } from 'react'
import { useField, useFormFields } from '@payloadcms/ui'
import type { RelationshipFieldClientComponent } from 'payload'
import { Domain } from '@/payload-types'

const DomainField: RelationshipFieldClientComponent = ({ path }) => {
  const { setValue } = useField<string>({ path })
  const domain = useFormFields(([fields]) => fields['domainObject']?.value as Domain | undefined)

  useEffect(() => {
    if (domain && domain.id) {
      setValue(domain.id)
    }
  }, [domain])

  return null
}

export default DomainField
