import { MdDelete, MdCheckCircle, MdCached } from "react-icons/md";
import { useState } from "react";
import styles from "./AudioCloudinary.module.css";

export default function AudioCloudinary({
  open,
  setOpen,
  audio,
  setAudio,
  setError,
}) {
  const [form, setForm] = useState({ url: "", label: "", type: "Audio" });
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const { url, label, type } = form;

  const changeUrlHandler = (event) => {
    event.preventDefault();
    const newFile = event.target.files[0];
    setFile(event.target.files[0]);
    setForm({ ...form, url: URL.createObjectURL(newFile) });
  };

  const changeHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const clearHandler = (event, name) => {
    event.preventDefault();
    setErrors({});
    setForm({ ...form, [name]: "" });
  };

  const checkHandler = async (event) => {
    event.preventDefault();
    try {
      setError({});
      setErrors({});
      if (file) {
        setLoader(true);
        const body = new FormData();
        body.append("file", file);
        body.append("upload_preset", "audios");
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_NAME
          }/video/upload`,
          {
            method: "POST",
            body,
          }
        );
        const audio_url = await res.json();
        setAudio([...audio, { url: audio_url.secure_url, label, type }]);
        setForm({ url: "", label: "", type: "Audio" });
        setLoader(false);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
      setErrors({
        ...errors,
        update: "Ocurrió un error. Abra la consola para más información.",
      });
    }
  };

  const deleteHandler = (event) => {
    event.preventDefault();
    setErrors({});
    setForm({ url: "", label: "", type: "Audio" });
    setFile(null);
    setOpen(false);
  };

  return (
    <div className={`${!open && "invisible"} ${styles["container"]}`}>
      <h3 className={styles["instructions"]}>Instrucciones:</h3>
      <ol>
        <li>Seleccione el audio que desea subir.</li>
        <li>
          <p>
            Si está conforme con la vista previa presione el "
            <MdCheckCircle size="1rem" />
            ". En caso contrario, seleccione otro audio.
          </p>
          <p>
            <i>Nota: El audio puedo demorar varios minutos en cargar.</i>
          </p>
        </li>
        <li>
          Si no desea agregar un audio presione "<MdDelete size="1rem" />
          ".
        </li>
      </ol>
      <div className={`${styles["audio-container"]}`}>
        <audio className={`${styles["audio"]}`} src={url} controls />
        <button className={`${styles["check-btn"]}`} onClick={checkHandler}>
          <MdCheckCircle className="blue-icon" size="2rem" />
        </button>
        <button className={`${styles["delete-btn"]}`} onClick={deleteHandler}>
          <MdDelete className="blue-icon" size="2rem" />
        </button>
      </div>
      <div className={`${styles["form-container"]}`}>
        <div>
          <div className={`${styles["buttons-container"]}`}>
            <label htmlFor="label">Título</label>
            {label && (
              <button onClick={(e) => clearHandler(e, "label")}>
                <MdCached className="blue-icon" size="1.5rem" />
              </button>
            )}
          </div>
          <input
            className="text-input"
            id="label"
            type="label"
            name="label"
            onBlur={changeHandler}
            onChange={changeHandler}
            value={label}
            autoComplete="off"
          />
        </div>
        <div>
          <div className={`${styles["buttons-container"]}`}>
            <label htmlFor="audio">Archivo .MP3, .OGG y otros</label>
            {loader && <p>Cargando...</p>}
          </div>
          <input
            className="file-input"
            id="audio"
            type="file"
            name="audio"
            onChange={changeUrlHandler}
            accept="audio/*"
          />
          {errors.update && <p className="error">{errors.update}</p>}
        </div>
      </div>
    </div>
  );
}
