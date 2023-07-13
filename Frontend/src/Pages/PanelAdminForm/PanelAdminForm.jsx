import React from "react";
import { useParams } from "react-router-dom";
import Error404 from "../Error404/Error404";
import GalleryImageForm from "../../Components/PanelAdminForms/GalleryImageForm";
import GalleryVideoForm from "../../Components/PanelAdminForms/GalleryVideoForm";
import PublicationsForm from "../../Components/PanelAdminForms/PublicationsForm";
import RadioProgramForm from "../../Components/PanelAdminForms/RadioProgramForm";
import logo from "../../assets/logo-temporal-2.png";
import styles from "./PanelAdminForm.module.css";
import { useSelector } from "react-redux";
import OurWorksForm from "../../Components/PanelAdminForms/OurWorksForm";

export default function PanelAdminForm() {
  const { form } = useParams(),
    { admin } = useSelector((state) => state.admin);

  return (
    <div className={`${styles["container"]}`}>
      <header className={`${styles["header"]}`}>
        <div>
          <img
            src={logo}
            alt="Logo Organización de Ambientalistas Autoconvocados"
          />
          <h1>Panel de Administrador</h1>
        </div>
        <h3>Hola, {admin.name}</h3>
      </header>
      {form !== "gallery-image-form" &&
        form !== "gallery-video-form" &&
        form !== "our-works-form" &&
        form !== "publications-form" &&
        form !== "radio-program-form" && <Error404 />}
      {form === "gallery-image-form" && <GalleryImageForm />}
      {form === "gallery-video-form" && <GalleryVideoForm />}
      {form === "our-works-form" && <OurWorksForm />}
      {form === "publications-form" && <PublicationsForm />}
      {form === "radio-program-form" && <RadioProgramForm />}
      <footer className={`${styles["footer"]}`}>
        <p>©2023 Organización de Ambientalistas Autoconvocados</p>
        <p>Desarrollado por Henry Project </p>
      </footer>
    </div>
  );
}
