import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import "../styles/Home.css";

const Home = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Container fluid className="home-container">
      <div className="home-header">
        <h1>Bienvenido</h1>
        <div className="header-info">
          <span className="user-email">👤 {user?.email}</span>
          <Button variant="outline-danger" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="home-content">
        <h3>Inicio de sesión exitoso</h3>
      </div>
    </Container>
  );
};

export default Home;
