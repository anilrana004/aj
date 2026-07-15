export default function AdminCustomersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Customers</h1>

      <div className="bg-white border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Orders</th>
              <th className="px-6 py-3">Verified</th>
              <th className="px-6 py-3">Joined</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Priya Sharma', email: 'priya@example.com', orders: 3, verified: true, joined: 'Oct 2024' },
              { name: 'Arjun Mehta', email: 'arjun@example.com', orders: 1, verified: true, joined: 'Nov 2024' },
              { name: 'Sarah Chen', email: 'sarah@example.com', orders: 2, verified: false, joined: 'Nov 2024' },
            ].map((customer) => (
              <tr key={customer.email} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{customer.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{customer.email}</td>
                <td className="px-6 py-4 text-sm">{customer.orders}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block w-2 h-2 rounded-full ${customer.verified ? 'bg-green-500' : 'bg-yellow-500'}`} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{customer.joined}</td>
                <td className="px-6 py-4">
                  <button className="text-sm text-gray-600 hover:text-gray-900 mr-3">View</button>
                  <button className="text-sm text-blue-600 hover:text-blue-900">Resend Email</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
