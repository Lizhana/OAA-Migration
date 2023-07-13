import React, { useState, useEffect } from 'react';
import { data } from "./data";
import styles from './Galery.module.css';


export default function Galery () {    
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex(i => (i + 1) % data.length);
        }, 10000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.galery}>
            <div className={styles.video}>Uno</div>
            <div className={styles.containerImages}>
                <img className={styles.images} src={data[index]} alt="" />
            </div>
        </div>
    );
};