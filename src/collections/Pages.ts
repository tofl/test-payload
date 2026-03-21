import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'name',
    // Live preview: adjust the URL once the frontend route for pages exists
    livePreview: {
      url: ({ data }) => {
        const origin = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'
        const slug = data?.slug as string | undefined
        return slug ? `${origin}/${slug}` : origin
      },
    },
  },
  fields: [
    {
      name: 'domain',
      type: 'relationship',
      relationTo: 'domains',
      hasMany: false,
      required: true,
      admin: {
        components: {
          Field: '/components/custom-fields/HiddenRelationField',
        },
      },
    },

    // Hidden mirror of domain.type, populated by DomainTypeField.
    // Used by admin.condition on country and language below.
    {
      name: 'domainType',
      type: 'select',
      options: [
        { label: 'Country', value: 'country' },
        { label: 'Product', value: 'product' },
      ],
      admin: {
        components: {
          Field: '/components/custom-fields/DomainTypeField',
        },
      },
    },

    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'Product name when the domain type is country',
      },
    },

    // Visible only when domain.type === 'product'
    {
      name: 'country',
      type: 'relationship',
      relationTo: 'countries',
      admin: {
        condition: (data) => data?.domainType === 'product',
        description: 'Used when the domain type is product (page represents a country)',
      },
    },

    // Visible only when domain.type === 'product'
    {
      name: 'language',
      type: 'relationship',
      relationTo: 'languages',
      admin: {
        condition: (data) => data?.domainType === 'product',
        description: 'Optional language for this page (when domain type = product)',
      },
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },

    {
      name: 'profiles',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
        },
        {
          name: 'resources',
          type: 'array',
          fields: [
            {
              name: 'type',
              type: 'select',
              required: true,
              options: [
                { label: 'File', value: 'file' },
                { label: 'Link', value: 'link' },
              ],
            },
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (_, siblingData) => siblingData.type === 'file',
              },
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData.type === 'link',
              },
            },
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
        {
          name: 'content',
          type: 'richText',
          localized: true,
        },
      ],
    },
  ],
}
