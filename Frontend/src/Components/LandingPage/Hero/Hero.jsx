import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { data } from './data';
import styles from "./Hero.module.css";
import { Link } from "react-router-dom";


export default function Carousel() {

  return (
    <div className={styles.carousel}>
      <div className={styles.contCarousel}>
        <Slider
          autoplay={true}
          autoplaySpeed={4000}
          initialSlide={2}
          infinite={true}
          dotsClass="slick-dots custom-indicator"
        >
          {data.map((item) => (
            <img key={item} src={item} alt="Imágenes"/>
          ))}
        </Slider>
      </div>
      <div className={styles.landing}>
        <p className={styles.landingParagraph}>Junto a las comunidades en conflicto, por el derecho humano a un ambiente sano.</p>
        <button className={styles.buttonWe}>
          <Link to="/nosotros">
            Sobre Nosotros
          </Link>
        </button >
      </div>
    </div>
  );
};