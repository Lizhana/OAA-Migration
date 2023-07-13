import React, { useState, useEffect  } from 'react';
import Newsletter from '../Newsletter/Newsletter';
import { Link } from 'react-router-dom';
import Justicia from '../../../assets/Justicia.png';
import Team from '../../../assets/Team.png';
import News from '../../../assets/News.png';
import styles from './PresentationIcons.module.css';


export default function PresentationIcons () {
  const [showModal, setShowModal] = useState(false);
  const [bodyClass, setBodyClass] = useState('');

  const openModal = () => {
    setShowModal(true);
    setBodyClass('modal-open');
  };

  const closeModal = () => {
    setShowModal(false);
    setBodyClass('');
  };

  const handleWheel = (e) => {
    if (showModal) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    document.body.addEventListener('wheel', handleWheel, {
      passive: false,
    });
    return () => {
      document.body.removeEventListener('wheel', handleWheel);
    };
  }, [showModal]);

  return (
    <div className={styles.presentationIcons}>
      <div className={styles.container}>
        <div className={styles.containerlinks}>
          <div className={styles.containerIcons}>
            <Link to={'/activeCases'} target="_blank" rel="noreferrer">
              <img src={Justicia} alt="Justicia" className={styles.image}/>
            </Link>
          </div>
          <h3>Casos activos</h3>
        </div>

        <div className={styles.containerlinks}>
          <div className={styles.containerIcons}>
            <Link to={'/honorific'} target="_blank" rel="noreferrer">
              <img src={Team} alt="Team" className={styles.image}/>
            </Link>
          </div>
            <h3>Equipo</h3>
        </div>

        <div className={styles.containerlinks}>
          <div className={styles.containerIcons}>
            <Link to={'/newsletter'} target="_blank" rel="noreferrer">
            <img src={News} alt="News" className={styles.imageNews}/>
            </Link>
          </div>
            <h3>Equipo</h3>
        </div>
        {/* <div>
          <div className={styles.modal}>
            <button className={styles.modalButton} onClick={openModal}><img src={News} alt="News" className={styles.imageNews}/></button>
            {showModal ? (
                <Newsletter closeModal={closeModal} />
            ) : null}
          </div>
            <div className={bodyClass}><h3 className={styles.subscribe}>Suscríbete</h3></div>
        </div> */}

      </div>
    </div>
  );
};