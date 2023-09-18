import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import Styles from "./DetailNews.module.css";
import SwipeableTextMobileStepper from "./ImagesWork";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";
import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { SiGmail } from "react-icons/si";

export default function DetailNew({ newDetail }) {
  const shareUrl = window.location.href;
  const { quill, quillRef } = useQuill({
    readOnly: true,
    modules: { toolbar: false },
  });

  useEffect(() => {
    try {
      const parsedDescription = JSON.parse(newDetail?.description);
      quill && quill.setContents(parsedDescription);
    } catch (error) {
      {
        error;
      }
    }
  }, [newDetail]);

  return (
    <div className={Styles["detail"]}>
      <h1 className={Styles["detail-title"]}>{newDetail.titleMain}</h1>
      <span className={Styles["detail-introduction"]} >{newDetail.introduction}</span>
      <div className={Styles["detail-info"]}>
        <span className={Styles["detail-info_category"]} >{newDetail.category}</span>
        <p className={Styles["detail-info_date"]}> 
          {newDetail.date}
          <a href={newDetail.urlAuthor ? newDetail.urlAuthor : ""} >
            <span className={Styles["detail-info_author"]}>Por: {newDetail.author}</span>
          </a>
        </p>
      </div>
      <div className={Styles.divImageDetail}>
        <SwipeableTextMobileStepper
          newDetail={newDetail ? newDetail : "cargando..."}
        />

        <div className={Styles.containerIcons} >
          {/* Compartir en Facebook */}
          <FacebookShareButton url={shareUrl} >
            <BsFacebook className={Styles.bsFacebook} />
          </FacebookShareButton>

          {/* Compartir en Twitter */}
          <TwitterShareButton url={shareUrl}>
            <AiFillTwitterCircle className={Styles.aiFillTwitterCircle} />
          </TwitterShareButton>

          {/* Compartir en WhatsApp */}
          <WhatsappShareButton url={shareUrl}>
            <IoLogoWhatsapp className={Styles.ioLogoWhatsapp} />
          </WhatsappShareButton>

          {/* Compartir por correo electrónico */}
          <EmailShareButton url={shareUrl}>
            <SiGmail className={Styles.siGmail} />
          </EmailShareButton>
        </div>
        <div>
          <p>{newDetail.location ? newDetail.location : ""}</p>
        </div>
      </div>
      {newDetail?.description && newDetail.description.charAt(0) === "{" ? (
        <article ref={quillRef}></article>
      ) : (
        <p className={Styles["p-content"]}>{newDetail?.description}</p>
      )}
      <div>
        {newDetail.multimedia
          ? newDetail.multimedia.map((deta) => (
            <div key={deta.label}>
              <label>{deta.label}</label> <a href={deta.url}>Visita aquí</a>
            </div>
          ))
          : ""}
      </div>
      {newDetail.labels ? (
        <p className={Styles["labels-container"]}>
          {" "}
          TEMAS: {Object.values(newDetail?.labels).join(", ").toUpperCase()}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
