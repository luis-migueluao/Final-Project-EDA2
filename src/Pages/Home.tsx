import { useState } from "react";
import { Container } from "react-bootstrap";

import "../styles/Home.css";

import Header from "../Components/Header";
import Menu from "../Components/Menu";
import HeroCarousel from "../Components/HeroCarousel";
import ProductsSection from "../Components/ProductsSection";

import { storeProducts } from "../data/storeData";

const Home = () => {

  const [hoverMenu, setHoverMenu] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [activeSub, setActiveSub] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setActiveSub(null);
    setHoverMenu(null);
  };

  const handleSubClick = (sub: string) => {
    const subLower = sub.toLowerCase();

    const foundProduct = storeProducts.find((p) =>
      p.subCategory.includes(subLower)
    );

    if (foundProduct) {
      setActiveCategory(foundProduct.category);
    }

    setActiveSub(subLower);
    setHoverMenu(null);
  };

  const resetAll = () => {
    setActiveCategory(null);
    setActiveSub(null);
    setHoverMenu(null);
  };

  const filteredProducts = storeProducts.filter((product) => {

    const matchCategory =
      !activeCategory ||
      product.category === activeCategory;

    const matchSub =
      !activeSub ||
      product.subCategory.includes(activeSub);

    return matchCategory && matchSub;
  });

  return (
    <Container fluid className="home-container">

      <Header resetAll={resetAll} />

      <Menu
        hoverMenu={hoverMenu}
        setHoverMenu={setHoverMenu}
        activeCategory={activeCategory}
        handleCategoryClick={handleCategoryClick}
        handleSubClick={handleSubClick}
      />

      {!activeCategory && !activeSub && (
        <HeroCarousel />
      )}

      <ProductsSection
        products={filteredProducts}
        activeCategory={activeCategory}
        activeSub={activeSub}
      />

    </Container>
  );
};

export default Home;