export const orderSchema = {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    { name: 'orderId', title: 'Order ID', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'customerName', title: 'Customer Name', type: 'string' },
    { name: 'customerEmail', title: 'Customer Email', type: 'string' },
    { name: 'customerPhone', title: 'Customer Phone', type: 'string' },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Placed', value: 'placed' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Sketched', value: 'sketched' },
          { title: 'Cast', value: 'cast' },
          { title: 'Set', value: 'set' },
          { title: 'Polished', value: 'polished' },
          { title: 'Quality Checked', value: 'quality_checked' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
        ],
      },
    },
    {
      name: 'statusHistory',
      title: 'Status History',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'status', title: 'Status', type: 'string' },
            { name: 'timestamp', title: 'Timestamp', type: 'datetime' },
            { name: 'note', title: 'Note', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'configurationId', title: 'Configuration ID', type: 'string' },
            { name: 'productType', title: 'Product Type', type: 'string' },
            { name: 'partsSummary', title: 'Parts Summary', type: 'array', of: [{ type: 'string' }] },
            { name: 'storyNarrative', title: 'Story Narrative', type: 'text' },
            { name: 'totalPrice', title: 'Total Price', type: 'number' },
            { name: 'leadTimeDays', title: 'Lead Time (days)', type: 'number' },
            { name: 'estimatedShipDate', title: 'Estimated Ship Date', type: 'date' },
          ],
        },
      ],
    },
    {
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'object',
      fields: [
        { name: 'line1', title: 'Address Line 1', type: 'string' },
        { name: 'line2', title: 'Address Line 2', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'state', title: 'State', type: 'string' },
        { name: 'postalCode', title: 'Postal Code', type: 'string' },
        { name: 'country', title: 'Country', type: 'string' },
      ],
    },
    { name: 'createdAt', title: 'Created At', type: 'datetime' },
    { name: 'updatedAt', title: 'Updated At', type: 'datetime' },
  ],
  orderings: [{ title: 'Created', name: 'createdDesc', by: [{ field: 'createdAt', direction: 'desc' }] }],
};
