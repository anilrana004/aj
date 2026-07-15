export const configuratorPartSchema = {
  name: 'configuratorPart',
  title: 'Configurator Part',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 } },
    {
      name: 'slotType',
      title: 'Slot Type',
      type: 'string',
      options: {
        list: [
          { title: 'Chain', value: 'chain' },
          { title: 'Centerpiece', value: 'centerpiece' },
          { title: 'Accent', value: 'accent' },
          { title: 'Clasp', value: 'clasp' },
          { title: 'Bead', value: 'bead' },
          { title: 'Tassel', value: 'tassel' },
          { title: 'Guru Bead', value: 'guru_bead' },
          { title: 'Spacer', value: 'spacer' },
          { title: 'Cord', value: 'cord' },
          { title: 'Length', value: 'length' },
        ],
      },
    },
    {
      name: 'material',
      title: 'Material',
      type: 'string',
      options: {
        list: [
          { title: '18K Gold Vermeil', value: '18k-gold-vermeil' },
          { title: '22K Yellow Gold', value: '22k-yellow-gold' },
          { title: 'Oxidized Silver', value: 'oxidized-silver' },
          { title: 'Raw Garnet', value: 'raw-garnet' },
          { title: 'Polki Diamond', value: 'polki-diamond' },
          { title: 'Basra Pearl', value: 'basra-pearl' },
          { title: 'Colombian Emerald', value: 'colombian-emerald' },
          { title: 'Rudraksha', value: 'rudraksha' },
          { title: 'Sandalwood', value: 'sandalwood' },
          { title: 'Tassel Silk', value: 'tassel-silk' },
          { title: 'Cotton Cord', value: 'cotton-cord' },
          { title: 'Leather', value: 'leather' },
        ],
      },
    },
    { name: 'price', title: 'Price (INR)', type: 'number', validation: (Rule: any) => Rule.min(0) },
    { name: 'weightGrams', title: 'Weight (grams)', type: 'number' },
    { name: 'leadTimeDays', title: 'Lead Time (days)', type: 'number', initialValue: 14 },
    { name: 'inStockQuantity', title: 'In Stock Quantity', type: 'number', initialValue: 0 },
    { name: 'isEditorPick', title: "Editor's Pick", type: 'boolean', initialValue: false },
    { name: 'sortOrder', title: 'Sort Order', type: 'number' },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'alt', title: 'Alt Text', type: 'string' },
            {
              name: 'type',
              title: 'Image Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Builder Cutout', value: 'builder-cutout' },
                  { title: 'Editorial', value: 'editorial' },
                  { title: 'Detail', value: 'detail' },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      name: 'story',
      title: 'Story',
      type: 'object',
      fields: [
        { name: 'headline', title: 'Headline', type: 'string' },
        { name: 'narrative', title: 'Narrative', type: 'text', rows: 6 },
        { name: 'craftTime', title: 'Craft Time', type: 'string' },
        { name: 'originRegion', title: 'Origin Region', type: 'string' },
      ],
    },
  ],
  orderings: [{ title: 'Sort Order', name: 'orderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] }],
};
