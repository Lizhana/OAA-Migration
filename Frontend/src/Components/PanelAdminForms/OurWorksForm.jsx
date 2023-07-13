import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuill } from "react-quilljs";
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

import validationsOurWorks from "../../utils/helpers/validationsOurWorks";

import styles from "./OurWorksForm.module.css";
import "quill/dist/quill.snow.css";
import {
  clearOneWork,
  createNewWork,
  editWork,
  reactiveWork,
} from "../../stateManagement/actions/panelAdmin/ourWorks.actions";

const toolbar = [
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ header: [2, 3, false] }],
  ["link", "image", "video"],
  ["clean"],
];

const initialForm = {
  titleMain: "",
  date: "",
  location: "",
  progress: "finished",
  label: "",
};

export default function OurWorksForm() {
  //variables de estados y formularios
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    [labels, setLabels] = useSessionStorage("labelsOurWorks", []),
    [image, setImage] = useSessionStorage("imagesOurWorks", []),
    [pdf, setPdf] = useSessionStorage("pdfOurWorks", []),
    [audio, setAudio] = useSessionStorage("audioOurWorks", []),
    [urlImageOpen, setUrlImageOpen] = useState(false),
    [urlPdfOpen, setUrlPdfOpen] = useState(false),
    [urlAudioOpen, setUrlAudioOpen] = useState(false),
    [cloudinaryImageOpen, setCloudinaryImageOpen] = useState(false),
    [cloudinaryPdfOpen, setCloudinaryPdfOpen] = useState(false),
    [cloudinaryAudioOpen, setCloudinaryAudioOpen] = useState(false),
    { quill, quillRef } = useQuill({ modules: { toolbar } }),
    { oneWork, idOneWork, edit } = useSelector((state) => state.ourWorks),
    { form, errors, setForm, setErrors, changeHandler, resetHandler } = useForm(
      "OurWorksForm",
      initialForm,
      validationsOurWorks
    ),
    { titleMain, date, location, progress, label } = form;

  //Se ejecuta cuando oneWork cambia
  useEffect(() => {
    if (Object.keys(oneWork).length > 0 && edit) {
      const pdfOneWork = oneWork.multimedia.filter(
        (file) => file.type === "PDF"
      );
      const audioOneWork = oneWork.multimedia.filter(
        (file) => file.type === "Audio"
      );
      setForm({
        ...form,
        titleMain: oneWork.titleMain,
        date: oneWork.date,
        progress: oneWork.isFinished ? "finished" : "in progress",
        location: oneWork.location,
      });
      setLabels(oneWork.labels);
      setImage(oneWork.image);
      setPdf(pdfOneWork);
      setAudio(audioOneWork);
      !!oneWork.description &&
        quill &&
        quill.setContents(JSON.parse(oneWork.description));
    } else {
      setForm(initialForm);
      setLabels([]);
      setImage([]);
      setPdf([]);
      setAudio([]);
    }
  }, [oneWork, edit]);

  // Función para regresar a la pantalla anterior
  const backHandler = (event) => {
    event.preventDefault();
    resetHandler();
    setImage([]);
    setLabels([]);
    dispatch(clearOneWork());
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
        createNewWork({
          ...form,
          labels,
          image,
          multimedia: [...audio, ...pdf],
          description: JSON.stringify(quill.getContents()),
          isFinished: progress === "finished" ? true : false,
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
      if (oneWork.isDeleted) {
        dispatch(reactiveWork(idOneWork));
      }
      dispatch(
        editWork(idOneWork, {
          ...form,
          labels,
          image,
          multimedia: [...audio, ...pdf],
          description: JSON.stringify(quill.getContents()),
          isFinished: progress === "finished" ? true : false,
        })
      );
      dispatch(clearOneWork());
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
        {edit ? "Editar un Caso" : "Añadir un Nuevo Caso"}
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

      <label htmlFor="date">Fecha del acontecimiento</label>
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

      <label htmlFor="progress">Estado actual *</label>
      <select
        className={`${styles["select"]}`}
        name="progress"
        id="progress"
        defaultValue={progress}
        onChange={changeHandler}
      >
        <option value="finished">Finalizado</option>
        <option value="in progress">En desarrollo</option>
      </select>

      <label htmlFor="location">Locación</label>
      <input
        className="text-input"
        id="location"
        type="text"
        name="location"
        onBlur={changeHandler}
        onChange={changeHandler}
        value={location}
        placeholder="Lugar en donde ocurrió el evento"
        autoComplete="off"
      />

      <label>Imágenes *</label>
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

      <label>Información extra:</label>
      <label>Audios</label>
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
      <label>PDF</label>
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
            validationsOurWorks(form);
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
