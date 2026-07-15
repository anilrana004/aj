export const journalArticleSchema = {
  name: 'journalArticle',
  title: 'Journal Article',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'dek', title: 'Dek (Subtitle)', type: 'text', rows: 2 },
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
    { name: 'heroImageAlt', title: 'Hero Image Alt', type: 'string' },
    { name: 'author', title: 'Author', type: 'string' },
    { name: 'authorRole', title: 'Author Role', type: 'string' },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'readTime', title: 'Read Time (min)', type: 'number' },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Atelier', value: 'atelier' },
          { title: 'Journal', value: 'journal' },
          { title: 'Craft', value: 'craft' },
          { title: 'Stories', value: 'stories' },
        ],
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'type', title: 'Type', type: 'string' },
            { name: 'content', title: 'Content', type: 'text' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'imageAlt', title: 'Image Alt', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
    },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'isFeatured', title: 'Is Featured', type: 'boolean', initialValue: false },
  ],
};
