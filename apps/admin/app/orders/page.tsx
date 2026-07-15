export default function AdminOrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Orders</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select className="px-3 py-2 border border-gray-200 text-sm rounded">
          <option>All Status</option>
          <option>Pending Payment</option>
          <option>Paid</option>
          <option>In Production</option>
          <option>Quality Check</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
        <input
          type="text"
          placeholder="Search by order number..."
          className="px-3 py-2 border border-gray-200 text-sm rounded w-64"
        />
      </div>

      <div className="bg-white border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
              <th className="px-6 py-3">Order #</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Items</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { order: 'AS-M1K4-X7P2', customer: 'Priya Sharma', email: 'priya@example.com', items: 'Oxidized Bronze Necklace (Bespoke)', total: '₹22,000', status: 'IN_PRODUCTION', date: 'Dec 20, 2024' },
              { order: 'AS-L2N8-Y3Q9', customer: 'Arjun Mehta', email: 'arjun@example.com', items: 'Jhumka Earrings', total: '₹15,000', status: 'SHIPPED', date: 'Dec 18, 2024' },
              { order: 'AS-K9P3-W1R6', customer: 'Sarah Chen', email: 'sarah@example.com', items: 'Rudraksha Mala (Bespoke)', total: '₹34,000', status: 'DELIVERED', date: 'Dec 15, 2024' },
              { order: 'AS-J7M2-V8T4', customer: 'Guest', email: 'guest@example.com', items: 'Stacked Bronze Bangle', total: '₹12,000', status: 'PAID', date: 'Dec 22, 2024' },
            ].map((order) => (
              <tr key={order.order} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-sm">{order.order}</td>
                <td className="px-6 py-4">
                  <div className="text-sm">{order.customer}</div>
                  <div className="text-xs text-gray-400">{order.email}</div>
                </td>
                <td className="px-6 py-4 text-sm max-w-[200px] truncate">{order.items}</td>
                <td className="px-6 py-4 text-sm">{order.total}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2 py-1 text-xs rounded ${
                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                    order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'PAID' ? 'bg-purple-100 text-purple-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {order.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4">
                  <select className="text-xs border border-gray-200 rounded px-2 py-1">
                    <option>Update Status</option>
                    <option>In Production</option>
                    <option>Quality Check</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
