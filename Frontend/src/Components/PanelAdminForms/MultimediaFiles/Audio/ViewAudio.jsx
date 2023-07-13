import { MdDelete } from "react-icons/md";
import styles from "./ViewAudio.module.css";

export default function ViewAudio({ audio, setAudio }) {
  const deleteHandler = (event, deleted) => {
    event.preventDefault();
    const deletedAudio = audio.filter((a) => a.url !== deleted);
    setAudio([...deletedAudio]);
  };
  return (
    <div className={`${styles["container"]}`}>
      {audio.map((a, index) => (
        <div key={`audio-${index}`}>
          {a.label ? (
            <p>
              <span>Título del audio:</span> {a.label}
            </p>
          ) : (
            <p>
              <span>Audio sin título</span>
            </p>
          )}
          <div className={`${styles["audio-container"]}`}>
            <audio className={`${styles["audio"]}`} src={a.url} controls />
            <button
              className={`${styles["delete-btn"]}`}
              onClick={(e) => deleteHandler(e, a.url)}
            >
              <MdDelete className="blue-icon" size="2rem" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
