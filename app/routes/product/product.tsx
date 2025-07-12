import { useParams } from "react-router";
import type { Route } from "./+types/product";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ReWear - Product Details" },
    { name: "description", content: "View and exchange clothing items on ReWear" },
  ];
}

export default function Product() {
  const { productId } = useParams();
  
  // Mock data - would be fetched from API in real implementation
  const product = {
    id: productId,
    title: "Vintage Denim Jacket",
    images: [
      "/images/denim-jacket-1.jpg", 
      "/images/denim-jacket-2.jpg", 
      "/images/denim-jacket-3.jpg"
    ],
    description: "Classic vintage denim jacket in excellent condition. Medium wash with minimal wear. Perfect for layering in any season.",
    category: "Outerwear",
    type: "Jacket",
    size: "Medium",
    condition: "Excellent",
    tags: ["denim", "vintage", "casual"],
    pointValue: 50,
    available: true,
    uploader: {
      name: "Jane Doe",
      id: "user123",
      rating: 4.8,
      itemsShared: 15,
      profileImage: "/images/user-avatar.jpg"
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl bg-gradient-to-br from-indigo-50 via-white to-green-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-indigo-100 to-green-100 rounded-xl overflow-hidden h-96 shadow">
            {product.images.length > 0 ? (
              <img 
                src={product.images[0]} 
                alt={product.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/600x400?text=No+Image";
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-200">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>
          {/* Thumbnail Gallery */}
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <div key={index} className="w-24 h-24 flex-shrink-0">
                <img 
                  src={image} 
                  alt={`${product.title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-indigo-500 transition"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/100?text=No+Image";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Right Column - Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium shadow
              ${product.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {product.available ? "Available" : "Not Available"}
            </div>
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
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-gradient-to-r from-indigo-100 to-green-100 text-indigo-700 px-2 py-1 rounded-md text-xs font-medium shadow"
              >
                #{tag}
              </span>
            ))}
          </div>
          {/* Uploader Information */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold mb-2">Listed by</h2>
            <div className="flex items-center space-x-3">
              <img 
                src={product.uploader.profileImage} 
                alt={product.uploader.name}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/50?text=User";
                }}
              />
              <div>
                <p className="font-medium">{product.uploader.name}</p>
                <div className="flex items-center text-sm">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{product.uploader.rating} • {product.uploader.itemsShared} items shared</span>
                </div>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          {product.available && (
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-indigo-600 to-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-green-600 shadow transition flex-grow">
                Request Swap
              </button>
              <button className="bg-gradient-to-r from-green-600 to-indigo-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-indigo-600 shadow transition flex-grow">
                Redeem ({product.pointValue} Points)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
