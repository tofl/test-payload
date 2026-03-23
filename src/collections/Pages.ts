import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  /*
    TODO For the create/edit page
    Programmatically hide the "name" field
    Make the first letter of "country" and "language" uppercase
    Solve bug of "are you sure you want to leave" popup displaying even after the page is saved
    => Would it be more interesting of recreating the whole "create/edit" page from scratch ?
   */
  /*
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        const domainId = typeof data.domain === 'object' ? data.domain?.id : data.domain
        if (domainId) {
          const domain = await req.payload.findByID({
            collection: 'domains',
            id: domainId,
            depth: 0,
            overrideAccess: true,
            req,
          })
          data.domainType = domain?.type ?? null
        }
        return data
      },
    ],
  },
   */
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

    {
      name: 'domainType',
      type: 'text',
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

    {
      name: 'country',
      type: 'relationship',
      relationTo: 'countries',
      admin: {
        description: 'Used when the domain type is product (page represents a country)',
        components: {
          Field: '/components/custom-fields/CountryField',
          Label: '/components/custom-fields/RequiredRelationLabel',
        },
      },
    },

    {
      name: 'language',
      type: 'relationship',
      relationTo: 'languages',
      admin: {
        description: 'Optional language for this page (when domain type = product)',
        components: {
          Field: '/components/custom-fields/LanguageField',
          Label: '/components/custom-fields/RequiredRelationLabel',
        },
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
