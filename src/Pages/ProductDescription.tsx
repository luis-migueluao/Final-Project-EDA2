import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../Components/Header";
import Menu from "../Components/Menu";

import { useProducts } from "../Context/ProductsContext";
import { useCart } from "../Context/CartContext";

import { buildProductGraph } from "../data/graphData";
import { getRelatedProducts } from "../Helpers/graphAlgorithms";

import "../styles/ProductDescription.css";

const ProductDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(
    (p) => p.id === Number(id)
  );

  const [selectedImage, setSelectedImage] = useState("");

  const [hoverMenu, setHoverMenu] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  // ================= GRAPH (REACTIVO A FIRESTORE) =================
  const productGraph = useMemo(() => {
    const nodes = products.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      subCategory: p.subCategory,
    }));

    return buildProductGraph(nodes);
  }, [products]);

  // ================= RELATED PRODUCTS =================
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return getRelatedProducts(productGraph, product.id, 6);
  }, [productGraph, product]);

  if (!product) {
    return <h1>Producto no encontrado</h1>;
  }

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="product-page">

      <Header resetAll={() => navigate("/")} />

      <Menu
        hoverMenu={hoverMenu}
        setHoverMenu={setHoverMenu}
        activeCategory={activeCategory}
        handleCategoryClick={(cat) => {
          setActiveCategory(cat);
          navigate("/");
        }}
        handleSubClick={() => navigate("/")}
      />

      <div className="product-description-container">

        {/* LEFT */}
        <div className="product-left">
          <img
            src={selectedImage}
            className="product-banner"
          />

          <div className="product-gallery">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                className={`gallery-image ${
                  selectedImage === img ? "active-gallery-image" : ""
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="product-right">
          <h1>{product.title}</h1>

          <div className="product-tags">
            {product.subCategory.map((sub) => (
              <span key={sub}>{sub}</span>
            ))}
          </div>

          {/* DESCRIPCIÓN */}
          <p className="product-big-description">
            {product.fullDescription}
          </p>

          <div className="product-price-big">
            ${product.price.toFixed(2)}
          </div>

          <div className="product-actions-group">
            <button
              className="buy-button"
              onClick={() => addToCart(product)}
            >
              Agregar al carrito
            </button>

            <button
              className="buy-now-button"
              onClick={handleBuyNow}
            >
              Comprar ahora
            </button>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="related-section">
        <h2>Productos relacionados</h2>

        <div className="related-grid">
          {relatedProducts.map((item) => {
            const full = products.find((p) => p.id === item.id);
            if (!full) return null;

            return (
              <div
                key={item.id}
                className="related-card"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img src={full.images[0]} />

                <div className="related-info">
                  <h3>{item.title}</h3>

                  <div className="related-meta">
                    <span className="related-category">
                      {full.category}
                    </span>
                  </div>

                  <span className="related-price">
                    ${full.price.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default ProductDescription;