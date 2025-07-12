import { useEffect, useState } from 'react';
import type { Route } from "./+types/addProduct";
import { auth, storage, db } from '~/firebase/config';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, type User } from 'firebase/auth';
import type { Item, ItemCategory, ItemCondition, ItemSize } from '~/models/item';
import { serverTimestamp } from 'firebase/database';
import { addDoc, arrayUnion, collection, doc, updateDoc, type Timestamp } from 'firebase/firestore';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "ReWear - Add Product" },
        { name: "description", content: "Add a new item to share on ReWear" },
    ];
}

export default function AddProduct() {

    const [user, setUser] = useState<User | null>(null);
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

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

    // Upload images to Firebase Storage and return their URLs
    const uploadImages = async (files: File[]) => {
        const urls: string[] = [];
        for (const file of files) {
            const imageRef = ref(storage, `product-images/${Date.now()}-${file.name}`);
            await uploadBytes(imageRef, file);
            const url = await getDownloadURL(imageRef);
            urls.push(url);
        }
        return urls;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUploading(true);
        setUploadError(null);

        if (!user) {
            setUploadError("You must be logged in to upload.");
            setUploading(false);
            return;
        }

        // if (images.length === 0) {
        //     setUploadError("Please upload at least one image.");
        //     setUploading(false);
        //     return;
        // }

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            // Step 1: Upload images and get URLs
            //const imageUrls = await uploadImages(images);
            const imageUrls: string[] = [];

            // Step 2: Extract form values
            const newItem: Omit<Item, 'itemId'> = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                category: formData.get('category') as ItemCategory,
                type: formData.get('type') as string,
                size: formData.get('size') as ItemSize,
                condition: formData.get('condition') as ItemCondition,
                imageUrls,
                status: 'pending', // default
                createdAt: serverTimestamp() as Timestamp,
                updatedAt: serverTimestamp() as Timestamp,
            };

            // Step 3: Save item to Firestore
            const docRef = await addDoc(collection(db, "products"), newItem);

            // Step 4: Success feedback
            alert("Item listed successfully!");
            console.log("Item added with ID:", docRef.id);

            if (!auth.currentUser) {
                throw new Error("User not authenticated");
            }

            const userRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(userRef, {
                soldItems: arrayUnion(docRef.id),
            });

            form.reset();
            setImages([]);
            setPreviews([]);
        } catch (err: any) {
            console.error("Failed to upload item:", err);
            setUploadError("Something went wrong. Please try again.");
        } finally {
            setUploading(false);
        }
    };


    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                window.location.href = "/login";
                return;
            }
            setUser(currentUser);
        });

        return () => unsub();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl bg-gradient-to-br from-green-50 via-white to-indigo-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-indigo-900">Add New Item</h1>

            <form className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100" onSubmit={handleSubmit}>
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
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                                <option value="Unisex">Unisex</option>
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
                                <option value="New with tags">New</option>
                                <option value="Excellent">Excellent</option>
                                <option value="Moderately Used">Moderately Used</option>
                                <option value="Worn">Worn</option>
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

                {uploadError && <p className="text-red-500 mb-2">{uploadError}</p>}
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-green-500 text-white rounded-lg hover:from-indigo-700 hover:to-green-600 shadow transition"
                        disabled={uploading}
                    >
                        {uploading ? "Uploading..." : "List Item"}
                    </button>
                </div>
            </form>
        </div>
    );
}
