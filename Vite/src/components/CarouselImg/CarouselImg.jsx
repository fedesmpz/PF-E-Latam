import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from "../Landing/Landing.module.css"

const CarouselHero = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={styles.carouselHero} >
      <Carousel activeIndex={index} onSelect={handleSelect} indicators={false} >
        <Carousel.Item className={styles.indexInZ} >
          <img
            className="d-block w-100"
            src="images/imagenes_hero/1.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item className={styles.indexInZ} >
          <img
            className="d-block w-100"
            src="images/imagenes_hero/imghero2.png"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item className={styles.indexInZ} >
          <img
            className="d-block w-100"
            src="images/imagenes_hero/3.png"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item className={styles.indexInZ} >
          <img
            className="d-block w-100"
            src="images/imagenes_hero/4.png"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item className={styles.indexInZ} >
          <img
            className="d-block w-100"
            src="images/imagenes_hero/5.png"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselHero;