import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import "../styles/Home.css";

import {
  gamingTree,
  softwareTree,
  subscriptionsTree,
} from "../data/menuTree";

const Home = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const handleLogout = async () => {
    await logout();
  };

  const handleMenuClick = (menu: string) => {

  // SI YA ESTÁ ABIERTO → CERRAR
  if (activeMenu === menu) {
    setActiveMenu(null);
    setHoveredMenu(null);
    return;
  }

  // ABRIR NUEVO MENU
  setActiveMenu(menu);
};

  const currentMenu = hoveredMenu || activeMenu;

  return (
    <Container fluid className="home-container">

      {/* HEADER */}
      <div className="home-header">

        <div className="logo-section">
          <h1 className="logo">GAMESTORE</h1>
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
            <>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate("/login")}
              >
                Acceder
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate("/register")}
              >
                Registro
              </Button>
            </>
          )}

        </div>
      </div>

      {/* MENU */}
      <div
        className="menu-bar"
        onMouseLeave={() => setHoveredMenu(null)}
      >

        <span
          className={currentMenu === "gaming" ? "active-menu" : ""}
          onMouseEnter={() => setHoveredMenu("gaming")}
          onClick={() => handleMenuClick("gaming")}
        >
          Gaming
        </span>

        <span
          className={currentMenu === "software" ? "active-menu" : ""}
          onMouseEnter={() => setHoveredMenu("software")}
          onClick={() => handleMenuClick("software")}
        >
          Software
        </span>

        <span
          className={currentMenu === "subscriptions" ? "active-menu" : ""}
          onMouseEnter={() => setHoveredMenu("subscriptions")}
          onClick={() => handleMenuClick("subscriptions")}
        >
          Suscripciones
        </span>

      </div>

      {/* GAMING */}
      {currentMenu === "gaming" && (
        <div
          className="dropdown-menu-custom"
          onMouseEnter={() => setHoveredMenu("gaming")}
          onMouseLeave={() => setHoveredMenu(null)}
        >

          {gamingTree.children?.map((section) => (
            <div key={section.id} className="dropdown-column">

              <h4>{section.label}</h4>

              {section.children?.map((item) => (
                <p
                  key={item.id}
                  onClick={() => alert(`Entraste a ${item.label}`)}
                >
                  {item.label}
                </p>
              ))}

            </div>
          ))}

        </div>
      )}

      {/* SOFTWARE */}
      {currentMenu === "software" && (
        <div
          className="dropdown-menu-custom"
          onMouseEnter={() => setHoveredMenu("software")}
          onMouseLeave={() => setHoveredMenu(null)}
        >

          {softwareTree.children?.map((section) => (
            <div key={section.id} className="dropdown-column">

              <h4>{section.label}</h4>

              {section.children?.map((item) => (
                <p
                  key={item.id}
                  onClick={() => alert(`Entraste a ${item.label}`)}
                >
                  {item.label}
                </p>
              ))}

            </div>
          ))}

        </div>
      )}

      {/* SUBSCRIPTIONS */}
      {currentMenu === "subscriptions" && (
        <div
          className="dropdown-menu-custom"
          onMouseEnter={() => setHoveredMenu("subscriptions")}
          onMouseLeave={() => setHoveredMenu(null)}
        >

          {subscriptionsTree.children?.map((section) => (
            <div key={section.id} className="dropdown-column">

              <h4>{section.label}</h4>

              {section.children?.map((item) => (
                <p
                  key={item.id}
                  onClick={() => alert(`Entraste a ${item.label}`)}
                >
                  {item.label}
                </p>
              ))}

            </div>
          ))}

        </div>
      )}

    </Container>
  );
};

export default Home;