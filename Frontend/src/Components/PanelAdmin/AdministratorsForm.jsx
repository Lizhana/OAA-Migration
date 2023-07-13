import React, { useEffect } from "react";
import styles from "./AdministratorsForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../utils/customHooks/useForm";
import validationsNewAdmin from "../../utils/helpers/validationsNewAdmin";
import {
  clearOneAdministrator,
  createAdministrator,
  editAdministrator,
} from "../../stateManagement/actions/panelAdmin/administrators.actions";

const initialForm = {
  name: "",
  email: "",
};

export default function AdministratorsForm({ edit, setEdit }) {
  const dispatch = useDispatch(),
    { oneAdministrator, idOneAdministrator } = useSelector(
      (state) => state.administrators
    ),
    { form, errors, setForm, changeHandler, validationsHandler, resetHandler } =
      useForm("AdministratorsForm", initialForm, validationsNewAdmin),
    { name, email } = form;

  useEffect(() => {
    edit &&
      oneAdministrator &&
      setForm({
        id: oneAdministrator.id,
        name: oneAdministrator.name,
        email: oneAdministrator.email,
      });
  }, [edit, oneAdministrator]);

  const createHandler = () => {
    if (Object.keys(errors).length === 0) {
      dispatch(createAdministrator({ name, email }));
      resetHandler();
    }
  };
  const editHandler = () => {
    if (Object.keys(errors).length === 0) {
      dispatch(editAdministrator(idOneAdministrator, form));
      dispatch(clearOneAdministrator());
      setEdit(false);
      resetHandler();
    }
  };

  return (
    <form className={`${styles["form"]}`}>
      <input
        className="text-input"
        type="text"
        name="name"
        onBlur={changeHandler}
        onChange={changeHandler}
        value={name}
        required
        placeholder="Nombre completo"
        autoComplete="off"
      />
      {errors.name && <p className="error">{errors.name}</p>}
      <input
        className="text-input"
        type="email"
        name="email"
        onBlur={changeHandler}
        onChange={changeHandler}
        value={email}
        required
        placeholder="Correo electrónico"
        autoComplete="off"
      />
      {errors.email && <p className="error">{errors.email}</p>}
      <button
        className={`button yellow-button ${styles["button"]}`}
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          validationsHandler();
          edit ? editHandler() : createHandler();
        }}
      >
        {edit ? "Editar Administrador" : "Agregar nuevo administrador"}
      </button>
    </form>
  );
}
