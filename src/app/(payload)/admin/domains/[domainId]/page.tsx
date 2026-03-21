'use client'

import React, { useEffect, useState } from 'react'
import { Button, Card } from '@payloadcms/ui'
import { useParams } from 'next/navigation'
import type { Country, Domain, Page } from '@/payload-types'

const DomainViewerPage: React.FC = () => {
  const params = useParams()
  const domainId = params.domainId

  const [domain, setDomain] = useState<Domain | null>(null)
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!domainId || isNaN(Number(domainId))) {
      return
    }

    const load = async () => {
      try {
        const [domainRes, pagesRes] = await Promise.all([
          fetch(`/api/domains/${domainId}?depth=2`),
          fetch(`/api/pages?where[domain][equals]=${domainId}&depth=1&limit=100`),
        ])

        if (!domainRes.ok) {
          throw new Error('Domain not found')
        }

        const domainData = await domainRes.json()
        const pagesData = await pagesRes.json()
        setDomain(domainData)
        setPages(pagesData.docs || [])
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [domainId])

  if (loading) {
    return (
      <div style={{ padding: '2rem' }}>
        <p>Loading...</p>
      </div>
    )
  }

  if (error || !domain) {
    return (
      <div style={{ padding: '2rem' }}>
        <p style={{ color: 'var(--theme-error-500)' }}>{error || 'Domain not found'}</p>
      </div>
    )
  }

  const country =
    domain.type === 'country' && domain.country && typeof domain.country !== 'number'
      ? (domain.country as Country)
      : null

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Button el="link" to="/admin" buttonStyle="secondary" size="small">
          ← Back to Dashboard
        </Button>
      </div>

      {/* Domain fields */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--theme-elevation-50)',
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: '4px',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}
        >
          <h1 style={{ margin: 0 }}>{domain.name}</h1>
          <span
            style={{
              display: 'inline-block',
              padding: '0.2rem 0.6rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: '999px',
              background: 'var(--theme-elevation-150)',
              color: 'var(--theme-text)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            {domain.type}
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--theme-elevation-500)',
                marginBottom: '0.25rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Slug
            </div>
            <code
              style={{
                fontSize: '0.875rem',
                background: 'var(--theme-elevation-100)',
                padding: '0.15rem 0.5rem',
                borderRadius: '4px',
              }}
            >
              {domain.slug}
            </code>
          </div>

          {country && (
            <div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--theme-elevation-500)',
                  marginBottom: '0.25rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Country
              </div>
              <span style={{ fontSize: '0.875rem' }}>
                {country.label_en}{' '}
                <span style={{ color: 'var(--theme-elevation-500)' }}>({country.iso_code})</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Pages */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}
      >
        <h2 style={{ margin: 0 }}>Pages</h2>
        <Button
          el="link"
          to={`/admin/collections/pages/create?d=${domainId}`}
          buttonStyle="secondary"
        >
          Create new
        </Button>
      </div>
      <p
        style={{
          margin: '0 0 1rem',
          color: 'var(--theme-elevation-500)',
          fontSize: '0.875rem',
        }}
      >
        {pages.length} page{pages.length !== 1 ? 's' : ''}
      </p>

      {pages.length === 0 ? (
        <p style={{ color: 'var(--theme-elevation-500)' }}>No pages attached to this domain.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {pages.map((page) => (
            <Card
              key={page.id}
              title={page.name || page.slug}
              href={`/admin/collections/pages/${page.id}?d=${domainId}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default DomainViewerPage
