import { MdDelete, MdCheckCircle, MdCached } from "react-icons/md";
import { useState } from "react";
import styles from "./ImageCloudinary.module.css";

export default function ImageCloudinary({
  open,
  setOpen,
  image,
  setImage,
  setError,
}) {
  const [form, setForm] = useState({ url: "", caption: "" });
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const { url, caption } = form;

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
        body.append("upload_preset", "images");
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_NAME
          }/image/upload`,
          {
            method: "POST",
            body,
          }
        );
        const img_url = await res.json();
        setImage([...image, { url: img_url.secure_url, caption }]);
        setForm({ url: "", caption: "" });
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
    setError({});
    setForm({ url: "", caption: "" });
    setFile(null);
    setOpen(false);
  };

  return (
    <div className={`${!open && "invisible"} ${styles["container"]}`}>
      <div className={`${styles["image-container"]}`}>
        {url && (
          <img
            className={`${styles["image"]}`}
            src={url}
            alt="Previsualización"
          />
        )}
        <button className={`${styles["check-button"]}`} onClick={checkHandler}>
          <MdCheckCircle className="blue-icon" size="2rem" />
        </button>
        <button
          className={`${styles["delete-button"]}`}
          onClick={deleteHandler}
        >
          <MdDelete className="blue-icon" size="2rem" />
        </button>
      </div>
      <div className={`${styles["form-container"]}`}>
        <ol>
          <li>Seleccione la imagen que desea subir.</li>
          <li>
            Si está conforme con la vista previa presione el "
            <MdCheckCircle size="1rem" />
            ". En caso contrario, seleccione otra imagen.
          </li>
          <li>
            Si no desea agregar una imagen presione "<MdDelete size="1rem" />
            ".
          </li>
        </ol>
        <div>
          <label htmlFor="image">Archivo .PNG, .JPG ó .WEBP</label>
          <input
            className="file-input"
            id="image"
            type="file"
            name="image"
            onChange={changeUrlHandler}
            accept="image/*"
          />
          {errors.update && <p className="error">{errors.update}</p>}
        </div>
        <div>
          <div className={`${styles["buttons-container"]}`}>
            <label htmlFor="caption">Pie de imagen (opcional)</label>
            {loader && <p>Cargando...</p>}
            {caption && (
              <button onClick={(e) => clearHandler(e, "caption")}>
                <MdCached className="blue-icon" size="1.5rem" />
              </button>
            )}
          </div>
          <input
            className="text-input"
            id="caption"
            type="caption"
            name="caption"
            onBlur={changeHandler}
            onChange={changeHandler}
            value={caption}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
