import { Block } from 'payload'

export const BannerBlock: Block = {
  slug: 'banner',
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
  ],
}

export const ContentSectionBlock: Block = {
  slug: 'contentSection',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'body', type: 'richText', required: true },
  ],
}