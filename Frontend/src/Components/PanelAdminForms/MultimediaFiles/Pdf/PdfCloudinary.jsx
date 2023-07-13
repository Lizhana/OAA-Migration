import { MdDelete, MdCheckCircle, MdCached } from "react-icons/md";
import { useState } from "react";
import styles from "./PdfCloudinary.module.css";

export default function PdfCloudinary({
  open,
  setOpen,
  pdf,
  setPdf,
  setError,
}) {
  const [form, setForm] = useState({ url: "", label: "", type: "PDF" });
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
        body.append("upload_preset", "filesPDF");
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_NAME
          }/upload`,
          {
            method: "POST",
            body,
          }
        );
        const pdf_url = await res.json();
        setPdf([...pdf, { url: pdf_url.secure_url, label, type }]);
        setForm({ url: "", label: "", type: "PDF" });
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
    setForm({ url: "", label: "", type: "PDF" });
    setFile(null);
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
          <li>Seleccione el archivo .pdf que desea subir.</li>
          <li>
            <p>
              Si está conforme con la vista previa presione el "
              <MdCheckCircle size="1rem" />
              ". En caso contrario, seleccione otro archivo.
            </p>
            <p>
              <i>Nota: El archivo puedo demorar varios minutos en cargar.</i>
            </p>
          </li>
          <li>
            Si no desea agregar un PDF presione "<MdDelete size="1rem" />
            ".
          </li>
        </ol>
        <div>
          <div className={`${styles["buttons-container"]}`}>
            <label htmlFor="label">Título</label>
            {loader && <p>Cargando...</p>}
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
          <label htmlFor="pdf">Archivo .PDF</label>
          <input
            className="file-input"
            id="pdf"
            type="file"
            name="pdf"
            onChange={changeUrlHandler}
            accept=".pdf"
          />
          {errors.update && <p className="error">{errors.update}</p>}
        </div>
      </div>
    </div>
  );
}
