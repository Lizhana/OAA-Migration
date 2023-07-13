import React, { useState } from 'react';
import styles from './Newsletter.module.css';
import Logo from '../Footer/Logo/Logo';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import axios from 'axios';


function validate (input) {
  let errors = {};
  if(!input.name){
      errors.name = "El nombre es requerido.";
  } else if(/[.!@#$%^&*()_+-=]/.test(input.name)){
      errors.name = "Tu nombre no puede tener números o caracteres especiales";
  }
  if(!input.email) {
      errors.email = "El email  es requerido.";
  } else if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input.email)) {
      errors.email = "Tu email debe ser válido";
  }
  return errors;
};

export default function Modal ({ closeModal }) {
  const [ errors, setErrors ] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);

  const [ input, setInput ] = useState({
      name: '',
      email: '',
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const { email } = input;
    try {
      const searchResult = await axios.get(`http://localhost:3001/subscribers/members/1b8c4df414/${email}`);
      setInput({ name: '', email: ''});
      setFormError(true);
      setTimeout(() => {
        setFormError(false);
      },5000);
  
    } catch (error) {
      if (error instanceof Error && error.response.status === 404) {
        try {
          const response = await axios.post(`http://localhost:3001/subscribers/members/1b8c4df414`, input);
          setInput({ name: '', email: ''});
          setFormSubmitted(true);  
          setTimeout(() => {
            setFormSubmitted(false);
          }, 5000);
        } catch (error) {
          setFormError("Ha ocurrido un error al intentar buscar el suscriptor");
        }
      } else {
        setFormError("Ha ocurrido un error al intentar buscar el suscriptor");
      }
    }
  }

  return (
    <div className={styles.modal} >
      <section>
        <div>
          <div className={styles.modalContent}>
            <div className={styles.logo__container}>
              <Logo />
            </div>
            <h1 className={styles.title}>Suscríbete a nuestra Newsletter</h1>
            <p className={styles.text}>Para nosotros es muy importante que hagas parte de nuestra comunidad, por eso te invitamos a que te suscribas a nuestra Newsletter, deja tus datos en este formulario para que recibas todas las actualizaciones en tu correo electrónico.</p>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <div className={styles.form}>
              <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" name='name' value={ input.name } placeholder='Nombre y Apellidos' onChange={(e) => handleChange(e)} />
                {errors.name && <p className={styles.danger}>{ errors.name }</p>}

                <input type="email" name='email' value={ input.email } placeholder='Email' onChange={(e) => handleChange(e)} />
                {errors.email && <p className={styles.danger}>{ errors.email }</p>}

                {formError ? <p className={styles.danger}>Ya existe un suscriptor con este correo electrónico</p> : null}

                {
                    !errors.name && input.name.length > 0 &&
                    !errors.email && input.email.length > 0 ?
                    <button className={styles.siteBtn} type="submit">SEND MESSAGE</button> : <button className={styles.siteBtnDesaprobated} type="submit" disabled>SEND MESSAGE</button>
                }
              </form>

              <div className={styles.messageSubmitted}>
                  {formSubmitted && <p>Gracias por suscribirte</p>}
              </div>

              <div className={styles.contact}>
                <h3>Puedes contactarnos aquí</h3>
                <p><BsFillTelephoneFill className={styles.footer__iconContact} />+54 11 5959-5883</p>
                <p><FaMapMarkerAlt className={styles.footer__iconContact} />BUENOS AIRES (ARGENTINA)</p>
                <p><MdEmail className={styles.footer__iconContact} />ambientalistas.autoconvocados@gmail.com</p>
              </div>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};