import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getAllNews } from '../../../stateManagement/actions/panelAdmin/news.actions';
import styles from './Communities.module.css';


export default function Communities () {
    const dispatch = useDispatch();
    const { allNews } = useSelector((state) => state?.news);
    const latestNews = allNews.slice().reverse().find((news) => {
      return news.category === "Comunidades";
    });
    console.log('última ', latestNews)


    const communitiesNews = allNews.filter((news) => news.category === "Comunidades");

    const secondLastNews = communitiesNews.slice().reverse()[1];
    console.log('penultima ', secondLastNews)

    const thirdLastNews = communitiesNews.slice().reverse()[2];
    console.log('antepenultima ', thirdLastNews)

 
    useEffect(() => {
      dispatch(getAllNews());
    }, [dispatch]);
    
    return (
        <div className={styles.communities}>
            {/* <div className={styles.introduction}>
                <h3>¿Quieres saber lo que pasa en otras Comunidades?</h3>
                <p >Te invitamos a que ingreses en nuestra Sección de Comunidades, para que conozcas las causas por las que luchan los demás, recuerda que tu puedes ser parte importante, así que sal y apoya, porque tu también eres parte de la solución</p>
            </div>

            <div className={styles.containerCommunities}>
                <div>
                    {latestNews ? (
                        <div className={styles.containerNews}>
                            <div className={styles.containerImage}>
                                <img src={latestNews.image[0].url} className={styles.image} alt="Image" />
                            </div>
                            <div className={styles.containerText}>
                                <h2>{latestNews.titleMain}</h2>
                                <p>{latestNews.introduction}</p>
                                <h4>{latestNews.date}</h4>
                                <div className={styles.labels}>
                                    <Link className={styles.linkText} to={'/#'} target="_blank" rel="noreferrer">Etiqueta 1</Link>
                                    <Link className={styles.linkText} to={'/#'} target="_blank" rel="noreferrer">Etiqueta 2</Link>
                                    <Link className={styles.linkText} to={'/#'} target="_blank" rel="noreferrer">Etiqueta 3</Link>
                                </div>
                            </div>
                        </div>
                        ) : (
                        <p>No hay noticias disponibles</p>
                    )}
                </div>

                <div className={styles.secondary}>
                    {secondLastNews ? (
                        <div className={styles.containerSecondary}>
                            <div className={styles.containerImageSecondary}>
                                <img src={secondLastNews.image[0].url} className={styles.imageSecondary} alt="Image" />
                            </div>
                            <div className={styles.textSecundary}>
                                <h2>{secondLastNews.titleMain}</h2>
                                <p>{secondLastNews.introduction}</p>
                                <h4>{secondLastNews.date}</h4>
                                <Link className={styles.linkText} to={'/#'} target="_blank" rel="noreferrer">Saber más</Link>
                            </div>
                        </div>
                        ) : (
                        <p>No hay noticias disponibles</p>
                    )}

                    {thirdLastNews ? (
                        <div className={styles.containerSecondary}>
                            <div className={styles.containerImageSecondary}>
                                <img src={thirdLastNews.image[0].url} className={styles.imageSecondary} alt="Image" />
                            </div>
                            <div className={styles.textSecundary}>
                                <h2>{thirdLastNews.titleMain}</h2>
                                <p>{thirdLastNews.introduction}</p>
                                <h4>{thirdLastNews.date}</h4>
                                <Link className={styles.linkText} to={'/#'} target="_blank" rel="noreferrer">Saber más</Link>
                            </div>
                        </div>
                        ) : (
                        <p>No hay noticias disponibles</p>
                    )}
                </div>
            </div> */}
        </div>
    );
};