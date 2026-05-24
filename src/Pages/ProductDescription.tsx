import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  storeProducts,
} from "../data/storeData";

import Header from "../Components/Header";
import Menu from "../Components/Menu";

import {
  useCart,
} from "../Context/CartContext";

import "../styles/ProductDescription.css";

const ProductDescription = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const {
    addToCart,
  } = useCart();

  // ================= MENU =================

  const [hoverMenu,
    setHoverMenu] =
      useState<string | null>(
        null
      );

  const [activeCategory,
    setActiveCategory] =
      useState<string | null>(
        null
      );

  // ================= PRODUCT =================

  const product =
    storeProducts.find(
      (p) =>
        p.id === Number(id)
    );

  const [selectedImage,
    setSelectedImage] =
      useState("");

  // ================= FORMAT PRICE =================

  const formatPrice = (
    price: number
  ) => {

    return `$${price.toFixed(2)}`;
  };

  // ================= IMAGE =================

  useEffect(() => {

    if (product) {

      setSelectedImage(
        product.images[0]
      );
    }

  }, [product]);

  // ================= NOT FOUND =================

  if (!product) {

    return (
      <h1>
        Producto no encontrado
      </h1>
    );
  }

  // ================= MENU FUNCTIONS =================

  const handleCategoryClick = (
    category: string
  ) => {

    setActiveCategory(
      category
    );

    navigate("/");
  };

  const handleSubClick =
    () => {

      navigate("/");
    };

  const resetAll = () => {

    navigate("/");
  };

  // ================= BUY NOW FLOW =================

  const handleBuyNow = () => {
    // 1. Encola el producto usando tu estructura de datos del Context
    addToCart(product);
    
    // 2. Redirecciona inmediatamente a la página del carrito
    navigate("/cart");
  };

  // ================= RELATED =================

  const relatedProducts =
    storeProducts.filter(
      (p) =>

        p.category ===
          product.category &&

        p.id !== product.id
    );

  return (

    <div className="product-page">

      {/* HEADER */}
      <Header
        resetAll={resetAll}
      />

      {/* MENU */}
      <Menu
        hoverMenu={hoverMenu}
        setHoverMenu={
          setHoverMenu
        }
        activeCategory={
          activeCategory
        }
        handleCategoryClick={
          handleCategoryClick
        }
        handleSubClick={
          handleSubClick
        }
      />

      {/* PRODUCT */}
      <div className="product-description-container">

        {/* LEFT */}
        <div className="product-left">

          {/* MAIN IMAGE */}
          <img
            src={selectedImage}
            alt={product.title}
            className="product-banner"
          />

          {/* GALLERY */}
          <div className="product-gallery">

            {product.images.map(
              (
                img,
                index
              ) => (

                <img
                  key={index}
                  src={img}
                  alt={product.title}
                  className={`gallery-image ${
                    selectedImage ===
                    img

                      ? "active-gallery-image"

                      : ""
                  }`}
                  onClick={() =>
                    setSelectedImage(
                      img
                    )
                  }
                />

              )
            )}

          </div>

        </div>

        {/* RIGHT */}
        <div className="product-right">

          <h1>
            {product.title}
          </h1>

          {/* TAGS */}
          <div className="product-tags">

            {product.subCategory.map(
              (sub) => (

                <span key={sub}>
                  {sub}
                </span>

              )
            )}

          </div>

          {/* DESCRIPTION */}
          <p className="product-big-description">

            {product.fullDescription}

          </p>

          {/* PRICE */}
          <div className="product-price-big">

            {formatPrice(
              product.price
            )}

          </div>

          {/* ACTIONS BUTTONS */}
          <div className="product-actions-group" style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
            
            {/* AGREGAR AL CARRITO */}
            <button
              className="buy-button"
              onClick={() =>
                addToCart(
                  product
                )
              }
            >
              Agregar al carrito
            </button>

            {/* COMPRAR AHORA */}
            <button
              className="buy-now-button"
              onClick={handleBuyNow}
            >
              Comprar ahora
            </button>

          </div>

        </div>

      </div>

      {/* RELATED */}
      <div className="related-section">

        <h2>
          Productos relacionados
        </h2>

        <div className="related-grid">

          {relatedProducts.map(
            (item) => (

              <div
                key={item.id}
                className="related-card"
                onClick={() =>
                  navigate(
                    `/product/${item.id}`
                  )
                }
              >

                <img
                  src={
                    item.images[0]
                  }
                  alt={item.title}
                />

                <div className="related-info">

                  <h3>
                    {item.title}
                  </h3>

                  <span>

                    {formatPrice(
                      item.price
                    )}

                  </span>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
};

export default ProductDescription;