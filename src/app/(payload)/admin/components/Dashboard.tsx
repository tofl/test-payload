'use client'

import React, { useEffect, useState } from 'react'
import { useAuth, Card, Button } from '@payloadcms/ui'

const collections = [
  { label: 'Users', slug: 'users' },
  { label: 'Media', slug: 'media' },
  { label: 'Countries', slug: 'countries' },
  { label: 'Languages', slug: 'languages' },
]

const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const [domains, setDomains] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDomains = async () => {
      try {
        const res = await fetch('/api/domains?limit=100')
        const json = await res.json()
        setDomains(json.docs || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    loadDomains()
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Hello {user?.email || user?.name} 👋</h1>

      {/* Collection cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1rem',
          marginTop: '1.5rem',
        }}
      >
        {collections.map((col) => (
          <Card key={col.slug} title={col.label} href={`/admin/collections/${col.slug}`} />
        ))}
      </div>

      {/* Header avec bouton */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginTop: '2.5rem',
        }}
      >
        <h2 style={{ margin: 0 }}>Available domains</h2>

        <Button el="link" to="/admin/collections/domains/create" buttonStyle="secondary">
          Create new
        </Button>
      </div>

      {loading && <p>Loading domains...</p>}

      {!loading && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
          {domains.map((domain) => (
            <Card
              key={domain.id}
              title={domain.name}
              href={`/admin/collections/domains/${domain.id}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
