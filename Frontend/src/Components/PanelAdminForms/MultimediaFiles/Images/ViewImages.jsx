import { MdDelete } from "react-icons/md";
import styles from "./ViewImages.module.css";

export default function ViewImages({ images, setImages }) {
  const deleteHandler = (event, deleted) => {
    event.preventDefault();
    const deletedImage = images.filter((img) => img.url !== deleted);
    setImages([...deletedImage]);
  };
  return (
    <div className={`${styles["container"]}`}>
      {images.map((img, index) => (
        <div key={`image-${index}`}>
          <div className={`${styles["image-container"]}`}>
            {img.url && <img className={`${styles["image"]}`} src={img.url} />}
            {img.caption && (
              <p className={`${styles["caption"]}`}>{img.caption}</p>
            )}
            <button
              className={`${styles["delete-btn"]}`}
              onClick={(e) => deleteHandler(e, img.url)}
            >
              <MdDelete className="blue-icon" size="2rem" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
