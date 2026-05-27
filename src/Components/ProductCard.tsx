import { useNavigate } from "react-router-dom";

import type {
  Product,
} from "../Context/ProductsContext";

import "../styles/ProductCard.css";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({
  product,
}: ProductCardProps) => {

  const navigate =
    useNavigate();

  return (

    <div
      className="product-card"
      onClick={() =>
        navigate(
          `/product/${product.id}`
        )
      }
    >

      <div className="product-image-container">

        <img
          src={product.images[0]}
          className="product-image"
          alt={product.title}
          loading="lazy"
        />

      </div>

      <div className="product-info">

        <h3>
          {product.title}
        </h3>

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
          $
          {product.price.toFixed(
            2
          )}
        </div>

      </div>

    </div>
  );
};

export default ProductCard;