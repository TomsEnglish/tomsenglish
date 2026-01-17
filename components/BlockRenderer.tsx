import React from 'react'
import { Page } from '@/payload-types' // Adjust this path to your generated types file
import { RichText } from './RichText'

// 1. Extract the 'layout' type from the Page collection
type LayoutBlocks = Page['layout']

// 2. Define props for the individual block components
// Note: Payload generates types like 'BannerBlock' and 'ContentSectionBlock'
type BannerProps = Extract<NonNullable<LayoutBlocks>[number], { blockType: 'banner' }>
type ContentProps = Extract<NonNullable<LayoutBlocks>[number], { blockType: 'contentSection' }>

const Banner: React.FC<BannerProps> = ({ heading, description }) => (
  <section className="bg-light py-5 mb-4">
    <div className="container" style={{ maxWidth: '1080px' }}>
      <h1 className="display-4">{heading}</h1>
      {description && <p className="lead">{description}</p>}
    </div>
  </section>
)

const ContentSection = ({ title, body }: any) => (
  <section className="py-8">
    <div className="container" style={{ maxWidth: '1080px' }}>
      {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
      
      {/* This now calls our custom serializer */}
      <RichText content={body} />
    </div>
  </section>
)

// 3. Define the Map type
const blocksMap: Record<string, React.FC<any>> = {
  banner: Banner,
  contentSection: ContentSection,
}

// 4. Final typed BlockRenderer
interface BlockRendererProps {
  blocks: LayoutBlocks
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  if (!blocks) return null

  return (
    <>
      {blocks.map((block: any, index: any) => {
        const SelectedBlock = blocksMap[block.blockType]
        if (SelectedBlock) {
          return <SelectedBlock key={index} {...(block as any)} />
        }
        return <div key={index}>Unknown block type: {block.blockType}</div>
      })}
    </>
  )
}