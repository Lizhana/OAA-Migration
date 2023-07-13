import React from 'react';
import styles from "./Date.module.css";


export default function Logo () {
    const fecha = new Date();
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaActual = fecha.toLocaleDateString('es-ES', opciones);


    return (
        <div className={`${styles.container__logo} spaceBetween`}>
            <div className={`${styles.date} AIflexEnd`}>
                <p>{fechaActual}</p>
            </div>
        </div>
    );
};