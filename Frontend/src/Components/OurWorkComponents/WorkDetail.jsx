import React from "react";
import SwipeableTextMobileStepper from "../DetailNew/ImagesWork";
import Styles from "./detailWork.module.css";

export default function WorkDetailComponent({ onlyAWork }) {
  return (
    <div className={Styles.containerWork}>
      <div className={Styles.titleWork}>
        <h3>{onlyAWork?.titleMain}</h3>
      </div>

      <SwipeableTextMobileStepper newDetail={onlyAWork} />
      <div></div>
      <div className={Styles.contentWork}>
        {onlyAWork?.content && onlyAWork?.content.charAt(0) === "{" ? (
          <article ref={quillRef} className={Styles.textT}></article>
        ) : (
          <p className={Styles.textT}>{onlyAWork?.content}</p>
        )}
      </div>
      {onlyAWork?.multimedia && (
        <div>
          <h4>Publicaciones y mas información relacionada...</h4>
        </div>
      )}
      <div className={Styles.multimediaWork}>
        {onlyAWork?.multimedia
          ? onlyAWork.multimedia.map((work) => (
              <div key={work?.url} className={Styles.typeWork}>
                {work?.type === "PDF" ? (
                  <a href={work?.url} target="_blank" className={Styles.typeWorkh6} >
                    <h6 className={Styles.typeWorkh6} >{work?.label}</h6>
                  </a>
                ) : work?.type === "Audio" ? (
                  <audio controls>
                    <source src={work?.url} type="audio/mpeg" />
                  </audio>
                ) : null}
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
