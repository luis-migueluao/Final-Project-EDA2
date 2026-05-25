import {
  useMemo,
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

import {
  storeProducts,
} from "../data/storeData";

import {
  Heap,
} from "../Helpers/Heap";

const Home = () => {

  const [hoverMenu, setHoverMenu] =
    useState<string | null>(null);

  const [activeCategory, setActiveCategory] =
    useState<string | null>(null);

  const [activeSub, setActiveSub] =
    useState<string | null>(null);

  // ================= HEAP SORT =================

  type SortOption =
    | "default"
    | "price-asc"
    | "price-desc"
    | "name-asc"
    | "name-desc";

  const [sortOption,
    setSortOption] =
      useState<SortOption>("default");

  // ================= MENU =================

  const handleCategoryClick = (
    category: string
  ) => {

    setActiveCategory(category);

    setActiveSub(null);

    setHoverMenu(null);
  };

  const handleSubClick = (
    sub: string
  ) => {

    const subLower =
      sub.toLowerCase();

    const foundProduct =
      storeProducts.find((p) =>

        p.subCategory.includes(
          subLower
        )
      );

    if (foundProduct) {

      setActiveCategory(
        foundProduct.category
      );
    }

    setActiveSub(subLower);

    setHoverMenu(null);
  };

  // ================= RESET =================

  const resetAll = () => {

    setActiveCategory(null);

    setActiveSub(null);

    setHoverMenu(null);
  };

  // ================= FILTER =================

  const filteredProducts =
    storeProducts.filter(
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

  // ================= HEAP SORT (ALGORITMO) =================

  const sortedProducts =
    useMemo(() => {
      if (
        sortOption === "default"
      ) {
        return filteredProducts;
      }

      // Usamos el Heap para ordenar eficientemente
      const heap =
        new Heap<
          (typeof storeProducts)[0]
        >(
          sortOption ===
            "price-asc" ||
            sortOption ===
              "name-asc"
            ? "min"
            : "max"
        );

      // Insertar productos en el Heap con prioridad según la opción
      filteredProducts.forEach(
        (product) => {
          let priority = 0;

          switch (
            sortOption
          ) {
            case "price-asc":
            case "price-desc":
              priority =
                product.price;
              break;
            case "name-asc":
            case "name-desc":
              // Usar código char para orden alfabético
              priority =
                product.title
                  .toLowerCase()
                  .charCodeAt(0) *
                  1000 +
                product.title
                  .length;
              break;
          }

          heap.insert(
            product,
            priority
          );
        }
      );

      // Extraer todos ordenados
      const sorted =
        heap.extractAll();

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

  return (

    <Container
      fluid
      className="home-container"
    >

      {/* HEADER */}
      <Header
        resetAll={resetAll}
      />

      {/* MENU */}
      <Menu
        hoverMenu={hoverMenu}
        setHoverMenu={setHoverMenu}
        activeCategory={activeCategory}
        handleCategoryClick={
          handleCategoryClick
        }
        handleSubClick={
          handleSubClick
        }
      />

      {/* HERO */}
      {!activeCategory &&
        !activeSub && (

        <HeroCarousel />

      )}

      {/* SORT CONTROLS */}
      {(activeCategory ||
        activeSub) && (
        <div className="sort-controls">
          <label>
            Ordenar por:
          </label>
          <select
            value={sortOption}
            onChange={
              handleSortChange
            }
          >
            <option value="default">
              Predeterminado
            </option>
            <option value="price-asc">
              Precio: Menor a Mayor
            </option>
            <option value="price-desc">
              Precio: Mayor a Menor
            </option>
            <option value="name-asc">
              Nombre: A - Z
            </option>
            <option value="name-desc">
              Nombre: Z - A
            </option>
          </select>
        </div>
      )}

      {/* PRODUCTS */}
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
      />

    </Container>
  );
};

export default Home;