import { useState } from "react";
import { MdDelete, MdCheckCircle, MdCached } from "react-icons/md";
import { validationsUrl } from "../../../../utils/helpers/validationsUrl";
import styles from "./VideoUrl.module.css";

export default function VideoUrl({ open, setOpen, setVideo, setError }) {
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState({ url: "", platform: "" });
  const [errors, setErrors] = useState("");

  const changeHandler = (event) => {
    event.preventDefault();
    setUrl(event.target.value);
    setErrors(validationsUrl(url));
    if (url.includes("https://www.youtube.com/watch?v=")) {
      const youtube = url.replace(
        "https://www.youtube.com/watch?v=",
        "https://www.youtube.com/embed/"
      );
      setVideoUrl({ url: youtube, platform: "YouTube" });
    } else {
      setVideoUrl({ url, platform: "Other" });
    }
  };

  const clearHandler = (event) => {
    event.preventDefault();
    setErrors({});
    setUrl("");
  };

  const checkHandler = (event) => {
    event.preventDefault();
    setError({});
    setErrors(validationsUrl(url));
    if (Object.keys(errors).length === 0) {
      setVideo(videoUrl);
      setUrl("");
      setOpen(false);
    }
  };

  const deleteHandler = (event) => {
    event.preventDefault();
    setUrl("");
    setErrors({});
    setOpen(false);
  };
  return (
    <div className={`${!open && "invisible"} ${styles["container"]}`}>
      <div className={`${styles["video-container"]}`}>
        {!url && <div></div>}
        {url && videoUrl.platform === "YouTube" && (
          <iframe className={`${styles["video"]}`} src={videoUrl.url} />
        )}
        {url && videoUrl.platform === "Other" && (
          <video className={`${styles["video"]}`} controls>
            <source src={videoUrl.url} type="video/mp4" />
            Tu navegador no admite la etiqueta de video.
          </video>
        )}
      </div>
      <div className={`${styles["form-container"]}`}>
        <ol>
          <li>Introduzca el URL del video.</li>
          <li>
            Si está conforme con la vista previa presione el "
            <MdCheckCircle size="1rem" />
            ". En caso contrario, presione "<MdCached size="1rem" />" e
            introduzca otro URL.
          </li>
          <li>
            Si no desea agregar un video presione "<MdDelete size="1rem" />
            ".
          </li>
        </ol>
        <div>
          <div className={`${styles["buttons-container"]}`}>
            <label htmlFor="url">URL</label>
            {url && (
              <button onClick={clearHandler}>
                <MdCached className="blue-icon" size="1.5rem" />
              </button>
            )}

            <button onClick={checkHandler}>
              <MdCheckCircle className="blue-icon" size="1.5rem" />
            </button>
            <button onClick={deleteHandler}>
              <MdDelete className="blue-icon" size="1.5rem" />
            </button>
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
