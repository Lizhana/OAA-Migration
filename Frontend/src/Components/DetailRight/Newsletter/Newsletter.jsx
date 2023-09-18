import { useState } from 'react';
import styles from './Newsletter.module.css';
import { useDispatch } from "react-redux";
import { addUserToNewsletter } from "../../../stateManagement/actions/newsDetailActions/newsDetailActions";
import { validateNewsletter } from "../../../utils/helpers/validationNewsletter";

const DetailNewsletter = () => {
  const dispatch = useDispatch();
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.generalNewsletter}>
      <h1 className={styles.textNewsletter_title}>Suscríbete a nuestra Newsletter</h1>
      <p className={styles.textNewsletter_subtitle}>Para nosotros es muy importante que hagas parte de nuestra comunidad, por eso te invitamos a que te suscribas a nuestra Newsletter, deja tus datos en este formulario para que recibas todas las actualizaciones en tu correo electrónico.</p>
      <form onSubmit={handleSubmit} className={styles.formNewsletter}>
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

        <button type="submit" className={styles.subscribeBtn}>Suscribirse</button>
      </form>
    </div>
  )
}

export default DetailNewsletter