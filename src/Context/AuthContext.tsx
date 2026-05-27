import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
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
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);

          // Sincronizar datos básicos del usuario
          await setDoc(
            userRef,
            {
              email: currentUser.email,
              lastLogin: serverTimestamp(),
            },
            { merge: true }
          );

          // Leer el campo role para determinar si es admin
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setIsAdmin(userData.role === "Admin");
          } else {
            setIsAdmin(false);
          }

          console.log("Usuario sincronizado con Firestore.");
        } catch (error) {
          console.error("Error al sincronizar usuario:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};