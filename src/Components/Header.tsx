import { Button } from "react-bootstrap";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuthContext,
} from "../Context/AuthContext";

import {
  useCart,
} from "../Context/CartContext";

import {
  storeProducts,
} from "../data/storeData";

import {
  searchProducts,
  type SearchResult,
} from "../data/searchData";

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

  // ================= SEARCH =================

  const [searchQuery,
    setSearchQuery] =
      useState("");

  const [suggestions,
    setSuggestions] =
      useState<SearchResult[]>([]);

  const [showSuggestions,
    setShowSuggestions] =
      useState(false);

  const searchRef =
    useRef<HTMLDivElement>(null);

  // ================= BESTSELLER (al enfocar el search vacío) =================

  const showBestSellers = () => {
    const bestSellers =
      storeProducts
        .filter(
          (p) =>
            p.bestSeller
        )
        .slice(0, 5)
        .map((p) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          image:
            p.images[0] || "",
          category:
            p.category,
          subCategory:
            p.subCategory,
        }));

    setSuggestions(
      bestSellers
    );
    setShowSuggestions(true);
  };

  // Manejar cambios en la búsqueda (usa el Trie)
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length > 0) {
      const results = searchProducts(value, 5);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Navegar al producto al hacer clic en sugerencia
  const handleSuggestionClick = (
    productId: number
  ) => {
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    navigate(`/product/${productId}`);
  };

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (
      e: MouseEvent
    ) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(
          e.target as Node
        )
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  // Manejar tecla Enter
  const handleSearchKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Enter" &&
      suggestions.length > 0
    ) {
      handleSuggestionClick(
        suggestions[0].id
      );
    }
  };

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

      <div
        className="search-container"
        ref={searchRef}
      >

        <input
          type="text"
          placeholder="¿Qué estás buscando?"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          onFocus={() => {
            if (
              searchQuery.trim()
                .length > 0
            ) {
              if (
                suggestions.length >
                0
              ) {
                setShowSuggestions(
                  true
                );
              }
            } else {
              // Mostrar bestsellers al hacer clic en el search vacío
              showBestSellers();
            }
          }}
        />

        {/* SUGGESTIONS DROPDOWN (Trie) */}
        {showSuggestions &&
          suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map((s) => (
                <div
                  key={s.id}
                  className="search-suggestion-item"
                  onClick={() =>
                    handleSuggestionClick(
                      s.id
                    )
                  }
                >
                  <img
                    src={s.image}
                    alt={s.title}
                    className="suggestion-image"
                  />
                  <div className="suggestion-info">
                    <span className="suggestion-title">
                      {s.title}
                    </span>
                    <div className="suggestion-meta">
                      <span className="suggestion-category">
                        {s.category}
                      </span>
                      <span className="suggestion-subcategories">
                        {s.subCategory.join(", ")}
                      </span>
                    </div>
                    <span className="suggestion-price">
                      ${s.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

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