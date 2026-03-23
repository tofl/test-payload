'use client'

import React, { useEffect } from 'react'
import { useField, useFormFields } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

// Hidden field that keeps domainType in sync with the selected domain.
// Watches the `domain` relationship field, fetches the domain's type via the
// REST API, and updates `domainType` so that CountryField / LanguageField can
// conditionally render themselves.
const DomainTypeField: TextFieldClientComponent = ({ path }) => {
  const { setValue } = useField<string>({ path })
  const domainId = useFormFields(([fields]) => fields['domain']?.value as number | undefined)

  useEffect(() => {
    if (!domainId) return

    fetch(`/api/domains/${domainId}?depth=0`)
      .then((res) => res.json())
      .then((domain) => {
        if (domain?.type) setValue(domain.type)
      })
      .catch(() => {})
  }, [domainId])

  return null
}

export default DomainTypeField
