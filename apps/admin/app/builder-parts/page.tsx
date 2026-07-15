export default function AdminBuilderPartsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Builder Parts</h1>
        <button className="px-4 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800 transition-colors">
          + Add Part
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 mb-6">
        {['Necklace', 'Bracelet', 'Mala', 'Ring', 'Earring'].map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 text-sm border border-gray-200 hover:bg-gray-50 rounded"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
              <th className="px-6 py-3">Part Name</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Lead Time</th>
              <th className="px-6 py-3">Available</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Oxidized Bronze Chain', type: 'Base', price: '₹8,000', leadTime: '0 days', available: true },
              { name: 'Matte Gold-Finish Chain', type: 'Base', price: '₹14,000', leadTime: '0 days', available: true },
              { name: 'Lotus Medallion', type: 'Centerpiece', price: '₹5,000', leadTime: '0 days', available: true },
              { name: 'Ruby Drop Pendant', type: 'Centerpiece', price: '₹12,000', leadTime: '7 days', available: true },
              { name: 'Moonstone', type: 'Stone', price: '₹2,500', leadTime: '0 days', available: true },
              { name: 'Oxidized (Dark Patina)', type: 'Finish', price: '₹0', leadTime: '0 days', available: true },
            ].map((part, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{part.name}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{part.type}</td>
                <td className="px-6 py-4 text-sm">{part.price}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{part.leadTime}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block w-2 h-2 rounded-full ${part.available ? 'bg-green-500' : 'bg-red-500'}`} />
                </td>
                <td className="px-6 py-4">
                  <button className="text-sm text-gray-600 hover:text-gray-900 mr-3">Edit</button>
                  <button className="text-sm text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
