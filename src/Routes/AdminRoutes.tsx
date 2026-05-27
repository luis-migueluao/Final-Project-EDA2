import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

const AdminRoutes = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, isAdmin } = useAuthContext();

  if (loading) {
    return <div className="loading-products">Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AdminRoutes;