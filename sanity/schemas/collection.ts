export const collectionSchema = {
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 } },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'story', title: 'Story', type: 'text', rows: 6 },
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
    { name: 'heroImageAlt', title: 'Hero Image Alt', type: 'string' },
    { name: 'thumbnailImage', title: 'Thumbnail Image', type: 'image', options: { hotspot: true } },
    { name: 'order', title: 'Sort Order', type: 'number' },
    { name: 'isActive', title: 'Is Active', type: 'boolean', initialValue: true },
  ],
  orderings: [{ title: 'Sort Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
};
