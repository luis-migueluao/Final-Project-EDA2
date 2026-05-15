import { useNavigate } from "react-router-dom";

import "../styles/ProductCard.css";

const ProductCard = ({ product }: any) => {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() =>
        navigate(`/product/${product.id}`)
      }
    >
      <div className="product-image-container">
        <img
          src={product.image}
          className="product-image"
        />
      </div>

      <div className="product-info">
        <h3>{product.title}</h3>

        <div className="product-category">
          {product.category}
        </div>

        <div className="product-subcategories">
          {product.subCategory.join(", ")}
        </div>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-price">
          {product.price}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;