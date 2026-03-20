import { CollectionConfig } from 'payload'

export const Domains: CollectionConfig = {
  slug: 'domains',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Country', value: 'country' },
        { label: 'Product', value: 'product' },
      ],
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'country',
      type: 'relationship',
      relationTo: 'countries',
      admin: {
        condition: (data) => data.type === 'country',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
