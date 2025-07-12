import { useEffect, useState } from "react";
import type { Route } from "./+types/dashboard";
import { Link } from "react-router";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "~/firebase/config";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "ReWear - Dashboard" },
    { name: "description", content: "Manage your ReWear profile, items, and transactions" },
  ];
}

export default function Dashboard() {
  const fakeUser = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    points: 250,
    profileImage: "/images/fakeUser-avatar.jpg",
    itemsShared: 15,
    itemsRedeemed: 8,
    recentItems: [
      {
        id: "item1",
        title: "Vintage Denim Jacket",
        image: "/images/denim-jacket-1.jpg",
        pointValue: 50,
        status: "Available"
      },
      {
        id: "item2",
        title: "Summer Dress",
        image: "/images/dress-1.jpg",
        pointValue: 40,
        status: "Pending"
      },
      {
        id: "item3",
        title: "Leather Boots",
        image: "/images/boots-1.jpg",
        pointValue: 60,
        status: "Exchanged"
      },
    ],
    transactions: [
      {
        id: "tx1",
        type: "Received",
        points: 50,
        date: "2023-05-15",
        description: "Item shared: Vintage Denim Jacket"
      },
      {
        id: "tx2",
        type: "Spent",
        points: 60,
        date: "2023-04-28",
        description: "Item redeemed: Canvas Sneakers"
      },
      {
        id: "tx3",
        type: "Received",
        points: 40,
        date: "2023-04-10",
        description: "Item shared: Summer Dress"
      },
    ]
  };

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out!");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        window.location.href = "/login";
        return;
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <>
      {loading ? <p>Loading...</p> : <p>Welcome, {user?.email}! <button onClick={handleLogout}>Logout</button></p>}
    </>
    // <div className="container mx-auto px-4 py-8 max-w-7xl bg-gradient-to-br from-indigo-50 via-white to-green-50 min-h-screen">
    //   {/* Profile Summary */}
    //   <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
    //     <div className="flex flex-col md:flex-row md:items-center">
    //       <div className="flex items-center mb-4 md:mb-0">
    //         <img
    //           src={fakeUser.profileImage}
    //           alt={fakeUser.name}
    //           className="w-20 h-20 rounded-full object-cover mr-6"
    //           onError={(e) => {
    //             e.currentTarget.src = "https://via.placeholder.com/80?text=fakeUser";
    //           }}
    //         />
    //         <div>
    //           <h1 className="text-2xl font-bold">{fakeUser.name}</h1>
    //           <p className="text-gray-600">{fakeUser.email}</p>
    //         </div>
    //       </div>
    //       <div className="md:ml-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
    //         <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-900 px-4 py-2 rounded-lg shadow">
    //           <span className="block text-sm">Available Points</span>
    //           <span className="text-xl font-bold">{fakeUser.points}</span>
    //         </div>
    //         <Link
    //           to="/addproduct"
    //           className="bg-gradient-to-r from-indigo-600 to-green-500 text-white py-2 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-green-600 shadow transition"
    //         >
    //           Add New Item
    //         </Link>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Stats */}
    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    //     <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
    //       <h2 className="text-xl font-semibold mb-2">Items Shared</h2>
    //       <p className="text-3xl font-bold text-indigo-600">{fakeUser.itemsShared}</p>
    //     </div>
    //     <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
    //       <h2 className="text-xl font-semibold mb-2">Items Redeemed</h2>
    //       <p className="text-3xl font-bold text-green-600">{fakeUser.itemsRedeemed}</p>
    //     </div>
    //     <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
    //       <h2 className="text-xl font-semibold mb-2">Total Points Earned</h2>
    //       <p className="text-3xl font-bold text-yellow-500">{fakeUser.points + 180}</p>
    //     </div>
    //   </div>

    //   {/* Your Items */}
    //   <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
    //     <h2 className="text-xl font-semibold mb-4">Your Items</h2>
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //       {fakeUser.recentItems.map((item) => (
    //         <div key={item.id} className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition">
    //           <div className="h-48 bg-gray-200">
    //             <img
    //               src={item.image}
    //               alt={item.title}
    //               className="w-full h-full object-cover"
    //               onError={(e) => {
    //                 e.currentTarget.src = "https://via.placeholder.com/300x200?text=No+Image";
    //               }}
    //             />
    //           </div>
    //           <div className="p-4">
    //             <h3 className="font-semibold">{item.title}</h3>
    //             <div className="flex justify-between items-center mt-2">
    //               <span className="text-indigo-600 font-medium">{item.pointValue} points</span>
    //               <span className={`px-2 py-1 rounded-full text-xs font-medium
    //                 ${item.status === 'Available' ? 'bg-green-100 text-green-800' : 
    //                   item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
    //                   'bg-gray-100 text-gray-800'}`}>
    //                 {item.status}
    //               </span>
    //             </div>
    //             <Link
    //               to={`/product/${item.id}`}
    //               className="mt-3 block text-center text-sm text-indigo-600 hover:text-indigo-800 font-medium"
    //             >
    //               View Details
    //             </Link>
    //           </div>
    //         </div>
    //       ))}
    //       <div className="border border-dashed rounded-xl flex items-center justify-center h-64 bg-gray-50 hover:bg-gray-100 transition">
    //         <Link
    //           to="/addproduct"
    //           className="text-indigo-600 hover:text-indigo-800 flex flex-col items-center"
    //         >
    //           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    //           </svg>
    //           <span className="font-medium">Add New Item</span>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Recent Transactions */}
    //   <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
    //     <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
    //     <div className="overflow-x-auto">
    //       <table className="min-w-full divide-y divide-gray-200">
    //         <thead className="bg-gray-50">
    //           <tr>
    //             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
    //             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
    //             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
    //             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
    //           </tr>
    //         </thead>
    //         <tbody className="bg-white divide-y divide-gray-200">
    //           {fakeUser.transactions.map((tx) => (
    //             <tr key={tx.id}>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <span className={`inline-flex px-2 text-xs font-semibold rounded-full
    //                   ${tx.type === 'Received' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
    //                   {tx.type}
    //                 </span>
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <span className={tx.type === 'Received' ? 'text-green-600' : 'text-red-600'}>
    //                   {tx.type === 'Received' ? '+' : '-'}{tx.points}
    //                 </span>
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.date}</td>
    //               <td className="px-6 py-4 text-sm text-gray-500">{tx.description}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>
  );
}
