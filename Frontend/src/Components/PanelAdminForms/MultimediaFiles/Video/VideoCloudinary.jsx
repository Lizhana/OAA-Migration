import { MdDelete, MdCheckCircle } from "react-icons/md";
import { useState } from "react";
import styles from "./VideoCloudinary.module.css";

export default function VideoCloudinary({ open, setOpen, setVideo, setError }) {
  const [url, setUrl] = useState({ url: "", platform: "Other" });
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});

  const changeHandler = (event) => {
    event.preventDefault();
    const newFile = event.target.files[0];
    setFile(event.target.files[0]);
    setUrl({ ...url, url: URL.createObjectURL(newFile) });
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
        body.append("upload_preset", "videos");
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_NAME
          }/video/upload`,
          {
            method: "POST",
            body,
          }
        );
        const video_url = await res.json();
        setVideo({ url: video_url.secure_url, platform: "Other" });
        setUrl({ url: "", platform: "Other" });
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
    setUrl({ url: "", platform: "Other" });
    setErrors({});
    setFile(null);
    setOpen(false);
  };

  return (
    <div className={`${!open && "invisible"} ${styles["container"]}`}>
      <div className={`${styles["video-container"]}`}>
        {url.url ? (
          <video className={`${styles["video"]}`} controls>
            <source src={url.url} type="video/mp4" />
            Tu navegador no admite la etiqueta de video.
          </video>
        ) : (
          <div></div>
        )}
      </div>
      <div className={`${styles["form-container"]}`}>
        <ol>
          <li>Seleccione el video que desea subir.</li>
          <li>
            <p>
              Si está conforme con la vista previa presione el "
              <MdCheckCircle size="1rem" />
              ". En caso contrario, seleccione otro video.
            </p>
            <p>
              <i>Nota: El video puedo demorar varios minutos en cargar.</i>
            </p>
          </li>
          <li>
            Si no desea agregar un video presione "<MdDelete size="1rem" />
            ".
          </li>
        </ol>
        <div>
          <div className={`${styles["buttons-container"]}`}>
            <label htmlFor="video">Archivo .MP4 y otros</label>
            {loader ? (
              <p>Cargando...</p>
            ) : (
              <>
                {" "}
                <button onClick={checkHandler}>
                  <MdCheckCircle className="blue-icon" size="1.5rem" />
                </button>
                <button onClick={deleteHandler}>
                  <MdDelete className="blue-icon" size="1.5rem" />
                </button>
              </>
            )}
          </div>
          <input
            className="file-input"
            id="video"
            type="file"
            name="video"
            onChange={changeHandler}
            accept="video/*"
          />
          {errors.update && <p className="error">{errors.update}</p>}
        </div>
      </div>
    </div>
  );
}
