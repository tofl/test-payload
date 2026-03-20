'use client'

import { useEffect } from 'react'
import { useField } from '@payloadcms/ui'
import { usePathname, useSearchParams } from 'next/navigation'

const DomainAutoFill: React.FC = () => {
  const { value, setValue } = useField<number>({ path: 'domain' })
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const fromPath = pathname?.match(/\/domains\/(\d+)\/pages\/create/)?.[1]
    const fromQuery = searchParams.get('domain')
    const domainId = fromPath ?? fromQuery

    if (!value && domainId) {
      setValue(Number(domainId))
    }
  }, [])

  return null
}

export default DomainAutoFill
