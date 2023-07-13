import { MdDelete } from "react-icons/md";
import styles from "./ViewVideo.module.css";

export default function ViewVideo({ video, setVideo }) {
  const deleteHandler = (event) => {
    event.preventDefault();
    setVideo({ url: "", platform: "" });
  };
  return (
    <div className={`${styles["container"]}`}>
      {video.url && video.platform === "YouTube" && (
        <div className={`${styles["video-container"]}`}>
          <iframe className={`${styles["video"]}`} src={video.url} />
          <button className={`${styles["delete-btn"]}`} onClick={deleteHandler}>
            <MdDelete className="blue-icon" size="3rem" />
          </button>
        </div>
      )}
      {video.url && video.platform === "Other" && (
        <div className={`${styles["video-container"]}`}>
          <video className={`${styles["video"]}`} controls>
            <source src={video.url} type="video/mp4" />
            Tu navegador no admite la etiqueta de video.
          </video>
          <button className={`${styles["delete-btn"]}`} onClick={deleteHandler}>
            <MdDelete className="blue-icon" size="3rem" />
          </button>
        </div>
      )}
    </div>
  );
}
