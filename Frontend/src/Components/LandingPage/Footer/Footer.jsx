import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo/Logo';
import SocialNetwork from './SocialNetwork/SocialNetwork';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import styles from "./Footer.module.css";


export default function Footer() {

    return (
        <div className={styles.footer}>
            <div className={styles.footer__container}>


                <div className={styles.dates}>
                    <div className={styles.socialNetwork}>
                        <SocialNetwork />
                    </div>
                    <div className={styles.logo__container}>
                        <Logo />
                    </div>
                    <div className={styles.footer__contact}>
                        <p><BsFillTelephoneFill className={styles.footer__iconContact} />+54 11 5959-5883</p>
                        <p><FaMapMarkerAlt className={styles.footer__iconContact} />BUENOS AIRES (ARGENTINA)</p>
                        <p><MdEmail className={styles.footer__iconContact} />ambientalistas.autoconvocados@gmail.com</p>
                    </div>
                </div>
                <div className={styles.copyRight}>
                    <p>Desarrollado por <Link className={styles.henryProjects}>Henry Projects</Link>, todos los derechos reservados.</p>
                </div>
            </div>
        </div>
    );
};