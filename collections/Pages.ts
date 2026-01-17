import { BannerBlock, ContentSectionBlock } from "@/blocks/ContentPillar";

// src/collections/Pages.ts
export const Pages = {
  slug: 'pages',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'layout', // This creates the "stackable" UI in the admin panel
      type: 'blocks',
      blocks: [BannerBlock, ContentSectionBlock],
    },
  ],
}