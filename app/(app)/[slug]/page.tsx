import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { BlockRenderer } from '@/components/BlockRenderer' // Import your renderer

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  
  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
    select: { slug: true }
  })

  // ✅ Filter out any documents that have a missing or null slug
  return pages.docs
    .filter((doc) => doc && typeof doc.slug === 'string') 
    .map((doc) => ({
      slug: doc.slug,
    }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  // In Next.js 15+, params is a Promise. You are correctly awaiting it.
  const { slug } = await params 
  
  // Safety: If slug is somehow missing here, don't try to query Payload
  if (!slug) return notFound()

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
    },
  })

  const page = result.docs[0]

  if (!page) return notFound()

  return (
    <main>
      <BlockRenderer blocks={page.layout} />
    </main>
  )
}