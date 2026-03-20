import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'

type Args = {
  params: Promise<{ slug: string }>
}

export default async function DomainPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config: await config })

  const { docs } = await payload.find({
    collection: 'domains',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (!docs.length) notFound()

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to {JSON.stringify(docs[0].name)}</h1>
    </div>
  )
}
