import { useRef } from "react";
import Styles from "./detailWork.module.css";

export default function WorkDetailComponent({ onlyAWork }) {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className={Styles.containerWork}>
      <div className={Styles.titleWork}>
        <h3>{onlyAWork?.titleMain}</h3>
      </div>

      <div className={Styles.divImageDetail}>
        <Slider {...settings} ref={sliderRef}>
          {onlyAWork?.images?.map((step, index) => (
            <div key={step?.label}>
              <img src={step?.url} alt={step?.label} width='100%' />
              <p>{step?.caption}</p>
            </div>
          ))}
        </Slider>
      </div>

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
