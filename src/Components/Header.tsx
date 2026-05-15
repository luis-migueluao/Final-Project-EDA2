import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

import "../styles/Header.css";

interface HeaderProps {
  resetAll: () => void;
}

const Header = ({ resetAll }: HeaderProps) => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="home-header">
      <div className="logo-section" onClick={resetAll}>
        <h1 className="logo">LOGO</h1>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="¿Qué estás buscando?"
          className="search-input"
        />
      </div>

      <div className="header-info">
        {user ? (
          <>
            <span className="user-email">👤 {user.email}</span>

            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => navigate("/login")}>
              Acceder
            </Button>

            <Button onClick={() => navigate("/register")}>
              Registro
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;