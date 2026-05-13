import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

import "../styles/Home.css";

import {
  gamingTree,
  softwareTree,
  subscriptionsTree,
} from "../data/menuTree";

import { carouselItems } from "../data/carouselData";
import { storeProducts } from "../data/storeData";

const Home = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const [hoverMenu, setHoverMenu] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);

  const handleLogout = async () => {
    await logout();
  };

  // 🔥 CLICK CATEGORÍA
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setActiveSub(null);
    setHoverMenu(null);
  };

  // 🔥 SUBCATEGORÍA (AHORA CON AUTO-CATEGORÍA)
  const handleSubClick = (sub: string) => {
    const subLower = sub.toLowerCase();

    // 🔥 DETECTAR A QUÉ CATEGORÍA PERTENECE LA SUBCATEGORÍA
    const foundProduct = storeProducts.find((p) =>
      p.subCategory.includes(subLower)
    );

    if (foundProduct) {
      setActiveCategory(foundProduct.category); // 🔥 CAMBIA CATEGORÍA AUTOMÁTICAMENTE
    }

    setActiveSub(subLower);
    setHoverMenu(null);
  };

  const resetAll = () => {
    setActiveCategory(null);
    setActiveSub(null);
    setHoverMenu(null);
  };

  // 🔥 FILTRO REAL
  const filteredProducts = storeProducts.filter((product) => {
    const matchCategory =
      !activeCategory || product.category === activeCategory;

    const matchSub =
      !activeSub || product.subCategory.includes(activeSub);

    return matchCategory && matchSub;
  });

  const isOpen = (menu: string) => hoverMenu === menu;

  return (
    <Container fluid className="home-container">

      {/* HEADER */}
      <div className="home-header">

        <div className="logo-section" onClick={resetAll}>
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
              <span className="user-email">👤 {user.email}</span>
              <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate("/login")}>Acceder</Button>
              <Button onClick={() => navigate("/register")}>Registro</Button>
            </>
          )}
        </div>
      </div>

      {/* MENU WRAPPER */}
      <div onMouseLeave={() => setHoverMenu(null)}>

        <div className="menu-bar">

          <span
            className={activeCategory === "gaming" ? "active-menu" : ""}
            onMouseEnter={() => setHoverMenu("gaming")}
            onClick={() => handleCategoryClick("gaming")}
          >
            Gaming
          </span>

          <span
            className={activeCategory === "software" ? "active-menu" : ""}
            onMouseEnter={() => setHoverMenu("software")}
            onClick={() => handleCategoryClick("software")}
          >
            Software
          </span>

          <span
            className={activeCategory === "subscriptions" ? "active-menu" : ""}
            onMouseEnter={() => setHoverMenu("subscriptions")}
            onClick={() => handleCategoryClick("subscriptions")}
          >
            Suscripciones
          </span>

        </div>

        {/* DROPDOWN GAMING */}
        {isOpen("gaming") && (
          <div className="dropdown-menu-custom">
            {gamingTree.children?.map((section) => (
              <div key={section.id} className="dropdown-column">
                <h4>{section.label}</h4>

                {section.children?.map((item) => (
                  <p key={item.id} onClick={() => handleSubClick(item.label)}>
                    {item.label}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* DROPDOWN SOFTWARE */}
        {isOpen("software") && (
          <div className="dropdown-menu-custom">
            {softwareTree.children?.map((section) => (
              <div key={section.id} className="dropdown-column">
                <h4>{section.label}</h4>

                {section.children?.map((item) => (
                  <p key={item.id} onClick={() => handleSubClick(item.label)}>
                    {item.label}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* DROPDOWN SUBSCRIPTIONS */}
        {isOpen("subscriptions") && (
          <div className="dropdown-menu-custom">
            {subscriptionsTree.children?.map((section) => (
              <div key={section.id} className="dropdown-column">
                <h4>{section.label}</h4>

                {section.children?.map((item) => (
                  <p key={item.id} onClick={() => handleSubClick(item.label)}>
                    {item.label}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}

      </div>

      {/* HERO */}
      {!activeCategory && !activeSub && (
        <div className="hero-section">
          <div className="hero-carousel-container">
            <Carousel fade interval={3500}>
              {carouselItems.map((item) => (
                <Carousel.Item key={item.id}>
                  <div className="hero-slide">
                    <img src={item.image} className="hero-image" />
                    <div className="hero-overlay">
                      <span className="hero-subtitle">{item.subtitle}</span>
                      <h2>{item.title}</h2>
                      <Button className="hero-button">Ver más</Button>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      )}

      {/* PRODUCTS */}
      <div className="products-section">
        <div className="section-header">
          <h2>
            {activeSub
              ? activeSub.toUpperCase()
              : activeCategory
              ? activeCategory.toUpperCase()
              : "TODOS LOS PRODUCTOS"}
          </h2>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} className="product-image" />
              </div>

              <div className="product-info">
                <h3>{product.title}</h3>
                <div className="product-category">{product.category}</div>
                <div className="product-subcategories">
                  {product.subCategory.join(", ")}
                </div>
                <p className="product-description">{product.description}</p>
                <div className="product-price">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </Container>
  );
};

export default Home;