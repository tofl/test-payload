import { CollectionConfig } from 'payload'

export const Countries: CollectionConfig = {
  slug: 'countries',
  admin: {
    useAsTitle: 'label_en',
  },
  fields: [
    {
      name: 'label_en',
      type: 'text',
      required: true,
    },
    {
      name: 'label_native',
      type: 'text',
      required: true,
    },
    {
      name: 'iso_code',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'flag',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
