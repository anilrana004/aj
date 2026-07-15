export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Revenue', value: '₹2,45,000', change: '+12%' },
          { label: 'Orders', value: '28', change: '+8%' },
          { label: 'Active Bespoke', value: '12', change: '' },
          { label: 'Customers', value: '156', change: '+24%' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
            {stat.change && (
              <p className="text-sm text-green-600 mt-1">{stat.change} this month</p>
            )}
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
              <th className="px-6 py-3">Order #</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {[
              { order: 'AS-M1K4-X7P2', customer: 'Priya Sharma', status: 'IN_PRODUCTION', total: '₹22,000', date: 'Dec 20, 2024' },
              { order: 'AS-L2N8-Y3Q9', customer: 'Arjun Mehta', status: 'SHIPPED', total: '₹15,000', date: 'Dec 18, 2024' },
              { order: 'AS-K9P3-W1R6', customer: 'Sarah Chen', status: 'DELIVERED', total: '₹34,000', date: 'Dec 15, 2024' },
            ].map((order) => (
              <tr key={order.order} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-sm">{order.order}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2 py-1 text-xs rounded ${
                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                    order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {order.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4">{order.total}</td>
                <td className="px-6 py-4 text-gray-500">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Bespoke Combos */}
      <div className="mt-8 bg-white border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Top Bespoke Combinations</h2>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-4">Most frequently chosen parts in the builder</p>
          <div className="space-y-3">
            {[
              { parts: 'Oxidized Bronze Chain + Lotus Medallion', count: 18 },
              { parts: 'Matte Gold Chain + Ruby Drop', count: 12 },
              { parts: 'Oxidized Bronze Chain + Minimalist Bar + Moonstone', count: 9 },
            ].map((combo, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm">{combo.parts}</span>
                <span className="text-sm font-medium text-gray-600">{combo.count}× chosen</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
