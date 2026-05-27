import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

import { db } from "../firebase/config"; 
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDocs, 
  serverTimestamp,
  addDoc
} from "firebase/firestore";
import { useAuthContext } from "./AuthContext"; 

import type {
  Product,
} from "./ProductsContext";

import {
  Queue,
} from "../Helpers/Queue";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  addToCart: (product: Product & { quantity?: number }) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  checkout: () => Promise<string | null>;
  isCheckingOut: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const CartProvider = ({ children }: Props) => {
  const { user } = useAuthContext(); 
  
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const cartQueueRef = useRef(new Queue<CartItem>());

  // Mantener queue sincronizada con items
  useEffect(() => {
    cartQueueRef.current.load(items);
  }, [items]);

  // ================= CARGA INICIAL DESDE FIREBASE =================
  // Al recargar la página, los items del carrito se recuperan desde Firebase
  useEffect(() => {
    if (!user) {
      setItems([]);
      setInitialLoaded(true);
      return;
    }

    const loadCartFromFirebase = async () => {
      try {
        const itemsCollectionRef = collection(db, "users", user.uid, "ITEMS");
        const snapshot = await getDocs(itemsCollectionRef);

        if (snapshot.empty) {
          setInitialLoaded(true);
          return;
        }

        const loadedItems: CartItem[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: data.id,
            title: data.title,
            price: data.price,
            quantity: data.quantity,
            images: data.images || [],
            description: data.description || "",
            fullDescription: data.fullDescription || "",
            category: data.category || "gaming",
            subCategory: data.subCategory || [],
          } as CartItem;
        });

        setItems(loadedItems);
      } catch (error) {
        console.error("Error cargando carrito:", error);
      } finally {
        setInitialLoaded(true);
      }
    };

    loadCartFromFirebase();
  }, [user]);

  // ================= SINCRO HACIA FIREBASE =================
  useEffect(() => {
    // Solo sincronizar después de la carga inicial y si hay usuario
    if (!initialLoaded || !user) return;

    const syncCartWithFirebase = async () => {
      try {
        const itemsCollectionRef = collection(db, "users", user.uid, "ITEMS");
        const snapshot = await getDocs(itemsCollectionRef);

        if (items.length === 0) {
          const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
          await Promise.all(deletePromises);
          return;
        }

        const localDocTitles = items.map(item => item.title.trim());

        const deletePromises = snapshot.docs
          .filter(doc => !localDocTitles.includes(doc.id))
          .map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        const writePromises = items.map(item => {
          const cleanTitleId = item.title.trim();
          const itemDocRef = doc(db, "users", user.uid, "ITEMS", cleanTitleId);
          
          return setDoc(itemDocRef, {
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            images: item.images || []
          }, { merge: true });
        });
        await Promise.all(writePromises);

      } catch (error) {
        console.error("Error al sincronizar ITEMS en Firestore:", error);
      }
    };

    syncCartWithFirebase();
  }, [items, user, initialLoaded]);

  // ================= ADD / UPDATE QUANTITY =================
  const addToCart = (product: Product & { quantity?: number }) => {
    const amountChange = product.quantity !== undefined ? product.quantity : 1;

    setItems(prev => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id 
            ? { 
                ...item, 
                title: product.title || item.title,
                price: product.price || item.price,
                images: product.images || item.images,
                quantity: item.quantity + amountChange 
              } 
            : item
        ).filter(item => item.quantity > 0);
      } else {
        const newItem: CartItem = { 
          ...product, 
          quantity: amountChange > 0 ? amountChange : 1 
        };
        cartQueueRef.current.enqueue(newItem);
        return [...prev, newItem];
      }
    });
  };

  // ================= REMOVE =================
  const removeFromCart = (productId: number) => {
    setItems(prev => prev.filter((item) => item.id !== productId));
  };

  // ================= CLEAR =================
  const clearCart = () => {
    cartQueueRef.current.clear();
    setItems([]);
  };

  // ================= CHECKOUT =================
  const checkout = async (): Promise<string | null> => {
    if (items.length === 0 || !user) return null;

    setIsCheckingOut(true);

    try {
      const products = cartQueueRef.current.processAll((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      }));

      const total = products.reduce(
        (acc, p) => acc + p.price * p.quantity, 0
      );

      const orderData = {
        date: serverTimestamp(), 
        total,
        status: "completed",
        products,
      };

      const ordersCollectionRef = collection(db, "users", user.uid, "ORDERS");
      const docRef = await addDoc(ordersCollectionRef, orderData);
      
      setItems([]);
      return docRef.id;
    } catch (error) {
      console.error("Error al procesar la compra en ORDERS:", error);
      throw error;
    } finally {
      setIsCheckingOut(false);
    }
  };

  // ================= TOTAL ITEMS =================
  const totalItems = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
        isCheckingOut,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};