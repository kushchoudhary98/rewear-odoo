import { useState } from 'react';
import type { Route } from "./+types/addProduct";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ReWear - Add Product" },
    { name: "description", content: "Add a new item to share on ReWear" },
  ];
}

export default function AddProduct() {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5); // Limit to 5 images
      setImages([...images, ...filesArray]);
      
      // Create preview URLs
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPreviews([...previews, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    
    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl bg-gradient-to-br from-green-50 via-white to-indigo-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-indigo-900">Add New Item</h1>
      
      <form className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Item Photos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative">
                <img src={preview} alt={`Preview ${index}`} className="w-full h-32 object-cover rounded-lg border-2 border-indigo-100 shadow" />
                <button 
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
            {previews.length < 5 && (
              <div className="w-full h-32 border-2 border-dashed border-indigo-200 rounded-lg flex items-center justify-center bg-indigo-50 hover:bg-indigo-100 transition">
                <label className="cursor-pointer text-center p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="block text-sm text-gray-500">Add Photo</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handleImageChange} 
                    className="hidden" 
                  />
                </label>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500">Upload up to 5 photos. First photo will be the cover image.</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Item Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Item Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="e.g. Vintage Denim Jacket"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              >
                <option value="">Select a category</option>
                <option value="tops">Tops</option>
                <option value="bottoms">Bottoms</option>
                <option value="outerwear">Outerwear</option>
                <option value="dresses">Dresses</option>
                <option value="footwear">Footwear</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <input
                type="text"
                id="type"
                name="type"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="e.g. Jacket, Shirt, Pants"
              />
            </div>
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <select
                id="size"
                name="size"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              >
                <option value="">Select a size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                Condition
              </label>
              <select
                id="condition"
                name="condition"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              >
                <option value="">Select condition</option>
                <option value="New with tags">New with tags</option>
                <option value="Like new">Like new</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
            <div>
              <label htmlFor="pointValue" className="block text-sm font-medium text-gray-700 mb-1">
                Point Value
              </label>
              <input
                type="number"
                id="pointValue"
                name="pointValue"
                min="10"
                max="100"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="50"
              />
              <p className="text-xs text-gray-500 mt-1">Suggest between 10-100 based on condition and brand</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="Describe your item, including details about brand, materials, measurements, etc."
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags (separate with commas)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="e.g. vintage, denim, blue, casual"
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-green-500 text-white rounded-lg hover:from-indigo-700 hover:to-green-600 shadow transition"
          >
            List Item
          </button>
        </div>
      </form>
    </div>
  );
}
