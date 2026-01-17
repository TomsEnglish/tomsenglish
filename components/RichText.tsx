import React, { Fragment, JSX } from 'react'

export const RichText = ({ content }: { content: any }) => {
  if (!content || !content.root) return null

  // This function loops through the "nodes" Payload gives us
  const serialize = (nodes: any[]): JSX.Element[] => {
    return nodes.map((node, i) => {
      if (node.type === 'text') {
        let text = <span key={i}>{node.text}</span>
        if (node.format & 1) text = <strong key={i}>{text}</strong> // Bold
        if (node.format & 2) text = <em key={i}>{text}</em> // Italic
        return text
      }

      if (!node) return <Fragment key={i} />

      switch (node.type) {
        case 'h1': return <h1 key={i}>{serialize(node.children)}</h1>
        case 'h2': return <h2 key={i} className="text-2xl font-bold mt-6 mb-2">{serialize(node.children)}</h2>
        case 'h3': return <h3 key={i}>{serialize(node.children)}</h3>
        case 'list':
          const Tag = node.tag === 'ol' ? 'ol' : 'ul'
          return <Tag key={i} className="list-disc ml-6">{serialize(node.children)}</Tag>
        case 'listitem': return <li key={i}>{serialize(node.children)}</li>
        case 'link':
          return (
            <a key={i} href={node.fields.url} className="text-blue-600 underline">
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