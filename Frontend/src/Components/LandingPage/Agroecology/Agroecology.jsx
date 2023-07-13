import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { data } from './data';
import styles from "./Agroecology.module.css";


export default function Agroecology () {

    return (
        <div className={styles.agroecology}>
            <p>Siempre tenemos espacio para la vida y la naturaleza, ingresa y conoce cómo puedes ayudar</p>
            <div className={styles.landing}>
                <div className={styles.paragraph}>
                    <p>Agroecología</p>
                </div>
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
                    <img className={styles.images} src={item} alt="Imágenes" />
                </div>
            ))}
            </Slider>
        </div>
    );
};