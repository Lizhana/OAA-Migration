import { useState, useEffect } from 'react';
import styles from './Newsletter.module.css';
import { useDispatch, useSelector } from "react-redux";
import { addUserToNewsletter } from "../../../stateManagement/actions/newsDetailActions/newsDetailActions";
import { validateNewsletter } from "../../../utils/helpers/validationNewsletter";
import { getCountSubscription } from '../../../stateManagement/actions/panelAdmin/subscriptions.actions';

const Newsletter = () => {
  const dispatch = useDispatch();
  const { countSubscriptions } = useSelector(state => state.subscriptions);
  const [activeModal, setActiveModal] = useState(false);
  const [subscriber, setSubscriber] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({ name: "", email: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSubscriber({
      ...subscriber,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateNewsletter(subscriber);
    setErrors(validationErrors);
    try {
      if (Object.keys(validationErrors).length === 0) {
        dispatch(addUserToNewsletter(subscriber));
        setSubscriber({ name: "", email: "" });
        setActiveModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getCountSubscription());
    const showModal = window.sessionStorage.getItem("showModal");
    if (!showModal) {
      const timer = setTimeout(() => {
        setActiveModal(true);
        window.sessionStorage.setItem("showModal", "true");
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <div className={styles.fondoModalNewsletter} style={{ display: activeModal ? "flex" : "none" }}>
      </div>

      <div className={styles.modalNewsletter} style={{ display: activeModal ? "flex" : "none" }}>
        <button className={styles.closeBtn} onClick={() => setActiveModal(false)} type="button">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M18 6l-12 12"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
        <h1 className={styles.textNewsletter_title}>Suscríbete a nuestra Newsletter</h1>
        <p className={styles.textNewsletter_subtitle}>Para nosotros es muy importante que hagas parte de nuestra comunidad, por eso te invitamos a que te suscribas a nuestra Newsletter, deja tus datos en este formulario para que recibas todas las actualizaciones en tu correo electrónico.</p>
        <form onSubmit={handleSubmit} className={styles.formNewsletter} style={{ display: activeModal ? "block" : "none" }}>
          <div className={styles.containerNewsletter}>
            <input
              type="text"
              id="name"
              name="name"
              value={subscriber.name}
              placeholder="Nombre Completo"
              onChange={handleChange}
              className={styles.inputInscription}
            />
            {errors.name && <p className={styles.errorText}>{errors.name}</p>}
          </div>

          <div className={styles.containerNewsletter}>
            <input
              type="email"
              id="email"
              name="email"
              value={subscriber.email}
              placeholder="Correo Electrónico"
              onChange={handleChange}
              className={styles.inputInscription}
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>

          <div className={styles.subscribeSection}>
            <button type="submit" className={styles.subscribeBtn}>Suscribirse</button>
            <p className={styles.subscribeCount}>Hay <span className={styles.subscribeNumber}>{countSubscriptions}</span> suscriptores</p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Newsletter