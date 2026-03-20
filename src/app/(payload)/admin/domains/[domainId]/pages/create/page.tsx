import config from '@payload-config'
import { RootPage } from '@payloadcms/next/views'
import { importMap } from '../../../../importMap'

type Args = {
  params: Promise<{ domainId: string }>
}

export default async function Page({ params }: Args) {
  const { domainId } = await params

  return RootPage({
    config,
    params: Promise.resolve({ segments: ['collections', 'pages', 'create'] }),
    searchParams: Promise.resolve({ domain: domainId }),
    importMap,
  })
}
