import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { auth, db } from "../firebase/config"; // 1. Importamos 'db' desde tu config
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
// 2. Importamos las funciones necesarias de Firestore
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext error");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      // 3. Si detectamos un usuario activo (ya sea por Login o por Registro)
      if (currentUser) {
        try {
          // Apuntamos al documento: users / ID_DEL_USUARIO
          const userRef = doc(db, "users", currentUser.uid);

          // Creamos o actualizamos la raíz con el email y la fecha actual del servidor
          await setDoc(
            userRef,
            {
              email: currentUser.email,
              lastLogin: serverTimestamp(),
            },
            { merge: true } // 'merge: true' es vital para que NO borre las carpetas ITEMS u ORDERS si ya existen
          );
          
          console.log("Raíz del usuario sincronizada con éxito en Firestore.");
        } catch (error) {
          console.error("Error al sincronizar los datos del usuario en la raíz:", error);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};