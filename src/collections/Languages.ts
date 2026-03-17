import { CollectionConfig } from 'payload'

export const Languages: CollectionConfig = {
  slug: 'languages',
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
  ],
}
