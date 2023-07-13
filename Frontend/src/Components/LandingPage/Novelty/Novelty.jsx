import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getAllNews } from '../../../stateManagement/actions/panelAdmin/news.actions';
import styles from './Novelty.module.css';


export default function NewsOAA () {
    const dispatch = useDispatch();
    const { allNews } = useSelector((state) => state?.news);
    const latestNews = allNews.slice().reverse().find((news) => {
        return news.category === "Novedades";
    });

    useEffect(() => {
        dispatch(getAllNews());
    }, [dispatch]);
    
      
    return (
        <div className={styles.newsOAA}>
            <div className={styles.container}>
                <Link className={styles.link} to={'/#'} target="_blank" rel="noreferrer">
                    Recursos
                </Link>
                <Link className={styles.link} to={'/#'} target="_blank" rel="noreferrer">
                    Nuestro trabajo
                </Link>
                <Link className={styles.link} to={'/#'} target="_blank" rel="noreferrer">
                    Natuzaleza Somos Radio
                </Link>
            </div>

            <div className={styles.text}>
                <h3>¿Sabes cuáles son los casos en los que tenemos representación?</h3>
                <p>Ingresa en nuestra Sección de Novedades para encontrar las causas en donde la Organización de Ambientalistas Autoconvocados tenemos presencia</p>
            </div>

            {latestNews ? (
                <div className={styles.containerNews}>
                    <div className={styles.containerImage}>
                        <img src={latestNews.image[0].url} className={styles.image} alt="Image" />
                    </div>

                    <div className={styles.containerText}>
                        <h2>{latestNews.titleMain}</h2>
                        <p>{latestNews.introduction}</p>
                        <h4>{latestNews.date}</h4>
                        <Link className={styles.linkText} to={'/#'} target="_blank" rel="noreferrer">Saber más</Link>
                    </div>
                </div>
                ) : (
                <p>No hay noticias disponibles</p>
            )}
        </div>
    );
};
