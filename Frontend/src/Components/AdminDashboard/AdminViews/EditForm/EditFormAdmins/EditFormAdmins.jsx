import { useEffect, useState } from "react";
import style from "./EditFormAdmins.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearNewDetail, createNew, editNew } from "../../../../../stateManagement/actions/panelAdmin/news.actions";
import { clearOneAdministrator, editAdministrator } from "../../../../../stateManagement/actions/panelAdmin/administrators.actions";

function EditFormAdmins() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { oneAdministrator } = useSelector((state) => state.administrators);

  const [input, setInput] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
  });

  const [emailError, setEmailError] = useState(false); // Nuevo estado para el error del email

  const fieldsToValidate = [
    "name",
    "email"
  ];

  // Función para manejar los cambios en el campo de correo electrónico
  const handleEmailChange = (event) => {
    const { id, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [id]: value,
    }));

    // Validación del formato de correo electrónico usando una expresión regular
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailPattern.test(value);

    setEmailError(!isValidEmail); // Establecer el estado de error en caso de un correo inválido
  };

  // Función para manejar los cambios en los campos de entrada
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [id]: value,
    }));

    const newErrors = { ...errors };
    newErrors[id] = value.trim() === "";
    setErrors(newErrors);
  };

  // Función para validar todos los campos
  const handleValidation = () => {
    const newErrors = {};
    fieldsToValidate.forEach((fieldName) => {
      newErrors[fieldName] = input[fieldName].trim() === "";
    });
    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleValidation() && !emailError) {
      if(oneAdministrator) {
        dispatch(editAdministrator(oneAdministrator?.id, input));
        dispatch(clearOneAdministrator());
        navigate(-1)
      }
    } else {
      console.log("Formulario inválido, corrige los errores.");
    }
  };
  
  // Volver
  const handleGoBack = () => {
    dispatch(clearOneAdministrator());
    navigate(-1);
  }

  useEffect(() => {
    if(oneAdministrator) {
      setInput({
        ...oneAdministrator
      });
      setEmailError(false); // Restablecer el estado de error de correo electrónico al cargar los datos
    }
  }, [oneAdministrator])

  return (
    <div className={style.BGContainer}>
      {oneAdministrator ? (
        <>
          <h1>Editar Administradores</h1>
          <div className={style.MainContainer}>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Nombre<span>*</span></label>
                <input
                  id="name"
                  value={input.name}
                  onChange={handleInputChange}
                  className={errors.name ? style.errorInput : ""}
                />
                {errors.name && (
                  <p className="error">Este campo es obligatorio</p>
                )}
              </div>

              <div>
                <label htmlFor="email">Email<span>*</span></label>
                <input
                  id="email"
                  value={input.email}
                  onChange={handleEmailChange} // Cambiar a la función de validación del correo electrónico
                  className={emailError ? style.errorInput : ""} // Aplicar estilo de error si es necesario
                />
                {emailError && (
                  <p className="error">Ingresa un correo electrónico válido</p>
                )}
              </div>

              <div className={style.ButtonContainer}>
                <button onClick={handleGoBack} type="button">Volver</button>
                <button type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </>
      ): <h1>Cargando</h1>}
    </div>
  );
}

export default EditFormAdmins;
