import type { CollectionConfig } from 'payload'

/*
TODO
  - Ajouter un champ disclaimer "this ... is for ... residents only"
  - Title de la page admin : name OU country name
  - Auto-generate slug
  - Use tabs for the languages
  - Ajouter un fil d'Ariane custom
 */

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
      hasMany: false,
      required: true,
      admin: {
        components: {
          Field: '/collections/Pages/components/DomainField',
        },
      },
    },

    {
      name: 'domainObject',
      type: 'json',
      admin: {
        components: {
          Field: '/collections/Pages/components/DomainObjectField'
        }
      },
    },

    {
      name: 'name',
      type: 'text',
      admin: {
        components: {
          Field: '/collections/Pages/components/NameField'
        }
      },
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },

    {
      name: 'country',
      type: 'relationship',
      relationTo: 'countries',
      admin: {
        components: {
          Field: '/collections/Pages/components/CountryField',
        },
      },
    },

    {
      name: 'languages',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'language',
          type: 'relationship',
          relationTo: 'languages',
          required: true,
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
    },
  ],
}
