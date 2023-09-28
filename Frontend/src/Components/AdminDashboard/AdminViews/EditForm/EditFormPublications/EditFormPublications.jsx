import { useEffect, useState } from "react";
import style from "./EditFormPublications.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearNewDetail, createNew, editNew } from "../../../../../stateManagement/actions/panelAdmin/news.actions";

function EditFormPublications() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newDetail, edit } = useSelector((state) => state.news);

  const [input, setInput] = useState({
    titleMain: "",
    date: "",
    category: "Novedades",
    author: "",
    urlAuthor: "",
    location: "",
    introduction: "",
    description: "",
    label: "",
    labels: []
  });

  const [errors, setErrors] = useState({
    titleMain: false,
    date: false,
    category: false,
    author: false,
    introduction: false,
    description: false,
  });

  const fieldsToValidate = [
    "titleMain",
    "date",
    "category",
    "author",
    "introduction",
    "description",
  ];

  // Función para publicar un nuevo elemento:
  const createHandler = () => {
      dispatch(createNew(input));
      navigate("/panel-admin");
  };

  //Función para remover etiquetas
  const handleRemove = (event) => {
    setInput((prevInput) => ({
      ...prevInput,
      labels: prevInput.labels.filter((label) => label !== event.target.innerText)
    })) 
  }

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

    if (handleValidation()) {
      if(edit && newDetail) {
        dispatch(editNew(newDetail?.id, input));
        dispatch(clearNewDetail());
        navigate(-1)
      }
      if(!edit) {
        dispatch(createHandler());
        navigate(-1)
      }
    } else {
      console.log("Formulario inválido, corrige los errores.");
    }
  };

  // Funcion para agregar etiquetas
  const handleAddLabel = (event) => {
    event.preventDefault();

    if (input.label.trim() !== "") {
      if(!input.labels) {
        setInput((prevInput) => ({
          ...prevInput,
          labels: [prevInput.label],
          label:""
        }))
      } else {
        setInput((prevInput) => ({
          ...prevInput,
          labels: [...prevInput.labels, prevInput.label],
          label: "", 
        }));
      }
    }
  };
  
  //volver
  const handleGoBack = () => {
    dispatch(clearNewDetail());
    navigate(-1);
  }

  useEffect(() => {
    if(newDetail && edit) {
      console.log(newDetail)
      setInput({
        ...newDetail
      })
    }

  }, [edit, newDetail])

  return (
    <div className={style.BGContainer}>
      {newDetail ? (
        <>
          <h1>{edit && newDetail ? "Editar Publicación" : "Crear Publicación"}</h1>
          <div className={style.MainContainer}>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="titleMain">Título<span>*</span></label>
                <input
                  id="titleMain"
                  value={input.titleMain}
                  onChange={handleInputChange}
                  className={errors.titleMain ? style.errorInput : ""}
                />
                {errors.titleMain && (
                  <p className="error">Este campo es obligatorio</p>
                )}
              </div>

              <div>
                <label htmlFor="date">Fecha del acontecimiento<span>*</span></label>
                <input
                  id="date"
                  value={input.date}
                  onChange={handleInputChange}
                  className={errors.date ? style.errorInput : ""}
                />
                {errors.date && (
                  <p className="error">Este campo es obligatorio</p>
                )}
              </div>

              <div>
                <label htmlFor="category">Categoría<span>*</span></label>
                <select
                  id="category"
                  value={input.category}
                  onChange={handleInputChange}
                  className={errors.category ? style.errorInput : ""}
                >
                  <option value="Novedades">Novedades</option>
                  <option value="Comunidades">Comunidades</option>
                  <option value="Agroecología">Agroecología</option>
                </select>
                {errors.category && (
                  <p className="error">Este campo es obligatorio</p>
                )}
              </div>

              <div>
                <label htmlFor="author">Autor<span>*</span></label>
                <input
                  id="author"
                  value={input.author}
                  onChange={handleInputChange}
                  className={errors.author ? style.errorInput : ""}
                />
                {errors.author && (
                  <p className="error">Este campo es obligatorio</p>
                )}
              </div>

              <div>
                <label htmlFor="urlAuthor">URL Autor</label>
                <input
                  id="urlAuthor"
                  value={input.urlAuthor}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="location">Localización</label>
                <input
                  id="location"
                  value={input.location}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="introduction">Introducción<span>*</span></label>
                <textarea
                  id="introduction"
                  value={input.introduction}
                  onChange={handleInputChange}
                  className={errors.introduction ? style.errorInput : ""}
                />
                {errors.introduction && (
                  <p className="error">Este campo es obligatorio</p>
                )}
              </div>

              <div>
                <label htmlFor="description">Descripción <span>*</span></label>
                <textarea
                  id="description"
                  value={input.description}
                  onChange={handleInputChange}
                  className={errors.description ? style.errorInput : ""}
                />
                {errors.description && (
                  <p className="error">Este campo es obligatorio</p>
                )}
              </div>

              <div>
                <label htmlFor="label"> Etiquetas</label>
                <div className={style.LabelsContainer}>
                  {input.labels &&
                    input.labels.map((element,index) => 
                      <button onClick={handleRemove} key={index}>{element}</button>)}
                </div>
                <div className={style.LabelContainer}>
                  <input value={input.label} onChange={handleInputChange} id="label"/>
                  <button type="button" onClick={handleAddLabel}>Agregar</button>
                </div>
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

export default EditFormPublications;
