import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../../../assets/output.png';
import styles from "./Logo.module.css";


export default function Logo () {

    return (
        <div className={styles.logo}>
            <Link className={styles.links} to='/'>
                <div className={styles.logo__container} >
                    <div>
                        <img className={styles.logoImage} src={LogoImage} alt="Logo" />
                    </div>
                </div>
            </Link>
        </div>
    );
};