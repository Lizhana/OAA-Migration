import { useState } from "react";
import { MdDelete, MdCheckCircle, MdCached } from "react-icons/md";
import { validationsUrl } from "../../../../utils/helpers/validationsUrl";
import styles from "./ImageUrl.module.css";

export default function ImageUrl({ open, setOpen, image, setImage, setError }) {
  const [form, setForm] = useState({ url: "", caption: "" });
  const [errors, setErrors] = useState("");
  const { url, caption } = form;

  const changeHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    setErrors(validationsUrl(url));
  };

  const clearHandler = (event, name) => {
    event.preventDefault();
    setErrors({});
    setForm({ ...form, [name]: "" });
  };

  const checkHandler = (event) => {
    event.preventDefault();
    setError({});
    setErrors(validationsUrl(url));
    if (Object.keys(errors).length === 0) {
      setImage([...image, form]);
      setForm({ url: "", caption: "" });
      setOpen(false);
    }
  };

  const deleteHandler = (event) => {
    event.preventDefault();
    setError({});
    setForm({ url: "", caption: "" });
    setOpen(false);
  };
  return (
    <div className={`${!open && "invisible"} ${styles["container"]}`}>
      <div className={`${styles["image-container"]}`}>
        {url && <img className={`${styles["image"]}`} src={url} />}
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
          <li>Introduzca el URL de la imagen.</li>
          <li>
            Si está conforme con la vista previa presione el "
            <MdCheckCircle size="1rem" />
            ". En caso contrario, presione "<MdCached size="1rem" />" e
            introduzca otro URL.
          </li>
          <li>
            Si no desea agregar una imagen presione "<MdDelete size="1rem" />
            ".
          </li>
        </ol>
        <div>
          <div className={`${styles["buttons-container"]}`}>
            <label htmlFor="url">URL</label>
            {url && (
              <button onClick={(e) => clearHandler(e, "url")}>
                <MdCached className="blue-icon" size="1.5rem" />
              </button>
            )}
          </div>
          <input
            className="text-input"
            id="url"
            type="url"
            name="url"
            onBlur={changeHandler}
            onChange={changeHandler}
            value={url}
            autoComplete="off"
          />
          {errors.url && <p className="error">{errors.url}</p>}
        </div>
        <div>
          <div className={`${styles["buttons-container"]}`}>
            <label htmlFor="caption">Pie de imagen (opcional)</label>
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
