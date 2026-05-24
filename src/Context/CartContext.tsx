import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
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
} from "../data/storeData";

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
  const [cartQueue] = useState(new Queue<CartItem>());
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);

  // ================= EFECTO: SINCRO EN TIEMPO REAL CON EL NOMBRE EXACTO DEL PRODUCTO =================
  useEffect(() => {
    if (!user) return;

    const syncCartWithFirebase = async () => {
      try {
        const itemsCollectionRef = collection(db, "users", user.uid, "ITEMS");
        const snapshot = await getDocs(itemsCollectionRef);

        // Si el carrito está vacío, borramos todo en Firebase
        if (items.length === 0) {
          const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
          await Promise.all(deletePromises);
          return;
        }

        // Ahora los IDs en Firebase serán exactamente el TITLE del producto
        const localDocTitles = items.map(item => item.title.trim());

        // 1. Borramos los documentos antiguos cuyo nombre/ID de documento ya no esté en el carrito
        // Esto eliminará los documentos llamados "2", "9" o nombres viejos automáticamente
        const deletePromises = snapshot.docs
          .filter(doc => !localDocTitles.includes(doc.id))
          .map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        // 2. Guardamos o actualizamos usando el string del TITLE como nombre/ID del documento
        const writePromises = items.map(item => {
          const cleanTitleId = item.title.trim();
          
          // Creamos la referencia usando el TITLE exacto como nombre del documento
          const itemDocRef = doc(db, "users", user.uid, "ITEMS", cleanTitleId);
          
          return setDoc(itemDocRef, {
            id: item.id,       // El ID original (2 o 9) se queda bien guardado aquí adentro
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
  }, [items, user]);


  // ================= ADD / UPDATE QUANTITY =================
  const addToCart = (product: Product & { quantity?: number }) => {
    const existing = items.find((item) => item.id === product.id);
    let updatedItems: CartItem[] = [];

    const amountChange = product.quantity !== undefined ? product.quantity : 1;

    if (existing) {
      updatedItems = items.map((item) =>
        item.id === product.id 
          ? { 
              ...item, 
              title: product.title || item.title,
              price: product.price || item.price,
              images: product.images || item.images,
              quantity: item.quantity + amountChange 
            } 
          : item
      );
      
      updatedItems = updatedItems.filter(item => item.quantity > 0);
      
    } else {
      const newItem: CartItem = { 
        ...product, 
        quantity: amountChange > 0 ? amountChange : 1 
      };
      cartQueue.enqueue(newItem);
      updatedItems = [...items, newItem];
    }
    
    setItems(updatedItems);
  };

  // ================= REMOVE =================
  const removeFromCart = (productId: number) => {
    const filtered = items.filter((item) => item.id !== productId);
    cartQueue.load(filtered);
    setItems(filtered);
  };

  // ================= CLEAR =================
  const clearCart = () => {
    cartQueue.clear();
    setItems([]);
  };

  // ================= CHECKOUT =================
  const checkout = async (): Promise<string | null> => {
    if (items.length === 0 || !user) return null;

    setIsCheckingOut(true);

    try {
      const orderData = {
        date: serverTimestamp(), 
        total: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        status: "completed",
        products: items.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      const ordersCollectionRef = collection(db, "users", user.uid, "ORDERS");
      const docRef = await addDoc(ordersCollectionRef, orderData);
      
      clearCart();
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