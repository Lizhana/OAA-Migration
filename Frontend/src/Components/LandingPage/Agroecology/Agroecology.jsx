import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { data } from './data';
import styles from "./Agroecology.module.css";


export default function Agroecology() {

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Siempre tenemos espacio para la vida y la naturaleza</h1>
            <h2 className={styles.sub}>Conoce nuestras novedades y descubre cómo puedes ayudar</h2>
            <div className={styles.contPrincipal}>
                <div className={styles.contUp}>
                    <div className={styles.imgUp} />
                    <div className={styles.contText}>
                        <h2 className={styles.h2}>Título noticia</h2>
                        <h3 className={styles.h3}>Descripción coorta Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat...</h3>
                    </div>
                </div>
                <div className={styles.contDown}>
                    <div className={styles.contMini}>
                        <div className={styles.contMini1} />
                        <div className={styles.contText2}>
                            <h2 className={styles.h2}>Noticia secundaria 1</h2>
                            <h3 className={styles.h3}>Descripción coorta Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat...</h3>
                        </div>
                    </div>
                    <div className={styles.contMini}>
                        <div className={styles.contMini2} />
                        <div className={styles.contText2}>
                            <h2 className={styles.h2}>Noticia secundaria 2</h2>
                            <h3 className={styles.h3}>Descripción coorta Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat...</h3>
                        </div>
                    </div>
                    <div className={styles.contMini}>
                        <div className={styles.contMini3} />
                        <div className={styles.contText2}>
                            <h2 className={styles.h2}>Noticia secundaria 3</h2>
                            <h3 className={styles.h3}>Descripción coorta Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat...</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};