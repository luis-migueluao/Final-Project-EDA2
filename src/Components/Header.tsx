import { Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import { useProducts } from "../Context/ProductsContext";

import { searchProducts, type SearchResult } from "../data/searchData";

import "../styles/Header.css";

interface HeaderProps {
  resetAll: () => void;
}

const Header = ({ resetAll }: HeaderProps) => {
  const { user, logout } = useAuthContext();
  const { items } = useCart();
  const { products } = useProducts();

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // ================= BEST SELLERS =================

  const showBestSellers = () => {
    const best = products
      .filter((p) => p.bestSeller)
      .slice(0, 5)
      .map((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        image: p.images?.[0] || "",
        category: p.category,
        subCategory: p.subCategory,
      }));

    setSuggestions(best);
    setShowSuggestions(true);
  };

  // ================= SEARCH =================

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // ================= CLICK PRODUCT =================

  const handleSuggestionClick = (productId: number) => {
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);

    navigate(`/product/${productId}`);
  };

  // ================= CLOSE OUTSIDE =================

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ================= CART COUNT =================

  const totalItems = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="home-header">

      {/* LOGO */}
      <div className="logo-section" onClick={resetAll}>
        <h1 className="logo">GameStore</h1>
      </div>

      {/* SEARCH */}
      <div className="search-container" ref={searchRef}>
        <input
          type="text"
          placeholder="¿Qué estás buscando?"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => {
            if (searchQuery.trim().length === 0) {
              showBestSellers();
            }
          }}
        />

        {showSuggestions && suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((s) => (
              <div
                key={s.id}
                className="search-suggestion-item"
                onClick={() => handleSuggestionClick(s.id)}
              >
                <img
                  src={s.image}
                  alt={s.title}
                  className="suggestion-image"
                />

                <div className="suggestion-info">
                  {/* TITLE */}
                  <span className="suggestion-title">
                    {s.title}
                  </span>

                  {/* CATEGORY + SUBCATEGORIES */}
                  <div className="suggestion-meta">
                    <span className="suggestion-category">
                      {s.category}
                    </span>

                    <span className="suggestion-subcategories">
                      {s.subCategory?.join(", ")}
                    </span>
                  </div>

                  {/* PRICE */}
                  <span className="suggestion-price">
                    ${s.price.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="header-info">

        {/* CART */}
        <div className="cart-icon-container" onClick={() => navigate("/cart")}>
          <span className="cart-icon">🛒</span>

          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </div>

        {/* USER */}
        {user ? (
          <>
            <span
              className="user-email"
              onClick={() => navigate("/profile")}
            >
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
          <Button onClick={() => navigate("/login")}>
            Acceder
          </Button>
        )}

      </div>
    </header>
  );
};

export default Header;