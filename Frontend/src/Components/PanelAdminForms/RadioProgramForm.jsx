import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../utils/customHooks/useForm";
import useSessionStorage from "../../utils/customHooks/useLocalStorage";

import ImageUrl from "./MultimediaFiles/Images/ImageUrl";
import ImageCloudinary from "./MultimediaFiles/Images/ImageCloudinary";
import ViewImages from "./MultimediaFiles/Images/ViewImages";
import ViewAudio from "./MultimediaFiles/Audio/ViewAudio";
import AudioCloudinary from "./MultimediaFiles/Audio/AudioCloudinary";
import AudioUrl from "./MultimediaFiles/Audio/AudioUrl";
import PdfCloudinary from "./MultimediaFiles/Pdf/PdfCloudinary";
import PdfUrl from "./MultimediaFiles/Pdf/PdfUrl";
import ViewPdf from "./MultimediaFiles/Pdf/ViewPdf";

import validationsRadioProgram from "../../utils/helpers/validationsRadioProgram";

import styles from "./RadioProgramForm.module.css";
import {
  clearOneRadioProgram,
  createRadioProgram,
} from "../../stateManagement/actions/panelAdmin/radioProgram.actions";

const initialForm = {
  titleMain: "",
  date: "",
  introduction: "",
  label: "",
};

export default function RadioProgramForm() {
  //variables de estados y formularios
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    [labels, setLabels] = useSessionStorage("labelsRadioProgram", []),
    [image, setImage] = useSessionStorage("imagesRadioProgram", []),
    [pdf, setPdf] = useSessionStorage("pdfRadioProgram", []),
    [audio, setAudio] = useSessionStorage("audioRadioProgram", []),
    [urlImageOpen, setUrlImageOpen] = useState(false),
    [urlPdfOpen, setUrlPdfOpen] = useState(false),
    [urlAudioOpen, setUrlAudioOpen] = useState(false),
    [cloudinaryImageOpen, setCloudinaryImageOpen] = useState(false),
    [cloudinaryPdfOpen, setCloudinaryPdfOpen] = useState(false),
    [cloudinaryAudioOpen, setCloudinaryAudioOpen] = useState(false),
    { oneRadioProgram, idOneRadioProgram, edit } = useSelector(
      (state) => state.radioProgram
    ),
    { form, errors, setForm, setErrors, changeHandler, resetHandler } = useForm(
      "RadioProgramForm",
      initialForm,
      validationsRadioProgram
    ),
    { titleMain, date, introduction, label } = form;

  //Se ejecuta cuando oneRadioProgram cambia
  useEffect(() => {
    if (Object.keys(oneRadioProgram).length > 0 && edit) {
      const pdfRadio = oneRadioProgram.multimedia.filter(
        (file) => file.type === "PDF"
      );
      const audioRadio = oneRadioProgram.multimedia.filter(
        (file) => file.type === "Audio"
      );
      setForm({
        ...form,
        titleMain: oneRadioProgram.titleMain,
        date: oneRadioProgram.date,
        introduction: oneRadioProgram.introduction,
      });
      setLabels(oneRadioProgram.labels);
      setImage(oneRadioProgram.image);
      setPdf(pdfRadio);
      setAudio([oneRadioProgram.audio[0], ...audioRadio]);
    } else {
      setForm(initialForm);
      setLabels([]);
      setImage([]);
      setPdf([]);
      setAudio([]);
    }
  }, [oneRadioProgram, edit]);

  // Función para regresar a la pantalla anterior
  const backHandler = (event) => {
    event.preventDefault();
    resetHandler();
    setImage([]);
    setLabels([]);
    dispatch(clearOneRadioProgram());
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
      const audiosMultimedia = audio.slice(1);
      dispatch(
        createRadioProgram({
          ...form,
          labels,
          image,
          audio: [audio[0]],
          multimedia: [...audiosMultimedia, ...pdf],
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
      const audiosMultimedia = audio.slice(1);
      if (oneRadioProgram.isDeleted) {
        dispatch(reactiveNew(idOneRadioProgram));
      }
      dispatch(
        editNew(idOneRadioProgram, {
          ...form,
          labels,
          image,
          audio: [audio[0]],
          multimedia: [...audiosMultimedia, ...pdf],
        })
      );
      dispatch(clearOneRadioProgram());
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

  //Función para abrir el selector de audio Cloudinary
  const openAudioCloudinary = (event) => {
    event.preventDefault();
    setCloudinaryAudioOpen(true);
  };

  //Función para abrir el selector de audio URL
  const openAudioUrl = (event) => {
    event.preventDefault();
    setUrlAudioOpen(true);
  };

  //Función para abrir el selector de pdf Cloudinary
  const openPdfCloudinary = (event) => {
    event.preventDefault();
    setCloudinaryPdfOpen(true);
  };

  //Función para abrir el selector de pdf URL
  const openPdfUrl = (event) => {
    event.preventDefault();
    setUrlPdfOpen(true);
  };
  return (
    <form className={`${styles["container"]}`}>
      <h1 className={`${styles["header"]}`}>
        {edit
          ? "Editar una Transmisión de Radio"
          : "Añadir una nueva Transmisión de Radio"}
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
      <label htmlFor="date">Fecha de transmisión *</label>
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

      <label>Imagen de Portada</label>
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

      <label htmlFor="introduction">Introducción</label>
      <textarea
        className="introduction-textarea"
        id="introduction"
        name="introduction"
        onBlur={changeHandler}
        onChange={changeHandler}
        value={introduction}
      />

      <label>Audio de transmisión</label>
      <ViewAudio audio={audio} setAudio={setAudio} />
      <AudioCloudinary
        open={cloudinaryAudioOpen}
        setOpen={setCloudinaryAudioOpen}
        audio={audio}
        setAudio={setAudio}
        setError={setErrors}
      />
      <AudioUrl
        open={urlAudioOpen}
        setOpen={setUrlAudioOpen}
        audio={audio}
        setAudio={setAudio}
        setError={setErrors}
      />
      <div className="button-container">
        <button className="button yellow-button" onClick={openAudioCloudinary}>
          Añadir archivo multimedia
        </button>
        <button className="button yellow-button" onClick={openAudioUrl}>
          Añadir URL de multimedia
        </button>
      </div>

      <label>Información extra (PDF):</label>
      <ViewPdf pdf={pdf} setPdf={setPdf} />
      <PdfCloudinary
        open={cloudinaryPdfOpen}
        setOpen={setCloudinaryPdfOpen}
        pdf={pdf}
        setPdf={setPdf}
        setError={setErrors}
      />
      <PdfUrl
        open={urlPdfOpen}
        setOpen={setUrlPdfOpen}
        pdf={pdf}
        setPdf={setPdf}
        setError={setErrors}
      />
      <div className="button-container">
        <button className="button yellow-button" onClick={openPdfCloudinary}>
          Añadir archivo multimedia
        </button>
        <button className="button yellow-button" onClick={openPdfUrl}>
          Añadir URL de multimedia
        </button>
      </div>

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
            validationsRadioProgram(form);
            if (audio.length === 0) {
              setErrors({
                ...errors,
                audio: "Por favor, introduce al menos un audio.",
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
