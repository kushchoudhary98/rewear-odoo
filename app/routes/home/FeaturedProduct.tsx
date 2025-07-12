import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  type DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "~/firebase/config";
import type { Item } from "~/models/item";

const PAGE_SIZE = 8;

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Item[]>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (initial = false) => {
    try {
      const baseQuery = query(
        collection(db, "products"),
        orderBy("createdAt", "desc"),
        limit(PAGE_SIZE)
      );

      const paginatedQuery = !initial && lastDoc
        ? query(baseQuery, startAfter(lastDoc))
        : baseQuery;

      const querySnapshot = await getDocs(paginatedQuery);

      const newItems: Item[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        newItems.push({
          ...(data as Item),
          itemId: doc.id,
        });
      });

      if (initial) {
        setProducts(newItems);
      } else {
        setProducts((prev) => [...prev, ...newItems]);
      }

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastDoc(lastVisible);
      setHasMore(querySnapshot.docs.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      initial ? setLoading(false) : setMoreLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(true);
  }, []);

  if (loading) return <p className="text-center py-6">Loading featured products...</p>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <a
            key={product.itemId}
            href={`/product/${product.itemId}`}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform"
          >
            <div className="h-64 bg-gradient-to-br from-indigo-100 to-green-100">
              <div className="bg-green-200"></div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">{product.category}</span>
                <span className="text-indigo-600 font-medium">50 pts</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Size: {product.size}</span>
                <span>Condition: {product.condition}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={() => {
              setMoreLoading(true);
              fetchProducts(false);
            }}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {moreLoading ? "Loading..." : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
}
