import React, { useEffect } from "react";
import styles from "./LoginAdmin.module.css";
import logo from "../../assets/logo-temporal.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useForm from "../../utils/customHooks/useForm";
import validationsLogin from "../../utils/helpers/validationsLogin";
import {
  loginAdmin,
  resetPassword,
} from "../../stateManagement/actions/panelAdmin/admin.actions";

const initialForm = {
  email: "",
  password: "",
};

export default function LoginAdmin() {
  const dispatch = useDispatch(),
    navigate = useNavigate(),
    { admin } = useSelector((state) => state.admin),
    { form, errors, changeHandler, validationsHandler } = useForm(
      "LoginAdmin",
      initialForm,
      validationsLogin
    ),
    { email, password } = form;

  useEffect(() => {
    if (!!admin) {
      navigate("/panel-admin");
    }
  }, [admin]);

  const passwordHandler = () => {
    if (!errors.email) {
      dispatch(resetPassword(email));
    }
  };

  const submitHandler = () => {
    if (Object.keys(errors).length === 0) {
      dispatch(loginAdmin(form));
    }
  };

  return (
    <article className={`${styles["container"]}`}>
      <section className={`${styles["login-container"]}`}>
        <img
          className={`${styles["logo"]}`}
          src={logo}
          alt='Logo Organización de Ambientalistas Autoconvocados'
        />
        <form className={`${styles["form"]}`}>
          <label htmlFor='email'>Correo electrónico</label>
          <input
            className='text-input'
            id='email'
            type='email'
            name='email'
            onBlur={changeHandler}
            onChange={changeHandler}
            value={email}
            required
          />
          {errors.email && <p className='error'>{errors.email}</p>}
          <label htmlFor='password'>Contraseña</label>
          <input
            className='text-input'
            id='password'
            type='password'
            name='password'
            onBlur={changeHandler}
            onChange={changeHandler}
            value={password}
            required
          />
          {errors.password && <p className='error'>{errors.password}</p>}
          <button
            className={`${styles["password"]}`}
            onClick={(event) => {
              event.preventDefault();
              validationsHandler();
              passwordHandler();
            }}
          >
            He olvidado mi contraseña
          </button>
          <button
            className='button green-button'
            onClick={(event) => {
              event.preventDefault();
              validationsHandler();
              submitHandler();
            }}
          >
            Iniciar Sesión
          </button>
        </form>
      </section>
    </article>
  );
}
