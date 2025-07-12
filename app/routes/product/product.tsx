import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "~/firebase/config";
import { NavBar } from "../home/navbar";
import type { Route } from "./+types/product";
import type { Item } from "~/models/item";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ReWear - Product Details" },
    { name: "description", content: "View and exchange clothing items on ReWear" },
  ];
}

export default function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduct({ itemId: docSnap.id, ...data } as Item);
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div className="text-center py-8">Loading product...</div>;
  }

  if (!product) {
    return <div className="text-center py-8 text-red-500">Product not found.</div>;
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8 max-w-7xl bg-gradient-to-br from-indigo-50 via-white to-green-50 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-indigo-100 to-green-100 rounded-xl overflow-hidden h-96 shadow">
              {product.imageUrls.length > 0 ? (
                <img
                  src={product.imageUrls[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/300x400?text=No+Image";
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {product.imageUrls.map((url, index) => (
                <div key={index} className="w-24 h-24 flex-shrink-0">
                  <img
                    src={url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover rounded-md border-2 border-transparent hover:border-indigo-500 transition"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/100?text=No+Image";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium shadow ${
              product.status === "approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            }`}>
              {product.status}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 block">Category</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div>
                <span className="text-gray-600 block">Type</span>
                <span className="font-medium">{product.type}</span>
              </div>
              <div>
                <span className="text-gray-600 block">Size</span>
                <span className="font-medium">{product.size}</span>
              </div>
              <div>
                <span className="text-gray-600 block">Condition</span>
                <span className="font-medium">{product.condition}</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition flex-grow">
                Request Swap
              </button>
              <button className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition flex-grow">
                Redeem
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
