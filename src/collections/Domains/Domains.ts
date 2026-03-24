import { CollectionConfig } from 'payload'

/*
  TODO ui des pages Domains
    - Afficher tous les champs nécessaires dans l'en-tête de la page de visualisation
    - Ajouter un fil d'Ariane
    - Ajouter un moyen de modifier le domaine

   TODO Ajouter des collections pour gérer les translations (mais voir avant quel est le moyen officiel de gérer les trads)
    - une collection principale
    - une collection "custom" rattachée à un domain
 */
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
      name: 'hasPageSelectionForm',
      type: 'checkbox',
      label: 'Show page selection form',
      defaultValue: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
