import { Button } from "react-bootstrap";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuthContext,
} from "../Context/AuthContext";

import {
  useCart,
} from "../Context/CartContext";

import "../styles/Header.css";

interface HeaderProps {
  resetAll: () => void;
}

const Header = ({
  resetAll,
}: HeaderProps) => {

  const { user, logout } =
    useAuthContext();

  const { items } =
    useCart();

  const navigate =
    useNavigate();

  // ================= TOTAL ITEMS =================

  const totalItems =
    items.reduce(
      (acc, item) =>
        acc + item.quantity,
      0
    );

  // ================= LOGOUT =================

  const handleLogout =
    async () => {

      await logout();
    };

  return (

    <header className="home-header">

      {/* ================= LOGO ================= */}

      <div
        className="logo-section"
        onClick={resetAll}
      >

        <h1 className="logo">
          LOGO
        </h1>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="search-container">

        <input
          type="text"
          placeholder="¿Qué estás buscando?"
          className="search-input"
        />

      </div>

      {/* ================= RIGHT ================= */}

      <div className="header-info">

        {/* CART */}
        <div
          className="cart-icon-container"
          onClick={() =>
            navigate("/cart")
          }
        >

          <span className="cart-icon">
            🛒
          </span>

          {totalItems > 0 && (
            <span className="cart-badge">
              {totalItems}
            </span>
          )}

        </div>

        {/* USER */}
        {user ? (
          <>

            <span className="user-email">
              👤 {user.email}
            </span>

            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>

          </>

        ) : (
          <div className="auth-buttons">

            <Button
              className="header-btn"
              onClick={() =>
                navigate("/login")
              }
            >
              Acceder
            </Button>

            <Button
              className="header-btn register-btn"
              onClick={() =>
                navigate("/register")
              }
            >
              Registro
            </Button>

          </div>
        )}

      </div>

    </header>
  );
};

export default Header;