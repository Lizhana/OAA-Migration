import React from 'react';
import NewsONG from '../../../assets/NewsONG.jpg';
import { Link } from 'react-router-dom';
import styles from './MostReadNews.module.css';


export default function MostReadNews () {
    
    return (
        <div className={styles.mostReadNews}>
            <div className={styles.readNews}>
                <div className={styles.newsOne}>
                    <div>
                        <div className={styles.containerImage}>
                            <img src={NewsONG} className={styles.image} alt="Image" />
                        </div>
                        <h2>Title news</h2>
                        <p>Description news. lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
                        <h4>Mayo 20 de 2023</h4>
                    </div>

                    <div className={styles.labels}>
                        <Link className={styles.linkText} to={'/#'} target="_blank" rel="noreferrer">
                            Etiqueta 1
                        </Link>
                        <Link className={styles.linkText} to={'/#'} target="_blank" rel="noreferrer">
                            Etiqueta 2
                        </Link>
                    </div>
                </div>
                
                <div className={styles.newsOne}>
                    <div>
                        <div className={styles.containerImage}>
                            <img src={NewsONG} className={styles.image} alt="Image" />
                        </div>
                        <h2>Title news</h2>
                        <p>Description news. lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
                        <h4>Mayo 20 de 2023</h4>
                    </div>

                    <div className={styles.labels}>
                        <Link className={styles.linkText} to={'/#'} target="_blank" rel="noreferrer">
                            Etiqueta 1
                        </Link>
                        <Link className={styles.linkText} to={'/#'} target="_blank" rel="noreferrer">
                            Etiqueta 2
                        </Link>
                    </div>
                </div>                   
            </div>

            <div className={styles.agenda}>
                <div className={styles.agendaOne}>
                    <div className={styles.dateTop}>
                        <h2>May 20</h2>
                        <p>2023</p>
                    </div>
                    <div className={styles.textNews}>
                        <h3>Title news</h3>
                        <p>Description news</p>
                        <p>Hour</p>
                    </div>
                </div>

                <div className={styles.agendaOne}>
                    <div className={styles.date}>
                        <h2>May 20</h2>
                        <p>2023</p>
                    </div>
                    <div className={styles.textNews}>
                        <h3>Title news</h3>
                        <p>Description news</p>
                        <p>Hour</p>
                    </div>
                </div>

                <div className={styles.agendaOne}>
                    <div className={styles.dateBottom}>
                        <h2>May 20</h2>
                        <p>2023</p>
                    </div>
                    <div className={styles.textNews}>
                        <h3>Title news</h3>
                        <p>Description news</p>
                        <p>Hour</p>
                    </div>
                </div>




            </div>
        </div>
    );
};