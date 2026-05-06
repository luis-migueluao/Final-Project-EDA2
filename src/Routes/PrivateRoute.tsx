import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

const PrivateRoute = ({ children }: { children: any}) => {
  const { user, loading } = useAuthContext();

  // Mientras está cargando, muestra la página actual
  // Solo redirige al login si terminó de cargar y no hay usuario
  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;