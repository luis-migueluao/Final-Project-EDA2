import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

const UserRoutes = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div className="loading-products">Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default UserRoutes;