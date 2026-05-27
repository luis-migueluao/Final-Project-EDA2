import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/config";

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
  fullDescription: string;
  category: "gaming" | "software" | "subscriptions";
  subCategory: string[];
  featured?: boolean;
  bestSeller?: boolean;
}

interface ProductsContextType {
  products: Product[];
  loading: boolean;
}

const ProductsContext =
  createContext<ProductsContextType>({
    products: [],
    loading: true,
  });

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = collection(db, "products");

    const unsub = onSnapshot(ref, (snap) => {
      const data: Product[] = snap.docs.map((doc) => ({
        ...(doc.data() as Product),
        id: Number(doc.id), // importante
      }));

      setProducts(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);