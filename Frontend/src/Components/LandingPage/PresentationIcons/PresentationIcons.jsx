import React, { useState, useEffect } from 'react';
import CasesIcon from '../../../assets/Recurso 6.png';
import TeamIcon from '../../../assets/Recurso 22.png';
import NewsIcon from '../../../assets/Recurso 3.png';
import ResourcesIcon from '../../../assets/Recurso 4.png';
import OurJobIcon from '../../../assets/Recurso 5.png';
import RadioIcon from '../../../assets/Recurso 1.png';
import styles from './PresentationIcons.module.css';


export default function PresentationIcons() {

  return (
    <div className={styles.container}>
      <a href="/activeCases" className={styles.contCases}>
        <h2>Nuestros Casos</h2>
        <div className={styles.contImg}>
          <img src={CasesIcon} alt='cases' className={styles.imgIcon}/>
        </div>
      </a>
      <a href="/nosotros" className={styles.contTeam}>
        <h2>Nuestro Equipo</h2>
        <div className={styles.contImg}>
          <img src={TeamIcon} alt='team' className={styles.imgIcon1}/>
        </div>
      </a>
      <a href="/noticias" className={styles.contNews}>
        <h2>Noticias</h2>
        <div className={styles.contImg}>
          <img src={NewsIcon} alt='news' className={styles.imgIcon1}/>
        </div>
      </a>
      <a href="" className={styles.contResources}>
        <h2>Nuestros Recursos</h2>
        <div className={styles.contImg}>
          <img src={ResourcesIcon} alt='resources' className={styles.imgIcon}/>
        </div>
      </a>
      <a href="/nuestro-trabajo" className={styles.contOurJob}>
        <h2>Nuestro Trabajo</h2>
        <div className={styles.contImg}>
          <img src={OurJobIcon} alt='job' className={styles.imgIcon2}/>
        </div>
      </a>
      <a href="/naturalezaSomos" className={styles.contRadio}>
        <h2>Nuestra Radio</h2>
        <div className={styles.contImg}>
          <img src={RadioIcon} alt='radio' className={styles.imgIcon}/>
        </div>
      </a>
    </div>
  );
};