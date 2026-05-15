import type { Product } from "../data/storeData";

import ProductCard from "./ProductCard";

import "../styles/ProductsSection.css";

interface ProductsSectionProps {
  products: Product[];

  activeCategory: string | null;
  activeSub: string | null;
}

const ProductsSection = ({
  products,
  activeCategory,
  activeSub,
}: ProductsSectionProps) => {
  return (
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

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </div>
  );
};

export default ProductsSection;