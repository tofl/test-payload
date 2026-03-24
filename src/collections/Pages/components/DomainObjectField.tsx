'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

// Watches the `domain` relationship field, fetches the domain via the
// REST API, and updates `domainObject` so that CountryField / NameField can
// conditionally render themselves.
const DomainObjectField: TextFieldClientComponent = ({ path }) => {
  const { setValue, formInitializing } = useField<number>({ path })
  const searchParams = useSearchParams()
  const domainId = searchParams.get('d')

  useEffect(() => {
    if (!domainId || formInitializing) {
      return
    }

    fetch(`/api/domains/${domainId}?depth=0`)
      .then((res) => res.json())
      .then((domain) => {
        if (domain) {
          setValue(domain)
        }
      })
      .catch((e) => {
        console.error('Failed to fetch domain', e)
      })
  }, [domainId, searchParams, setValue, formInitializing])

  return null
}

export default DomainObjectField