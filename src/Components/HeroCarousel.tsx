import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { CircularDoublyLinkedList } from "../Helpers/CircularLinkedList";
import { carouselItems, type CarouselItem } from "../data/carouselData";

import "../styles/HeroCarousel.css";

const AUTOPLAY_MS = 4000;
const TRANSITION_MS = 600;

type SlideDirection = "next" | "prev";

interface SlideLayerProps {
  slide: CarouselItem;
  onViewProduct: (productId: number) => void;
}

const SlideLayer = ({ slide, onViewProduct }: SlideLayerProps) => (
  <div className="hero-slide">
    <img
      src={slide.image}
      alt={slide.title}
      className="hero-image"
    />

    <div className="hero-overlay">
      <span className="hero-subtitle">{slide.subtitle}</span>
      <h2>{slide.title}</h2>

      <Button
        className="hero-button"
        onClick={() => onViewProduct(slide.productId)}
      >
        Ver más
      </Button>
    </div>
  </div>
);

const getDirectionToSlide = (
  fromId: number,
  toId: number
): SlideDirection => {
  const fromIndex = carouselItems.findIndex((item) => item.id === fromId);
  const toIndex = carouselItems.findIndex((item) => item.id === toId);

  if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
    return "next";
  }

  const forward =
    (toIndex - fromIndex + carouselItems.length) % carouselItems.length;
  const backward =
    (fromIndex - toIndex + carouselItems.length) % carouselItems.length;

  return forward <= backward ? "next" : "prev";
};

const HeroCarousel = () => {
  const navigate = useNavigate();

  const listRef = useRef(
    new CircularDoublyLinkedList(carouselItems)
  );

  const [currentSlide, setCurrentSlide] = useState<CarouselItem>(() =>
    listRef.current.getCurrent()
  );

  const currentSlideRef = useRef(currentSlide);
  currentSlideRef.current = currentSlide;

  const [outgoingSlide, setOutgoingSlide] = useState<CarouselItem | null>(
    null
  );

  const [slideDirection, setSlideDirection] =
    useState<SlideDirection>("next");

  const [isMoving, setIsMoving] = useState(false);
  const isLockedRef = useRef(false);
  const autoplayRef = useRef<number | null>(null);

  const changeSlide = useCallback(
    (getNext: () => CarouselItem, direction: SlideDirection) => {
      if (isLockedRef.current) {
        return;
      }

      const next = getNext();
      const previous = currentSlideRef.current;

      if (next.id === previous.id) {
        return;
      }

      isLockedRef.current = true;
      setSlideDirection(direction);
      setOutgoingSlide(previous);
      setCurrentSlide(next);
      setIsMoving(false);
    },
    []
  );

  useLayoutEffect(() => {
    if (!outgoingSlide) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      setIsMoving(true);
    });

    const endTimer = window.setTimeout(() => {
      setOutgoingSlide(null);
      setIsMoving(false);
      isLockedRef.current = false;
    }, TRANSITION_MS);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(endTimer);
    };
  }, [outgoingSlide, slideDirection]);

  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current !== null) {
      window.clearInterval(autoplayRef.current);
    }

    autoplayRef.current = window.setInterval(() => {
      changeSlide(() => listRef.current.next(), "next");
    }, AUTOPLAY_MS);
  }, [changeSlide]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayRef.current !== null) {
        window.clearInterval(autoplayRef.current);
      }
    };
  }, [resetAutoplay]);

  const goNext = () => {
    changeSlide(() => listRef.current.next(), "next");
    resetAutoplay();
  };

  const goPrev = () => {
    changeSlide(() => listRef.current.prev(), "prev");
    resetAutoplay();
  };

  const goToSlide = (id: number) => {
    const direction = getDirectionToSlide(
      currentSlideRef.current.id,
      id
    );

    changeSlide(
      () => listRef.current.goTo((item) => item.id === id),
      direction
    );
    resetAutoplay();
  };

  const viewProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const isTransitioning = outgoingSlide !== null;

  // Mercado Libre posiciona los paneles uno al lado del otro en base a la dirección
  const trackPanels: CarouselItem[] = isTransitioning
    ? slideDirection === "next"
      ? [outgoingSlide!, currentSlide] // [Viejo, Nuevo] -> Se desplaza a la izquierda
      : [currentSlide, outgoingSlide!] // [Nuevo, Viejo] -> Se desplaza a la derecha
    : [currentSlide];

  const trackClassName = [
    "hero-slides-track",
    isTransitioning ? "is-duo" : "is-single",
    isTransitioning && (slideDirection === "next" ? "dir-next" : "dir-prev"),
    isTransitioning && isMoving ? "is-moving" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="hero-section">
      <div className="hero-carousel-container">
        <div className="hero-slides-viewport">
          <div className={trackClassName}>
            {trackPanels.map((slide) => (
              <div key={slide.id} className="hero-slide-panel">
                <SlideLayer
                  slide={slide}
                  onViewProduct={viewProduct}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="hero-carousel-control hero-carousel-control-prev"
          onClick={goPrev}
          aria-label="Slide anterior"
        >
          ‹
        </button>

        <button
          type="button"
          className="hero-carousel-control hero-carousel-control-next"
          onClick={goNext}
          aria-label="Slide siguiente"
        >
          ›
        </button>

        <div className="hero-carousel-indicators">
          {carouselItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={
                item.id === currentSlide.id
                  ? "hero-indicator active"
                  : "hero-indicator"
              }
              onClick={() => goToSlide(item.id)}
              aria-label={`Ir a ${item.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;