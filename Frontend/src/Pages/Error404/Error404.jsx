import React from "react";
import logo from "../../assets/logo-temporal-2.png";
import styles from "./Error404.module.css";
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();

  const homeHandler = (event) => {
    event.preventDefault();
    navigate(`/`);
  };
  const backHandler = (event) => {
    event.preventDefault();
    navigate(-1);
  };
  return (
    <article className={`${styles["container"]}`}>
      <img
        className={`${styles["error-image"]}`}
        src={logo}
        alt='logo-header'
      />
      <section className={`${styles["error-container"]}`}>
        <h1 className={`${styles["error-h1"]}`}>Error 404</h1>
        <h3 className={`${styles["error-h3"]}`}>
          Vaya... ¡Página no encontrada!
        </h3>
        <p className={`${styles["error-p"]}`}>
          La página que buscas no existe.
        </p>
        <div className='button-container'>
          <button
            className={`button blue-button ${styles["error-button"]}`}
            onClick={backHandler}
          >
            ATRÁS
          </button>
          <button
            className={` button green-button ${styles["error-button"]}`}
            onClick={homeHandler}
          >
            INICIO
          </button>
        </div>
      </section>
    </article>
  );
}
