export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="px-4 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800 transition-colors">
          + Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select className="px-3 py-2 border border-gray-200 text-sm rounded">
          <option>All Categories</option>
          <option>Necklaces</option>
          <option>Bracelets</option>
          <option>Malas</option>
          <option>Rings</option>
          <option>Earrings</option>
        </select>
        <select className="px-3 py-2 border border-gray-200 text-sm rounded">
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
      </div>

      <div className="bg-white border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Oxidized Bronze Chain Necklace', category: 'Necklaces', price: '₹18,500', stock: 'Made to order', status: 'Published' },
              { name: 'Jaipur Ruby Pendant', category: 'Necklaces', price: '₹34,000', stock: '3', status: 'Published' },
              { name: 'Stacked Bronze Bangle', category: 'Bracelets', price: '₹12,000', stock: '8', status: 'Published' },
              { name: 'Terracotta Seal Ring', category: 'Rings', price: '₹9,500', stock: '5', status: 'Published' },
            ].map((product, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{product.category}</td>
                <td className="px-6 py-4 text-sm">{product.price}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{product.stock}</td>
                <td className="px-6 py-4">
                  <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                    {product.status}
                  </span>
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
