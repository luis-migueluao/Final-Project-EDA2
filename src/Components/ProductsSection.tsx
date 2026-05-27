import type {
  Product,
} from "../Context/ProductsContext";

import ProductCard from "./ProductCard";

import "../styles/ProductsSection.css";

interface ProductsSectionProps {

  products: Product[];

  activeCategory: string | null;

  activeSub: string | null;

  sortOption?: string;

  onSortChange?: (
    e: React.ChangeEvent<
      HTMLSelectElement
    >
  ) => void;
}

const ProductsSection = ({
  products,
  activeCategory,
  activeSub,
  sortOption,
  onSortChange,
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

        {(activeCategory ||
          activeSub) &&
          onSortChange && (

            <div className="sort-controls-inline">

              <label>
                Ordenar:
              </label>

              <select
                value={
                  sortOption ||
                  "default"
                }
                onChange={
                  onSortChange
                }
              >

                <option value="default">
                  Predeterminado
                </option>

                <option value="price-asc">
                  Precio: Menor
                </option>

                <option value="price-desc">
                  Precio: Mayor
                </option>

                <option value="name-asc">
                  A - Z
                </option>

                <option value="name-desc">
                  Z - A
                </option>

              </select>

            </div>
          )}

      </div>

      <div className="products-grid">

        {products.map(
          (product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          )
        )}

      </div>

    </div>
  );
};

export default ProductsSection;