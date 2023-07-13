import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../../../../assets/OAA.png';
import styles from "./Logo.module.css";


export default function Logo () {

    return (
        <div className={styles.logo}>
            <Link className={styles.links} to='http://127.0.0.1:5173/'>
                <div className={styles.logo__container} >
                    <div>
                        <img className={styles.logoImage} src={LogoImage} alt="Logo" />
                    </div>
                    <div className={styles.logoFirts}>
                        <div>ORGANIZACION de</div>
                        <div>AMBIENTALISTAS</div>
                    </div>
                    <div className={styles.logoSecond}>
                        <div>AUTOCONVOCADOS</div>
                    </div>
                </div>
            </Link>
        </div>
    );
};