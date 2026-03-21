'use client'

import React, { useEffect } from 'react'
import { useField } from '@payloadcms/ui'
import { useSearchParams } from 'next/navigation'
import type { RelationshipFieldClientComponent } from 'payload'

const HiddenRelationField: RelationshipFieldClientComponent = ({ path }) => {
  const { value, setValue, formInitializing } = useField<number>({ path })
  const searchParams = useSearchParams()

  useEffect(() => {
    // Wait for Payload's async form initialization to complete.
    // Without this guard, setValue() is overwritten by the server's initial state
    // (getFormState response), which arrives after the first render.
    console.log('formInitializing', formInitializing)
    if (formInitializing) return

    const domainId = searchParams.get('d')
    if (domainId && !value) {
      setValue(Number(domainId))
    }
  }, [formInitializing])

  return null
}

export default HiddenRelationField
