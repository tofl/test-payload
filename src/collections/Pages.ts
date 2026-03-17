import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'domain',
      type: 'relationship',
      relationTo: 'domains',
      required: true,
    },

    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'Product name when the domain type is country',
      },
    },

    {
      name: 'country',
      type: 'relationship',
      relationTo: 'countries',
      admin: {
        description: 'Used when the domain type is product (page represents a country)',
      },
    },

    {
      name: 'language',
      type: 'relationship',
      relationTo: 'languages',
      admin: {
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
                {
                  label: 'File',
                  value: 'file',
                },
                {
                  label: 'Link',
                  value: 'link',
                },
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
