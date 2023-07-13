import React from 'react';
import styles from './Metrics.module.css';


export default function Metrics () {
    
    return (
        <div className={styles.metrics}>
            <h1>Nuestras métricas de apoyo a las comunidades</h1>
            <div className={styles.containerMetrics}>
                <div className={styles.metricLeft}>
                    <h2>36000</h2>
                    <p>Miembros</p>
                </div>              
                <div className={styles.metric}>
                    <h2>36000</h2>
                    <p>Miembros</p>
                </div>              
                <div className={styles.metricRight}>
                    <h2>36000</h2>
                    <p>Miembros</p>
                </div>              
            </div>
        </div>
    );
};