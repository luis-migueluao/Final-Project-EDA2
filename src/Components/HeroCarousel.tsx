import Carousel from "react-bootstrap/Carousel";
import { Button } from "react-bootstrap";

import "../styles/HeroCarousel.css";

import { carouselItems } from "../data/carouselData";

const HeroCarousel = () => {
  return (
    <div className="hero-section">
      <div className="hero-carousel-container">

        <Carousel fade interval={3500}>
          {carouselItems.map((item) => (
            <Carousel.Item key={item.id}>

              <div className="hero-slide">

                <img
                  src={item.image}
                  className="hero-image"
                  alt={item.title}
                />

                <div className="hero-overlay">
                  <span className="hero-subtitle">
                    {item.subtitle}
                  </span>

                  <h2>{item.title}</h2>

                  <Button className="hero-button">
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