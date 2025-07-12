import { useEffect, useState } from "react";
import type { Route } from "./+types/dashboard";
import { onAuthStateChanged, signOut, type User as FirebaseUser } from "firebase/auth";
import { auth, db } from "~/firebase/config";
import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import type { User as AppUser } from "~/models/user";
import { NavBar } from "../home/navbar";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "ReWear - Dashboard" },
    { name: "description", content: "Manage your ReWear profile, items, and transactions" },
  ];
}

export default function Dashboard() {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [soldItemTitles, setSoldItemTitles] = useState<string[]>([]);

  const fetchSoldItemTitles = async (itemIds: string[]) => {
    try {
      const titles: string[] = [];
      for (const itemId of itemIds) {
        const itemRef = doc(db, "products", itemId);
        const itemSnap = await getDoc(itemRef);
        if (itemSnap.exists()) {
          const data = itemSnap.data();
          titles.push(data.title);
        }
      }
      setSoldItemTitles(titles);
    } catch (error) {
      console.error("Error fetching sold item titles:", error);
    }
  };



  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = "/login";
        return;
      }
      setFirebaseUser(user);

      try {
        const docRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(docRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          // Validate required properties to ensure it matches AppUser structure
          const userData: AppUser = {
            userId: user.uid,
            firstName: data.firstName,
            lastName: data.lastName || "",
            emailId: data.emailId,
            age: data.age || 18,
            points: data.points ?? 50,
            role: data.role || "user",
            cart: data.cart || [],
            soldItems: data.soldItems || [],
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          };
          setUserData(userData);
          if (userData.soldItems.length > 0) {
            await fetchSoldItemTitles(userData.soldItems);
          }
        } else {
          console.error("User document not found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p className="text-center py-8">Loading your dashboard...</p>;
  }

  if (!firebaseUser || !userData) {
    return <p className="text-center text-red-500">Failed to load user data.</p>;
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-indigo-900">
                {userData.firstName} {userData.lastName || ""}
              </h1>
              <p className="text-sm text-gray-600">{userData.emailId}</p>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="bg-gradient-to-r from-green-100 to-green-200 px-4 py-2 rounded-lg text-green-900 shadow">
                <span className="block text-sm">Points</span>
                <span className="text-xl font-bold">{userData.points}</span>
              </div>
              <a
                href="/addproduct"
                className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-green-500 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-green-600 transition"
              >
                Add New Item
              </a>
              <button
                onClick={handleLogout}
                className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Welcome to ReWear</h2>
          <p className="text-gray-600">
            You currently have <strong>{userData.points}</strong> points to redeem.
          </p>
          {/* You can later fetch and render user’s soldItems and cart based on item IDs */}
        </div>

        <div>
          {soldItemTitles.length > 0 && (
            <div className="bg-white rounded-xl shadow p-6 mt-6 border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Your Shared Items</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {soldItemTitles.map((title, index) => (
                  <li key={index}>{title}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
