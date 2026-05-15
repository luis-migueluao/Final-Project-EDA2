// src/Components/HeroCarousel.tsx

import Carousel from "react-bootstrap/Carousel";
import { Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { carouselItems } from "../data/carouselData";

import "../styles/HeroCarousel.css";

const HeroCarousel = () => {

  const navigate = useNavigate();

  return (

    <div className="hero-section">

      <div className="hero-carousel-container">

        <Carousel
          fade
          interval={3500}
        >

          {carouselItems.map((item) => (

            <Carousel.Item key={item.id}>

              <div className="hero-slide">

                <img
                  src={item.image}
                  className="hero-image"
                />

                <div className="hero-overlay">

                  <span className="hero-subtitle">
                    {item.subtitle}
                  </span>

                  <h2>
                    {item.title}
                  </h2>

                  <Button
                    className="hero-button"
                    onClick={() =>
                      navigate(`/product/${item.productId}`)
                    }
                  >
                    Ver más
                  </Button>

                </div>

              </div>

            </Carousel.Item>

          ))}

        </Carousel>

      </div>

    </div>
  );
};

export default HeroCarousel;