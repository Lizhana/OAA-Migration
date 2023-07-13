import { MdDelete } from "react-icons/md";
import styles from "./ViewPdf.module.css";

export default function ViewPdf({ pdf, setPdf }) {
  const deleteHandler = (event, deleted) => {
    event.preventDefault();
    const deletedPDF = pdf.filter((file) => file.url !== deleted);
    setPdf([...deletedPDF]);
  };
  return (
    <div className={`${styles["container"]}`}>
      {pdf.map(({ url, label }, index) => (
        <div key={`pdf-${index}`} className={`${styles["pdf-container"]}`}>
          {url && <iframe className={`${styles["pdf"]}`} src={url} />}
          {label && <p className={`${styles["label"]}`}>{label}</p>}
          <button
            className={`${styles["delete-btn"]}`}
            onClick={(e) => deleteHandler(e, url)}
          >
            <MdDelete className="blue-icon" size="2rem" />
          </button>
        </div>
      ))}
    </div>
  );
}
