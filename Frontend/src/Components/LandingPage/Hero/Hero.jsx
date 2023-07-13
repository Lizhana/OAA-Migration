import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { data } from './data';
import styles from "./Hero.module.css";


export default function Carousel () {

    return (
        <div className={styles.carousel}>
            <div className={styles.landing}>
                <p className={styles.landingParagraph}>Asesoramos a personas en conflicto</p>
                <div className={styles.buttonWe}>
                    <a href="/we" target="_blank" rel="noreferrer noopener">
                        <div>Nosotros</div>
                    </a>
                </div >
            </div>
            <Slider
                autoplay={true}
                autoplaySpeed={4000}
                initialSlide={2}
                infinite={true}
                dotsClass="slick-dots custom-indicator"
            >
            {data.map((item) => (
                <div key={data}>
                    <img src={item} alt="Imágenes" style={{ width: "100%"}} />
                </div>
            ))}
            </Slider>
        </div>
    );
};