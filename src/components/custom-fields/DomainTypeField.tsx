'use client'

import { useEffect } from 'react'
import { useField, useFormFields } from '@payloadcms/ui'
import type { SelectFieldClientComponent } from 'payload'

const DomainTypeField: SelectFieldClientComponent = ({ path }) => {
  const { value, setValue, formInitializing } = useField<string>({ path })

  // Reads the domain field value reactively from form state.
  // This fires again whenever HiddenRelationField sets the domain value.
  const domainId = useFormFields(([fields]) => fields['domain']?.value as number | undefined)

  useEffect(() => {
    // Same guard as HiddenRelationField: wait for Payload's async form
    // initialization to complete before writing, to avoid being overwritten.
    if (formInitializing) return

    // Already populated (edit form) or domain not yet set
    if (value || !domainId) return

    fetch(`/api/domains/${domainId}?depth=0`)
      .then((r) => r.json())
      .then((domain) => {
        if (domain?.type) setValue(domain.type)
      })
      .catch(() => {})
  }, [formInitializing, domainId])

  return null
}

export default DomainTypeField
