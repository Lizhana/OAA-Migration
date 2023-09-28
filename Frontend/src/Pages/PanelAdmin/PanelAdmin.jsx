import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Subscriptions from "../../Components/PanelAdmin/Subscriptions";
import Donations from "../../Components/PanelAdmin/Donations";
import Publications from "../../Components/PanelAdmin/Publications";
import RadioProgram from "../../Components/PanelAdmin/RadioProgram";
import Gallery from "../../Components/PanelAdmin/Gallery";
import Administrators from "../../Components/PanelAdmin/Administrators";
import ChangePassword from "../../Components/PanelAdmin/ChangePassword";
import logo from "../../assets/logo-temporal-2.png";
import styles from "./PanelAdmin.module.css";
import useModal from "../../utils/customHooks/useModal";
import {
  loaderOff,
  loaderOn,
} from "../../stateManagement/actions/loader/loader.actions";
import { confirmationOpen } from "../../stateManagement/actions/alerts/confirmationWindow.actions";
import { logoutAdmin } from "../../stateManagement/actions/panelAdmin/admin.actions";
import ConfirmationWindow from "../../Components/Alerts/ConfirmationWindow";
import OurWorks from "../../Components/PanelAdmin/OurWorks";

export default function PanelAdmin() {
  const dispatch = useDispatch(),
    navigate = useNavigate(),
    [isOpen, open, close] = useModal(),
    [currentSection, setCurrentSection] = useState("donations"),
    { admin } = useSelector((state) => state.admin);

  const logoutHandler = () => {
    dispatch(loaderOn());
    dispatch(logoutAdmin());
    dispatch(loaderOff());
    navigate("/login");
  };

  const confirmationHandler = (event) => {
    event.preventDefault();
    dispatch(
      confirmationOpen({
        message: `¿Seguro que quieres cerrar la sesión?`,
        acept: logoutHandler,
      })
    );
  };

  return (
    <div className={`${styles["container"]}`}>
      <ConfirmationWindow />
      <ChangePassword isOpen={isOpen} close={close} />
      <header className={`${styles["header"]}`}>
        <div>
          <img
            src={logo}
            alt="Logo Organización de Ambientalistas Autoconvocados"
          />
          <h1>Panel de Administrador</h1>
        </div>
        <h3>Hola</h3>
      </header>
      <nav className={`${styles["navbar"]}`}>
        <ul className={`${styles["ul-sections"]}`}>
          <li
            className={
              currentSection === "donations" ? styles["active"] : "undefined"
            }
            onClick={() => setCurrentSection("donations")}
          >
            Donaciones
          </li>
          <li
            className={
              currentSection === "subscriptions"
                ? styles["active"]
                : "undefined"
            }
            onClick={() => setCurrentSection("subscriptions")}
          >
            Suscripciones
          </li>
          <li
            className={
              currentSection === "publications" ? styles["active"] : "undefined"
            }
            onClick={() => setCurrentSection("publications")}
          >
            Publicaciones
          </li>
          <li
            className={
              currentSection === "our-works" ? styles["active"] : "undefined"
            }
            onClick={() => setCurrentSection("our-works")}
          >
            Nuestro trabajo
          </li>
          <li
            className={
              currentSection === "radio-program"
                ? styles["active"]
                : "undefined"
            }
            onClick={() => setCurrentSection("radio-program")}
          >
            Programa de Radio
          </li>
          <li
            className={
              currentSection === "gallery" ? styles["active"] : "undefined"
            }
            onClick={() => setCurrentSection("gallery")}
          >
            Galería
          </li>
          <li
            className={
              currentSection === "administrators"
                ? `${styles["active"]}`
                : "undefined"
            }
            onClick={() => setCurrentSection("administrators")}
          >
            Administradores
          </li>
        </ul>
        <ul className={`${styles["ul-actions"]}`}>
          <li>
            <button onClick={open}>Cambiar contraseña</button>
          </li>
          <li>
            <button onClick={confirmationHandler}>Cerrar Sesión</button>
          </li>
        </ul>
      </nav>
      <main className={`${styles["main"]}`}>
        {currentSection === "donations" && <Donations />}
        {currentSection === "subscriptions" && <Subscriptions />}
        {currentSection === "publications" && <Publications />}
        {currentSection === "our-works" && <OurWorks />}
        {currentSection === "radio-program" && <RadioProgram />}
        {currentSection === "gallery" && <Gallery />}
        {currentSection === "administrators" && <Administrators />}
      </main>
      <footer className={`${styles["footer"]}`}>
        <p>©2023 Organización de Ambientalistas Autoconvocados</p>
        <p>Desarrollado por Henry Project </p>
      </footer>
    </div>
  );
}
