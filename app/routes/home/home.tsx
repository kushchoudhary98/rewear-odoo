import { Link } from "react-router";
import type { Route } from "./+types/home";
import { NavBar } from "./navbar";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "~/firebase/config";
import FeaturedProducts from "./FeaturedProduct";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "ReWear - Sustainable Clothing Exchange" },
    { name: "description", content: "Exchange and redeem second-hand clothing items on ReWear" },
  ];
}

export default function Home() {
  const featuredProducts = [
    {
      id: "prod1",
      title: "Vintage Denim Jacket",
      image: "/images/denim-jacket-1.jpg",
      category: "Outerwear",
      size: "M",
      condition: "Excellent",
      points: 50
    },
    {
      id: "prod2",
      title: "Summer Floral Dress",
      image: "/images/dress-1.jpg",
      category: "Dresses",
      size: "S",
      condition: "Like new",
      points: 45
    },
    {
      id: "prod3",
      title: "Leather Ankle Boots",
      image: "/images/boots-1.jpg",
      category: "Footwear",
      size: "EU 39",
      condition: "Good",
      points: 60
    },
    {
      id: "prod4",
      title: "Cotton Sweater",
      image: "/images/sweater-1.jpg",
      category: "Tops",
      size: "L",
      condition: "Excellent",
      points: 35
    },
  ];

  // Categories for the filter section
  const categories = [
    { name: "All", icon: "grid" },
    { name: "Tops", icon: "shirt" },
    { name: "Bottoms", icon: "pants" },
    { name: "Dresses", icon: "dress" },
    { name: "Outerwear", icon: "jacket" },
    { name: "Footwear", icon: "shoe" },
    { name: "Accessories", icon: "watch" },
  ];

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, []);

  return (
    <>
    <NavBar />
      <div className="bg-gradient-to-br from-indigo-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 max-w-5xl">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
                Sustainable Fashion Exchange
              </h1>
              <p className="text-lg mb-8 text-grey-400">
                Give your clothes a second life and earn points to redeem other items.
                Join our community to reduce waste and refresh your wardrobe sustainably.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-green-400 to-indigo-600 hover:from-green-500 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition"
                >
                  Join ReWear
                </Link>
                <Link
                  to="/dashboard"
                  className="bg-white hover:bg-gray-100 text-indigo-900 font-bold py-3 px-6 rounded-lg shadow-lg transition"
                >
                  Browse Items
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">How ReWear Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-indigo-100 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Share Your Items</h3>
                <p className="text-gray-600">
                  List clothing items you no longer need and earn points based on their condition and quality.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Earn Points</h3>
                <p className="text-gray-600">
                  Accumulate points for each item shared. Higher quality items earn more points.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Redeem Items</h3>
                <p className="text-gray-600">
                  Use your earned points to get items from other members, refreshing your wardrobe sustainably.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Items */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Items</h2>
              <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-medium">
                View all
              </Link>
            </div>

            {/* Category Filters */}
            <div className="flex overflow-x-auto space-x-4 pb-4 mb-6">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`flex items-center px-4 py-2 whitespace-nowrap rounded-full border shadow-sm transition ${index === 0
                      ? "bg-gradient-to-r from-indigo-600 to-green-500 text-white border-indigo-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Featured Products Grid */}
            <FeaturedProducts />
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 bg-indigo-900 text-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">1,500+</p>
                <p className="text-xl">Items Exchanged</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">750</p>
                <p className="text-xl">Active Members</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">2,000kg</p>
                <p className="text-xl">Textile Waste Saved</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">5</p>
                <p className="text-xl">Local Communities</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gradient-to-br from-green-50 via-white to-indigo-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Members Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                <div className="flex items-center mb-4">
                  <img
                    src="/images/user1.jpg"
                    alt="User"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/48?text=User";
                    }}
                  />
                  <div>
                    <p className="font-semibold">Emma Johnson</p>
                    <div className="flex text-yellow-400">
                      <span>★★★★★</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "ReWear has completely changed how I think about fashion. I've found amazing pieces
                  and cleared out my closet guilt-free. The community is so supportive!"
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                <div className="flex items-center mb-4">
                  <img
                    src="/images/user2.jpg"
                    alt="User"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/48?text=User";
                    }}
                  />
                  <div>
                    <p className="font-semibold">Marcus Chen</p>
                    <div className="flex text-yellow-400">
                      <span>★★★★★</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I was skeptical at first, but after my first exchange, I was hooked.
                  The quality of items is consistently high, and the point system is fair."
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                <div className="flex items-center mb-4">
                  <img
                    src="/images/user3.jpg"
                    alt="User"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/48?text=User";
                    }}
                  />
                  <div>
                    <p className="font-semibold">Sophia Rodriguez</p>
                    <div className="flex text-yellow-400">
                      <span>★★★★☆</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "As a student on a budget, ReWear has been a game-changer. I can keep my wardrobe fresh
                  without spending money or contributing to fast fashion."
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
