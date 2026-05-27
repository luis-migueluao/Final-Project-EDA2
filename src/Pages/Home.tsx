import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Container,
} from "react-bootstrap";

import "../styles/Home.css";

import Header from "../Components/Header";
import Menu from "../Components/Menu";
import HeroCarousel from "../Components/HeroCarousel";
import ProductsSection from "../Components/ProductsSection";
import ProductCard from "../Components/ProductCard";

import {
  useProducts,
  type Product,
} from "../Context/ProductsContext";

import {
  Heap,
} from "../Helpers/Heap";

const Home = () => {

  // ================= FIRESTORE PRODUCTS =================

  const {
    products,
    loading,
  } = useProducts();

  // ================= STATES =================

  const [hoverMenu, setHoverMenu] =
    useState<string | null>(null);

  const [activeCategory, setActiveCategory] =
    useState<string | null>(null);

  const [activeSub, setActiveSub] =
    useState<string | null>(null);

  // ================= SORT =================

  type SortOption =
    | "default"
    | "price-asc"
    | "price-desc"
    | "name-asc"
    | "name-desc";

  const [sortOption,
    setSortOption] =
      useState<SortOption>(
        "default"
      );

  // ================= SHOW MORE =================

  const [showAllProducts,
    setShowAllProducts] =
      useState(false);

  const gridRef =
    useRef<HTMLDivElement>(null);

  const [productsPerRow,
    setProductsPerRow] =
      useState(5);

  useEffect(() => {

    const grid =
      gridRef.current;

    if (!grid) return;

    const updateCols = () => {

      const style =
        getComputedStyle(
          grid
        );

      const cols =
        style
          .gridTemplateColumns
          .split(" ")
          .length;

      setProductsPerRow(
        cols
      );
    };

    updateCols();

    const observer =
      new ResizeObserver(
        updateCols
      );

    observer.observe(grid);

    return () =>
      observer.disconnect();

  }, []);

  // ================= MENU =================

  const handleCategoryClick = (
    category: string
  ) => {

    setActiveCategory(
      category
    );

    setActiveSub(null);

    setHoverMenu(null);
  };

  const handleSubClick = (
    sub: string
  ) => {

    const subLower =
      sub.toLowerCase();

    const foundProduct =
      products.find((p) =>
        p.subCategory.includes(
          subLower
        )
      );

    if (foundProduct) {

      setActiveCategory(
        foundProduct.category
      );
    }

    setActiveSub(
      subLower
    );

    setHoverMenu(null);
  };

  // ================= RESET =================

  const resetAll = () => {

    setActiveCategory(
      null
    );

    setActiveSub(
      null
    );

    setHoverMenu(
      null
    );
  };

  // ================= TOP FEATURED =================
  // Filtra productos destacados (featured: true) usando un Heap max
  // para priorizar los que tienen mayor prioridad (destacados puros pesan +1,
  // y si también son bestseller pesan +2 adicional)

  const topFeatured =
    useMemo(() => {

      const heap =
        new Heap<Product>(
          "max"
        );

      products.forEach(
        (product) => {

          if (product.featured) {

            // Prioridad más alta si también es bestSeller
            const priority =
              1 + (product.bestSeller ? 2 : 0);

            heap.insert(
              product,
              priority
            );
          }
        }
      );

      return heap.extractAll();

    }, [products]);

  // ================= TOP BESTSELLERS =================
  // Filtra productos más vendidos (bestSeller: true) usando un Heap max
  // Prioriza por ID descendente (los productos más nuevos entre los bestsellers)

  const topBestSellers =
    useMemo(() => {

      const heap =
        new Heap<Product>(
          "max"
        );

      products.forEach(
        (product) => {

          if (product.bestSeller) {

            heap.insert(
              product,
              product.id
            );
          }
        }
      );

      return heap.extractAll();

    }, [products]);

  // ================= FILTER =================

  const filteredProducts =
    products.filter(
      (product) => {

        const matchCategory =

          !activeCategory ||

          product.category ===
            activeCategory;

        const matchSub =

          !activeSub ||

          product.subCategory.includes(
            activeSub
          );

        return (
          matchCategory &&
          matchSub
        );
      }
    );

  // ================= SORT =================

  const sortedProducts =
    useMemo(() => {

      if (
        sortOption ===
        "default"
      ) {

        return filteredProducts;
      }

      // Para orden por precio usamos Heap
      if (sortOption === "price-asc" || sortOption === "price-desc") {
        const heap =
          new Heap<Product>(
            sortOption === "price-asc" ? "min" : "max"
          );

        filteredProducts.forEach((product) => {
          heap.insert(product, product.price);
        });

        return heap.extractAll();
      }

      // Para orden por nombre usamos Array.sort con localeCompare (correcto y eficiente)
      const sorted = [...filteredProducts].sort((a, b) => {
        const comparison = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        return sortOption === "name-asc" ? comparison : -comparison;
      });

      return sorted;

    }, [
      filteredProducts,
      sortOption,
    ]);

  // ================= HANDLE SORT =================

  const handleSortChange = (
    e: React.ChangeEvent<
      HTMLSelectElement
    >
  ) => {

    setSortOption(
      e.target
        .value as SortOption
    );
  };

  // ================= VISIBLE PRODUCTS =================

  const initialLimit =
    productsPerRow * 2;

  const visibleProducts =
    showAllProducts
      ? sortedProducts
      : sortedProducts.slice(
          0,
          initialLimit
        );

  const hasMoreProducts =
    sortedProducts.length >
    initialLimit;

  // ================= LOADING =================

  if (loading) {

    return (
      <div className="loading-products">
        Cargando productos...
      </div>
    );
  }

  // ================= HOME SECTIONS =================

  const renderHomeSections =
    () => (
      <>

        {/* TODOS */}

        <section className="home-section">

          <div className="section-header">

            <h2>
              Todos los productos
            </h2>

            <div className="sort-controls-inline">

              <label>
                Ordenar:
              </label>

              <select
                value={
                  sortOption
                }
                onChange={
                  handleSortChange
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

          </div>

          <div
            className="products-grid"
            ref={gridRef}
          >

            {visibleProducts.map(
              (product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              )
            )}

          </div>

          {hasMoreProducts && !showAllProducts && (

            <div className="show-more-container">

              <button
                className="show-more-btn"
                onClick={() =>
                  setShowAllProducts(true)
                }
              >

                {`Mostrar más (${
                  sortedProducts.length -
                  initialLimit
                } restantes)`}

              </button>

            </div>
          )}

          {showAllProducts && (

            <div className="show-more-container">

              <button
                className="show-more-btn"
                onClick={() =>
                  setShowAllProducts(false)
                }
              >

                Mostrar menos

              </button>

            </div>
          )}

        </section>

        {/* DESTACADOS */}

        <section className="home-section">

          <div className="section-header">

            <h2>
              Destacados
            </h2>

          </div>

          <div className="products-grid">

            {topFeatured.map(
              (product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              )
            )}

          </div>

        </section>

        {/* MÁS VENDIDOS */}

        <section className="home-section">

          <div className="section-header">

            <h2>
              Más vendidos
            </h2>

          </div>

          <div className="products-grid">

            {topBestSellers.map(
              (product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              )
            )}

          </div>

        </section>

      </>
    );

  // ================= RENDER =================

  return (

    <Container
      fluid
      className="home-container"
    >

      <Header
        resetAll={resetAll}
      />

      <Menu
        hoverMenu={hoverMenu}
        setHoverMenu={setHoverMenu}
        activeCategory={activeCategory}
        handleCategoryClick={handleCategoryClick}
        handleSubClick={handleSubClick}
      />

      {!activeCategory &&
        !activeSub && (
          <HeroCarousel />
        )}

      {!activeCategory &&
      !activeSub ? (

        renderHomeSections()

      ) : (

        <ProductsSection
          products={
            sortedProducts
          }
          activeCategory={
            activeCategory
          }
          activeSub={
            activeSub
          }
          sortOption={
            sortOption
          }
          onSortChange={
            handleSortChange
          }
        />
      )}

    </Container>
  );
};

export default Home;