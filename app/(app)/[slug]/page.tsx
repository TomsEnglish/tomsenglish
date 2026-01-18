import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { BlockRenderer } from '@/components/BlockRenderer' // Import your renderer

export const revalidate = 3600 // Revalidate every hour

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  
  // Fetch all pages from your collection
  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
    select: { slug: true }
  })

  // Return the slugs so Next.js can pre-render them
  return pages.docs.map((doc) => ({
    slug: doc.slug,
  }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params 
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
      {/* This is the magic part. It takes the "layout" array 
        from Payload and turns it into React components.
      */}
      <BlockRenderer blocks={page.layout} />
    </main>
  )
}