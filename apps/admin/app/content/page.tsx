export default function AdminContentPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Journal & Content</h1>
        <button className="px-4 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800 transition-colors">
          + New Article
        </button>
      </div>

      <div className="bg-white border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Author</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Published</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { title: 'The Art of Oxidized Bronze', category: 'Craftsmanship', author: 'Apriliha Singh', status: 'Published', date: 'Dec 15, 2024' },
              { title: "Jaipur's Gemstone Heritage", category: 'Story', author: 'Apriliha Singh', status: 'Published', date: 'Nov 28, 2024' },
              { title: 'Building Your First Mala', category: 'Guide', author: 'Apriliha Singh', status: 'Published', date: 'Nov 10, 2024' },
              { title: 'Quiet Luxury in Design', category: 'Editorial', author: 'Apriliha Singh', status: 'Draft', date: '—' },
            ].map((article) => (
              <tr key={article.title} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{article.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{article.category}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{article.author}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2 py-1 text-xs rounded ${
                    article.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {article.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{article.date}</td>
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
