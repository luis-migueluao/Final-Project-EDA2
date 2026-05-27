import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import type { Product } from "../Context/ProductsContext";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snap) => {
      const data: Product[] = snap.docs.map((doc) => {
        const d = doc.data();

        return {
          id: Number(d.id),
          title: d.title,
          price: d.price,
          images: d.images || [],
          description: d.description,
          fullDescription: d.fullDescription,
          category: d.category,
          subCategory: d.subCategory || [],
          featured: d.featured,
          bestSeller: d.bestSeller,
        };
      });

      setProducts(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { products, loading };
};