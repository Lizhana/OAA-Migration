import React from "react";
import { Link } from "react-router-dom";
import Styles from "./foro.module.css";
import imageSomos from "../../assets/forum/natSom.webp";

export default function ForoIntroduction() {
  return (
    <div className={Styles["container-foro"]}>
      <h2 className={Styles.titlePrimer}>Nuestro Trabajo</h2>
      <div className={Styles.divContainer}>
        <Link to="/foro/primer-foro-social">
          <h2 className={Styles.titleF}>
            REALIZACIÓN DEL PRIMER FORO SOCIAL Y AMBIENTAL “NATURALEZA SOMOS”:
          </h2>
        </Link>
        <div className={Styles["texto-foro"]}>
        <Link to="/foro/primer-foro-social">
          <img
            src={imageSomos}
            alt="cabecera"
            className={`${Styles.imageForum} ${Styles.right}`}
          /></Link>
          <p className={Styles.ptextoforo} >
            Nuestra Asociación organizó el Primer foro ambiental “Naturaleza
            somos” que se llevó a cabo en Villa Rosa, Pilar, el 5 de octubre de
            2019, con la concurrencia de más de 100 personas, tanto
            representantes de organizaciones como público en general interesado
            en la temática.
          </p>
        </div>
      </div>
      <div className={Styles.divtwo}>
        <h3 className={Styles.titleTwo}>
          Conflictos y Litigios socioambientales
        </h3>
        <p className={Styles["texto-foroTwo"]}>
          Ya sea como Entidad actora o representando a otras personas y
          colectivos, llevamos adelante juicios ambientales y reclamos
          administrativos para prevenir o lograr el cese de actividades lesivas
          para el ambiente, o para asegurar el acceso de las poblaciones a
          derechos básicos asociados al ambiente: agua segura, aire limpio,
          alimentos sanos.
        </p>
      </div>
    </div>
  );
}
