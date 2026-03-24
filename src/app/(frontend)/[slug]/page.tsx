import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import DomainForm from './DomainForm'

type Args = {
  params: Promise<{ slug: string }>
}

export default async function DomainPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config: await config })

  const { docs: domains } = await payload.find({
    collection: 'domains',
    where: { slug: { equals: slug } },
    limit: 1, // TODO existe-t-il un meilleur moyen que "limit" ?
    depth: 0,
  })

  if (!domains.length) {
    notFound()
  }

  const domain = domains[0]

  // TODO optimize
  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: { domain: { equals: domain.id } },
    depth: 1,
  })

  // Available languages
  // Perform a select on all pages related to

  return (
    <div className="flex min-h-screen">
      {/* Left — purple block */}
      <div className="flex w-1/2 items-center justify-center bg-[#3c217b] px-16">
        <div className="text-white">
          <p className="text-2xl font-semibold">
            Welcome to {domain.name}® Electronic Product Information
          </p>
          <p className="mt-4 text-base text-white/80">
            Please select your location to find product information for Sanofi {domain.name}®.
          </p>
        </div>
      </div>

      {/* Right */}
      <DomainForm
        domainName={domain.name ?? ''}
        domainType={domain.type}
        pages={pages}
      />
    </div>
  )
}
