import type { Route } from "./+types/admin";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ReWear - Admin Panel" },
    { name: "description", content: "Moderate and approve/reject item listings" },
  ];
}

export default function Admin() {
  // Mock data for pending items
  const pendingItems = [
    {
      id: "item1",
      title: "Vintage Denim Jacket",
      image: "/images/denim-jacket-1.jpg",
      uploader: "Jane Doe",
      status: "Pending",
    },
    {
      id: "item2",
      title: "Summer Dress",
      image: "/images/dress-1.jpg",
      uploader: "John Smith",
      status: "Pending",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl bg-gradient-to-br from-indigo-50 via-white to-green-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-indigo-900">Admin Panel</h1>
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Pending Item Listings</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Uploader</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {pendingItems.map((item) => (
              <tr key={item.id} className="hover:bg-indigo-50 transition">
                <td className="px-4 py-2">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded shadow" onError={e => { e.currentTarget.src = "https://via.placeholder.com/64?text=No+Image"; }} />
                </td>
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.uploader}</td>
                <td className="px-4 py-2">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold shadow">{item.status}</span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button className="bg-gradient-to-r from-green-600 to-green-400 text-white px-3 py-1 rounded hover:from-green-700 hover:to-green-500 text-xs shadow transition">Approve</button>
                  <button className="bg-gradient-to-r from-red-600 to-red-400 text-white px-3 py-1 rounded hover:from-red-700 hover:to-red-500 text-xs shadow transition">Reject</button>
                  <button className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 text-xs shadow transition">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-sm text-gray-500 mt-4">This is a mock admin panel. Actions are not functional.</p>
      </div>
    </div>
  );
}
