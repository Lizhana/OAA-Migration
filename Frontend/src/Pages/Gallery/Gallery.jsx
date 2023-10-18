import React, { useEffect, useState } from 'react';
import style from './Gallery.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getGalleries } from '../../stateManagement/actions/panelAdmin/gallery.actions';
import twitter_logo from "../../assets/social-media/twitter.svg";
import facebook_logo from "../../assets/social-media/facebook.svg";
import pinterest_logo from "../../assets/social-media/pinterest.svg";
import linkedin_logo from "../../assets/social-media/linkedin.svg";
import whatsapp_logo from "../../assets/social-media/whatsapp.svg";
import telegram_logo from "../../assets/social-media/telegram.svg";
import arrowWhite from "../../assets/arrow-white.png";

export default function Gallery() {
  const dispatch = useDispatch();
  const gallery = useSelector((state) => state.gallery.allGalleries);
  const [index, setIndex] = useState(0);
  console.log(gallery[0]);

  const handleNext = () => {
    setIndex(index === gallery.length - 1 ? 0 : index + 1);
  }

  const handlePrev = () => {
    setIndex(index === 0 ? gallery.length - 1 : index - 1);
  }

  useEffect(() => {
    dispatch(getGalleries());
  }, []);


  if (!gallery.length) return <p>No hay recursos para mostrar</p>

  return (
    <div className={style.Carousel}>
      <button type="button" onClick={handlePrev}>
        <img src={arrowWhite} alt="Button Next" className={style.NextArrow} />
      </button>

      {gallery.map((item, i) => (
        <div
          key={item.id}
          className={i === index ? `${style.Slide} ${style.Active}` : style.Slide}
        >
          <div className={style.SlideTop}>
            <h1>{item.titleMain}</h1>
            <p>{item.date}</p>
          </div>
          {item.category === 'imagen' ? (
            <img className={style.ImageSlide} src={item.resource} alt={item.titleMain} />
          ) : (
            <video controls>
              <source src={item.resource} type="video/mp4" />
              Tu navegador no admite la reproducción de video.
            </video>
          )}
          <div className={style.SlideBottom}>
            <p>{item.description}</p>
          </div>
        </div>
      ))}

      {/* <div className={style.SocialMediaContainer}>
          <img src={facebook_logo} alt="" />
          <img src={twitter_logo} alt="" />
          <img src={whatsapp_logo} alt="" />
          <img src={linkedin_logo} alt="" />
          <img src={pinterest_logo} alt="" />
          <img src={telegram_logo} alt="" />
        </div>
        <p>{item.description}</p> */}
      <button type="button" onClick={handleNext}>
        <img src={arrowWhite} alt="Button Prev" className={style.PrevArrow} />
      </button>
    </div>
  );
}
