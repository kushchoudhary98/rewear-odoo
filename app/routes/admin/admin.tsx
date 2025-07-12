import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { db, auth } from "~/firebase/config";
import type { Route } from "./+types/admin";
import type { Item } from "~/models/item";
import type { User as AppUser } from "~/models/user";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "ReWear - Admin Panel" },
        { name: "description", content: "Moderate and approve/reject item listings" },
    ];
}

interface PendingItem extends Item {
    uploaderName?: string;
}

export default function Admin() {
    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // null = loading, false = not admin, true = is admin
    const [pendingItems, setPendingItems] = useState<PendingItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdminAndFetch = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (!user) {
                    window.location.href = "/login";
                    return;
                }

                setCurrentUser(user);

                const userDocRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userDocRef);

                if (!userSnap.exists()) {
                    setIsAdmin(false);
                    return;
                }

                const userData = userSnap.data() as AppUser;

                if (userData.role !== "admin") {
                    setIsAdmin(false);
                    return;
                }

                setIsAdmin(true);

                // Now fetch pending items
                const q = query(collection(db, "products"), where("status", "==", "pending"));
                const snapshot = await getDocs(q);

                const items: PendingItem[] = [];

                for (const docSnap of snapshot.docs) {
                    const item = docSnap.data() as Item;
                    const itemId = docSnap.id;

                    let uploaderName = "Unknown";

                    //   try {
                    //     const userSnap = await getDoc(doc(db, "users", item.userId));
                    //     if (userSnap.exists()) {
                    //       const u = userSnap.data();
                    //       uploaderName = `${u.firstName} ${u.lastName || ""}`;
                    //     }
                    //   } catch { }

                    items.push({ ...item, itemId, uploaderName });
                }

                setPendingItems(items);
                setLoading(false);
            });
        };

        checkAdminAndFetch();
    }, []);

    const handleUpdateStatus = async (itemId: string, status: "approved" | "rejected") => {
        try {
            const itemRef = doc(db, "products", itemId);
            await updateDoc(itemRef, {
                status,
                updatedAt: new Date(),
            });
            setPendingItems(pendingItems.filter((item) => item.itemId !== itemId));
        } catch (error) {
            console.error("Failed to update item status:", error);
        }
    };

    const handleRemove = async (itemId: string) => {
        try {
            await deleteDoc(doc(db, "products", itemId));
            setPendingItems(pendingItems.filter((item) => item.itemId !== itemId));
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    if (isAdmin === null) return <p className="text-center mt-10">Checking admin access...</p>;
    if (isAdmin === false) return <p className="text-center text-red-600 mt-10 font-semibold">Access Denied. You are not an admin.</p>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-[80%] bg-gradient-to-br from-indigo-50 via-white to-green-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-indigo-900">Admin Panel</h1>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Pending Item Listings</h2>

                {loading ? (
                    <p className="text-gray-500">Loading pending items...</p>
                ) : pendingItems.length === 0 ? (
                    <p className="text-gray-500">No pending items found.</p>
                ) : (
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
                                <tr key={item.itemId} className="hover:bg-indigo-50 transition">
                                    <td className="px-4 py-2">
                                        <img
                                            src={item.imageUrls[0]}
                                            alt={item.title}
                                            className="w-16 h-16 object-cover rounded shadow"
                                            onError={(e) => {
                                                const fallbackImages = [
                                                    "https://source.unsplash.com/64x64/?clothing",
                                                    "https://source.unsplash.com/64x64/?fashion",
                                                    "https://source.unsplash.com/64x64/?shirt",
                                                    "https://source.unsplash.com/64x64/?jacket",
                                                    "https://source.unsplash.com/64x64/?outfit",
                                                    "https://source.unsplash.com/64x64/?dress",
                                                    "https://source.unsplash.com/64x64/?tshirt",
                                                    "https://source.unsplash.com/64x64/?denim",
                                                ];
                                                const randomIndex = Math.floor(Math.random() * fallbackImages.length);
                                                e.currentTarget.src = fallbackImages[randomIndex];
                                            }}
                                        />
                                    </td>
                                    <td className="px-4 py-2">{item.title}</td>
                                    <td className="px-4 py-2">{item.uploaderName}</td>
                                    <td className="px-4 py-2">
                                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold shadow">
                                            Pending
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 space-x-2">
                                        <button
                                            onClick={() => handleUpdateStatus(item.itemId, "approved")}
                                            className="bg-gradient-to-r from-green-600 to-green-400 text-white px-3 py-1 rounded hover:from-green-700 hover:to-green-500 text-xs shadow transition"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(item.itemId, "rejected")}
                                            className="bg-gradient-to-r from-red-600 to-red-400 text-white px-3 py-1 rounded hover:from-red-700 hover:to-red-500 text-xs shadow transition"
                                        >
                                            Reject
                                        </button>
                                        <button
                                            onClick={() => handleRemove(item.itemId)}
                                            className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 text-xs shadow transition"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
