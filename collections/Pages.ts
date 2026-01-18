import { BannerBlock, ContentSectionBlock } from "@/blocks/ContentPillar";
import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title', // This makes the admin UI look cleaner
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    // 1. Add the missing slug field here
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true, // Prevents two pages from having the same URL
      index: true,  // Fixes the "path cannot be queried" error
      admin: {
        position: 'sidebar', // Moves it to the side in the admin UI
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        BannerBlock, ContentSectionBlock
      ],
    },
  ],
}