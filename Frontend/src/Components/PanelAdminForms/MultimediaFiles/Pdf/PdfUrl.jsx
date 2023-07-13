import { useState } from "react";
import { MdDelete, MdCheckCircle, MdCached } from "react-icons/md";
import { validationsUrl } from "../../../../utils/helpers/validationsUrl";
import styles from "./PdfUrl.module.css";

export default function PdfUrl({ open, setOpen, pdf, setPdf, setError }) {
  const [form, setForm] = useState({ url: "", label: "", type: "PDF" });
  const [errors, setErrors] = useState("");
  const { url, label } = form;

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
    setErrors(validationsUrl(url));
    if (Object.keys(errors).length === 0) {
      setPdf([...pdf, form]);
      setForm({ url: "", label: "", type: "PDF" });
      setOpen(false);
    }
  };

  const deleteHandler = (event) => {
    event.preventDefault();
    setError({});
    setForm({ url: "", label: "", type: "PDF" });
    setOpen(false);
  };
  return (
    <div className={`${!open && "invisible"} ${styles["container"]}`}>
      <div className={`${styles["pdf-container"]}`}>
        {url ? (
          <iframe className={`${styles["pdf"]}`} src={url} />
        ) : (
          <div></div>
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
        <h3 className={styles["instructions"]}>Instrucciones:</h3>

        <ol>
          <li>Introduzca el URL del PDF.</li>
          <li>
            Si está conforme con la vista previa presione el "
            <MdCheckCircle size="1rem" />
            ". En caso contrario, presione "<MdCached size="1rem" />" e
            introduzca otro URL.
          </li>
          <li>
            Si no desea agregar un PDF presione "<MdDelete size="1rem" />
            ".
          </li>
        </ol>
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
      </div>
    </div>
  );
}
