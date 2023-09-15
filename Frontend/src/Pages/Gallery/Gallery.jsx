import React, { useEffect, useState } from 'react';
import style from './Gallery.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getGalleries } from '../../stateManagement/actions/panelAdmin/gallery.actions';
import twitter_logo from "../../assets/social-media/twitter.svg";
import facebook_logo from "../../assets/social-media/facebook.svg";
import pinterest_logo from "../../assets/social-media/pinterest.svg";
import linkedin_logo from  "../../assets/social-media/linkedin.svg";
import whatsapp_logo from  "../../assets/social-media/whatsapp.svg";
import telegram_logo from  "../../assets/social-media/telegram.svg";
import arrowWhite from "../../assets/arrow-white.png";

export default function Gallery() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.gallery.allGalleries);
  const [index, setIndex] = useState(0);
  const [ labels, setLabels ] = useState([]);

  const handleClick = (event) => {
    const name = event.target.name;

    if (name === "next") {
      const newIndex = index + 1;
      setIndex(newIndex > data.length - 1 ? 0 : newIndex);
    } else {
      const newIndex = index - 1;
      setIndex(newIndex < 0 ? data.length - 1 : newIndex);
    }
  };

  useEffect(() => {
    dispatch(getGalleries());
  }, []);

  useEffect(()=> {
    if (data.length > 0){
      setLabels(Object.keys(data[index].labels));
    }
  }, [data]);

  return (
    <div className={style.Carousel}>
      <ul>
        <button className={style.Next} name="next" onClick={handleClick}>
          <img src={arrowWhite} alt="" className={style.NextArrow}/>
        </button>
        <button className={style.Prev} name="prev" onClick={handleClick}>
          <img src={arrowWhite} alt="" className={style.PrevArrow}/>

        </button>

        {data.length > 0 ? (
          data.map((item, i) => (
            <li
              key={item.id}
              className={`${style.Slide} ${i === index ? style.Active : ''}`}
            >
              <h1>{item.titleMain}</h1>
              <h3>{item.date}</h3>
             {item.category === 'imagen' ? (
  <img src={item.resource} alt={item.titleMain} />
) : (
  <video controls>
    <source src={item.resource} type="video/mp4" />
    Tu navegador no admite la reproducción de video.
  </video>
)}
 
              <div className={style.SocialMediaContainer}>
                <img src={facebook_logo} alt=""/>
                <img src={twitter_logo} alt=""/>
                <img src={whatsapp_logo} alt=""/>
                <img src={linkedin_logo} alt=""/>
                <img src={pinterest_logo} alt=""/>
                <img src={telegram_logo} alt=""/>
              </div>
              <p>{item.description}</p>
              <div className={style.LabelsContainer}>
                <span>Temas relacionados:</span>
                {labels.map((element, index) => (
                  <span key={index}>{`${element}${index < labels.length - 1 ? ', ' : ''}`}</span>
                ))}            
              </div>
            </li>
          ))
        ) : (
            <li>No hay recursos para mostrar</li>
          )}
      </ul>

    </div>
  );
}
