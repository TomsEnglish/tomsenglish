import React from 'react'
import { Page } from '@/payload-types' 
import { RichText } from './RichText'

// 1. Extract the 'layout' type from the Page collection
type LayoutBlocks = Page['layout']

// 2. Define specific types for your blocks
// NonNullable is used because Payload blocks can technically be null in the schema
type BlockUnion = NonNullable<LayoutBlocks>[number]

type BannerProps = Extract<BlockUnion, { blockType: 'banner' }>
type ContentSectionProps = Extract<BlockUnion, { blockType: 'contentSection' }>

const Banner: React.FC<BannerProps> = ({ heading, description }) => (
  <section className="bg-light py-5 mb-4">
    <div className="container" style={{ maxWidth: '1080px' }}>
      <h1 className="display-4">{heading}</h1>
      {description && <p className="lead">{description}</p>}
    </div>
  </section>
)

// Replaced :any with :ContentSectionProps
const ContentSection: React.FC<ContentSectionProps> = ({ title, body }) => (
  <section className="py-8">
    <div className="container" style={{ maxWidth: '1080px' }}>
      {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
      {/* RichText content is typed inside RichText.tsx */}
      <RichText content={body} />
    </div>
  </section>
)

// 3. Define the Map with a generic React Component type instead of any
const blocksMap: Record<string, React.FC<BlockUnion>> = {
  banner: Banner as React.FC<BlockUnion>,
  contentSection: ContentSection as React.FC<BlockUnion>,
}

// 4. Final typed BlockRenderer
interface BlockRendererProps {
  blocks: LayoutBlocks
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  if (!blocks) return null

  return (
    <>
      {blocks.map((block, index) => {
        // block is now inferred as BlockUnion
        const SelectedBlock = blocksMap[block.blockType]
        
        if (SelectedBlock) {
          // Pass the whole block as props to the component
          return <SelectedBlock key={index} {...block} />
        }
        
        return <div key={index}>Unknown block type: {block.blockType}</div>
      })}
    </>
  )
}