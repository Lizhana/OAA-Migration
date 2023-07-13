import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuill } from "react-quilljs";
import useForm from "../../utils/customHooks/useForm";
import useSessionStorage from "../../utils/customHooks/useLocalStorage";

import {
  clearOneGallery,
  createGallery,
  editGallery,
  reactiveGallery,
} from "../../stateManagement/actions/panelAdmin/gallery.actions";
import validationsGallery from "../../utils/helpers/validationsGallery";

import ImageUrl from "./MultimediaFiles/Images/ImageUrl";
import ImageCloudinary from "./MultimediaFiles/Images/ImageCloudinary";
import ViewImages from "./MultimediaFiles/Images/ViewImages";

import styles from "./GalleryImageForm.module.css";
import "quill/dist/quill.snow.css";

const toolbar = [
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ header: [2, 3, false] }],
  ["link", "image", "video"],
  ["clean"],
];

const initialForm = {
  titleMain: "",
  category: "Imagen",
  date: "",
  author: "OAA",
  urlAuthor: "https://ambientalistas.org.ar/contenido/83/nosotrxs",
  location: "",
  introduction: "",
  label: "",
};
export default function GalleryImageForm() {
  //variables de estados y formularios
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    [labels, setLabels] = useSessionStorage("labelsGalleryImage", []),
    [image, setImage] = useSessionStorage("imageGalleryImage", []),
    [urlImageOpen, setUrlImageOpen] = useState(false),
    [cloudinaryImageOpen, setCloudinaryImageOpen] = useState(false),
    { quill, quillRef } = useQuill({ modules: { toolbar } }),
    { oneGallery, idOneGallery, edit } = useSelector((state) => state.gallery),
    { form, errors, setForm, setErrors, changeHandler, resetHandler } = useForm(
      "galeryImageForm",
      initialForm,
      validationsGallery
    ),
    { titleMain, date, author, urlAuthor, introduction, label } = form;

  //Se ejecuta cuando oneGallery cambia
  useEffect(() => {
    if (Object.keys(oneGallery).length > 0 && edit) {
      setForm({
        ...form,
        titleMain: oneGallery.titleMain,
        date: oneGallery.date,
        author: oneGallery.author,
        urlAuthor: oneGallery.urlAuthor,
        introduction: oneGallery.introduction,
      });
      setLabels(oneGallery.labels);
      setImage(oneGallery.image);
      !!oneGallery.description &&
        quill &&
        quill.setContents(JSON.parse(oneGallery.description));
    } else {
      setForm(initialForm);
      setLabels([]);
      setImage([]);
    }
  }, [oneGallery, edit]);

  // Función para regresar a la pantalla anterior
  const backHandler = (event) => {
    event.preventDefault();
    resetHandler();
    setImage([]);
    setLabels([]);
    dispatch(clearOneGallery());
    navigate("/panel-admin");
  };

  // Función para agregar etiquetas
  const addLabelsHandler = (event) => {
    event.preventDefault();
    label && setLabels([...labels, label]);
    setForm({ ...form, label: "" });
  };
  // Función para eliminar etiquetas
  const deleteLabelsHandler = (event, oneLabel) => {
    event.preventDefault();
    const deletedLabel = labels.filter((l) => l !== oneLabel);
    setLabels([...deletedLabel]);
  };

  // Función para publicar un nuevo elemento:
  const createHandler = () => {
    if (Object.keys(errors).length === 0) {
      dispatch(
        createGallery({
          ...form,
          labels,
          image,
          description: JSON.stringify(quill.getContents()),
        })
      );
      resetHandler();
      setImage([]);
      setLabels([]);
      navigate("/panel-admin");
    }
  };

  // Función para editar un elemento:
  const editHandler = () => {
    if (Object.keys(errors).length === 0) {
      if (oneGallery.isDeleted) {
        dispatch(reactiveGallery(idOneGallery));
      }
      dispatch(
        editGallery(idOneGallery, {
          ...form,
          labels,
          image,
          description: JSON.stringify(quill.getContents()),
        })
      );
      dispatch(clearOneGallery());
      resetHandler();
      setImage([]);
      setLabels([]);
      navigate("/panel-admin");
    }
  };

  //Función para abrir el selector de imagen Cloudinary
  const openImageCloudinary = (event) => {
    event.preventDefault();
    setCloudinaryImageOpen(true);
  };

  //Función para abrir el selector de imagen URL
  const openImageUrl = (event) => {
    event.preventDefault();
    setUrlImageOpen(true);
  };

  return (
    <form className={`${styles["container"]}`}>
      <h1 className={`${styles["header"]}`}>
        {edit ? "Editar Imagen" : "Añadir una nueva Imagen"}
      </h1>

      <label htmlFor="titleMain">Título *</label>
      <input
        className="text-input"
        id="titleMain"
        type="text"
        name="titleMain"
        onBlur={changeHandler}
        onChange={changeHandler}
        value={titleMain}
        required
        autoComplete="off"
      />
      {errors.titleMain && <p className="error">{errors.titleMain}</p>}
      <label htmlFor="date">Fecha del acontecimiento *</label>
      <input
        className="text-input"
        id="date"
        type="text"
        name="date"
        onBlur={changeHandler}
        onChange={changeHandler}
        value={date}
        placeholder="Ej: 22 de Abril del 2023"
        required
        autoComplete="off"
      />
      {errors.date && <p className="error">{errors.date}</p>}
      <label htmlFor="author">Autor *</label>
      <input
        className="text-input"
        id="author"
        type="text"
        name="author"
        onBlur={changeHandler}
        onChange={changeHandler}
        value={author}
        required
        autoComplete="off"
      />
      {errors.author && <p className="error">{errors.author}</p>}
      <label htmlFor="urlAuthor">Autor URL</label>
      <input
        className="text-input"
        id="urlAuthor"
        type="text"
        name="urlAuthor"
        onBlur={changeHandler}
        onChange={changeHandler}
        value={urlAuthor}
        required
        autoComplete="off"
      />
      <label htmlFor="introduction">Introducción</label>
      <textarea
        className="introduction-textarea"
        id="introduction"
        name="introduction"
        onBlur={changeHandler}
        onChange={changeHandler}
        value={introduction}
      />
      {errors.introduction && <p className="error">{errors.introduction}</p>}

      <label>Imagenes *</label>
      {errors.image && <p className="error">{errors.image}</p>}
      <ViewImages images={image} setImages={setImage} />
      <ImageCloudinary
        open={cloudinaryImageOpen}
        setOpen={setCloudinaryImageOpen}
        image={image}
        setImage={setImage}
        setError={setErrors}
      />
      <ImageUrl
        open={urlImageOpen}
        setOpen={setUrlImageOpen}
        image={image}
        setImage={setImage}
        setError={setErrors}
      />
      <div className="button-container">
        <button className="button yellow-button" onClick={openImageCloudinary}>
          Añadir archivo multimedia
        </button>
        <button className="button yellow-button" onClick={openImageUrl}>
          Añadir URL de multimedia
        </button>
      </div>

      <label htmlFor="description">Contenido *</label>
      <div ref={quillRef}></div>

      <label htmlFor="label">Etiquetas</label>
      {labels && labels.length > 0 && (
        <div className={`${styles["labels-list"]}`}>
          {labels.map((oneLabel, index) => (
            <button
              className="blue-button"
              key={`label-${index}`}
              title="Eliminar etiqueta"
              onClick={(event) => deleteLabelsHandler(event, oneLabel)}
            >
              {oneLabel}
            </button>
          ))}
        </div>
      )}
      <div className={`${styles["labels-input"]}`}>
        <input
          className="text-input"
          id="label"
          type="text"
          name="label"
          onBlur={changeHandler}
          onChange={changeHandler}
          value={label}
          autoComplete="off"
        />
        <button className="button yellow-button" onClick={addLabelsHandler}>
          Agregar
        </button>
      </div>

      <div className="button-container">
        <button className="button blue-button" onClick={backHandler}>
          Volver
        </button>
        <button
          className="button green-button"
          onClick={(event) => {
            event.preventDefault();
            validationsGallery(form);
            if (image.length === 0) {
              setErrors({
                ...errors,
                image: "Por favor, introduce al menos una imagen.",
              });
            } else {
              edit ? editHandler() : createHandler();
            }
          }}
        >
          Publicar
        </button>
      </div>
    </form>
  );
}
