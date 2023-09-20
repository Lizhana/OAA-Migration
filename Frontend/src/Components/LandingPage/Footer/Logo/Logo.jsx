import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../../../../assets/Recurso 2.png';
import styles from "./Logo.module.css";


export default function Logo () {

    return (
        <div className={styles.logo}>
            <Link className={styles.links} to='/'>
                        <img className={styles.logoImage} src={LogoImage} alt="Logo" />
            </Link>
        </div>
    );
};