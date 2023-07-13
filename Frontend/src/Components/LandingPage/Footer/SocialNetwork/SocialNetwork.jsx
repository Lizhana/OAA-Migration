import React from 'react';
import { AiFillYoutube, AiFillInstagram } from 'react-icons/ai';
import { BsWhatsapp, BsFacebook } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styles from "./SocialNetwork.module.css";


export default function SocialNetwork() {

    return (
        <div className={styles.socialNetworks}>
            <h3>SEGUINOS EN</h3>
            <div className={styles.socialNetworks__container}>
                <div className={styles.borderSocialNetworks}>
                    <Link className={`links`} to='https://web.whatsapp.com/send?phone=541159595883&text' target="_blank" rel="noreferrer noopener"><BsWhatsapp className={styles.iconSocialNetworks} /></Link>
                </div>
                <div className={styles.borderSocialNetworks}>
                    <Link className={`links`} to='https://www.facebook.com/ambientalistasautoconvocados' target="_blank" rel="noreferrer noopener"><BsFacebook className={styles.iconSocialNetworks} /></Link>
                </div>
                <div className={styles.borderSocialNetworks}>
                    <Link className={`links`} to='https://www.youtube.com/channel/UCT64cve4G5vgrbn3U8DUu0A' target="_blank" rel="noreferrer noopener"><AiFillYoutube className={styles.iconSocialNetworks} /></Link>
                </div>
                <div className={styles.borderSocialNetworks}>
                    <Link className={`links`} to='https://www.instagram.com/ambientalistas_autoconvocados' target="_blank" rel="noreferrer noopener"><AiFillInstagram className={styles.iconSocialNetworks} /></Link>
                </div>
            </div>
        </div>
    );
};