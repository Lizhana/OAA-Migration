import { useState, useEffect } from 'react';
import styles from './Newsletter.module.css';
import { useDispatch } from "react-redux";
import { addUserToNewsletter } from "../../../stateManagement/actions/newsDetailActions/newsDetailActions";
import { validateNewsletter } from "../../../utils/helpers/validationNewsletter";

const Newsletter = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
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
        setActive(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const existsSubscriber = JSON.parse(window.localStorage.getItem("suscriptor"));
    if (existsSubscriber) return;
    const timer = setTimeout(() => {
      setActive(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={styles.fondoModalNewsletter} style={{ display: active ? "flex" : "none" }}>
      </div>

      <div className={styles.modalNewsletter} style={{ display: active ? "flex" : "none" }}>
        <button className={styles.closeBtn} onClick={() => setActive(false)} type="button">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M18 6l-12 12"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
        <h1 className={styles.textNewsletter_title}>Suscríbete a nuestra Newsletter</h1>
        <p className={styles.textNewsletter_subtitle}>Para nosotros es muy importante que hagas parte de nuestra comunidad, por eso te invitamos a que te suscribas a nuestra Newsletter, deja tus datos en este formulario para que recibas todas las actualizaciones en tu correo electrónico.</p>
        <form onSubmit={handleSubmit} className={styles.formNewsletter} style={{ display: active ? "block" : "none" }}>
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
          <button type="submit" className={styles.submitBtn}>Suscribirse</button>
        </form>
      </div>
    </>
  );
}

export default Newsletter