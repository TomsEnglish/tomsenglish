import React, { Fragment, JSX } from 'react'

// 1. Define the structure of a Lexical Node
interface LexicalNode {
  type: string
  text?: string
  format?: number
  tag?: 'ol' | 'ul'
  fields?: {
    url?: string
    newTab?: boolean
  }
  children?: LexicalNode[]
}

// 2. Define the prop type for the component
interface RichTextProps {
  content: {
    root: {
      children: LexicalNode[]
    }
  } | null | undefined
}

export const RichText = ({ content }: RichTextProps) => {
  if (!content || !content.root) return null

  // 3. Serialize function with proper typing
  const serialize = (nodes: LexicalNode[] | undefined): JSX.Element[] => {
    if (!nodes) return []

    return nodes.map((node, i) => {
      if (node.type === 'text') {
        let text: JSX.Element = <span key={i}>{node.text}</span>
        
        // Lexical uses bitwise flags for formatting
        if (node.format && node.format & 1) text = <strong key={i}>{text}</strong> // Bold
        if (node.format && node.format & 2) text = <em key={i}>{text}</em>      // Italic
        return text
      }

      if (!node) return <Fragment key={i} />

      switch (node.type) {
        case 'h1': 
          return <h1 key={i}>{serialize(node.children)}</h1>
        case 'h2': 
          return <h2 key={i} className="text-2xl font-bold mt-6 mb-2">{serialize(node.children)}</h2>
        case 'h3': 
          return <h3 key={i}>{serialize(node.children)}</h3>
        case 'list': {
          const Tag = node.tag === 'ol' ? 'ol' : 'ul'
          return <Tag key={i} className="list-disc ml-6">{serialize(node.children)}</Tag>
        }
        case 'listitem': 
          return <li key={i}>{serialize(node.children)}</li>
        case 'link':
          return (
            <a key={i} href={node.fields?.url} className="text-blue-600 underline">
              {serialize(node.children)}
            </a>
          )
        default:
          return <p key={i} className="mb-4">{serialize(node.children)}</p>
      }
    })
  }

  return (
    <div className="prose max-w-none">
      {serialize(content.root.children)}
    </div>
  )
}