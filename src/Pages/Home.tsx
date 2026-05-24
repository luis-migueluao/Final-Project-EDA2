import {
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

const Home = () => {

  const [hoverMenu, setHoverMenu] =
    useState<string | null>(null);

  const [activeCategory, setActiveCategory] =
    useState<string | null>(null);

  const [activeSub, setActiveSub] =
    useState<string | null>(null);

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

      {/* PRODUCTS */}
      <ProductsSection
        products={
          filteredProducts
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