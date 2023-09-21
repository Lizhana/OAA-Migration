import { useEffect, useState } from "react";
import style from "./EditFormGallery.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearNewDetail, createNew, editNew } from "../../../../../stateManagement/actions/panelAdmin/news.actions";
import ViewImages from "../../../../PanelAdminForms/MultimediaFiles/Images/ViewImages";
import ImageUrl from "../../../../PanelAdminForms/MultimediaFiles/Images/ImageUrl";
import ImageCloudinary from "../../../../PanelAdminForms/MultimediaFiles/Images/ImageCloudinary";
import useSessionStorage from "../../../../../utils/customHooks/useLocalStorage";
import { clearOneGallery, createGallery, editGallery } from "../../../../../stateManagement/actions/panelAdmin/gallery.actions";

function EditFormGallery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { oneGallery, edit } = useSelector((state) => state.gallery);
  const [cloudinaryImageOpen, setCloudinaryImageOpen] = useState(false);
  const [urlImageOpen, setUrlImageOpen] = useState(false);
  const [image, setImage] = useSessionStorage("imageGalleryImage", []);

  const [input, setInput] = useState({
    titleMain: "",
    date: "",
    image: "",
    category: "Novedades",
    author: "",
    urlAuthor: "",
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
    image: false
  });

  const fieldsToValidate = [
    "titleMain",
    "date",
    "category",
    "author",
    "introduction",
    "description",
    "image"
  ];

  // Función para publicar un nuevo elemento:
  const createHandler = () => {
      dispatch(createGallery(input));
      navigate(-1);
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

  const imageCloudinary = (image_url) => {
    setInput((prevInput) => ({
      ...prevInput,
      image: image_url
    })
    )
  }

  // Función para validar todos los campos
  const handleValidation = () => {
    const newErrors = {};
    fieldsToValidate.forEach((fieldName) => {
      newErrors[fieldName] = (input[fieldName] || "").trim() === "";
    });
    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  //Función para abrir el selector de imagen Cloudinary
  const openImageCloudinary = (event) => {
    event.preventDefault();
    setCloudinaryImageOpen(true);
  };

  //Función para abrir el selector de imagen URL
  const openImageUrl = (event) => {
    event.preventDefault();
    setUrlImageOpen(true);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();

    if (handleValidation()) {
      if(edit && oneGallery) {
        dispatch(editGallery(oneGallery?.id, input));
        dispatch(clearOneGallery());
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
    if(oneGallery && edit) {
      setInput({
        ...oneGallery
      })
    }

  }, [edit, oneGallery])

  return (
    <div className={style.BGContainer}>
      {oneGallery ? (
        <>
          <h1>{edit && oneGallery ? "Editar Archivos" : "Crear Archivos"}</h1>
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

              <label>Imagenes <span>*</span></label>
              <ViewImages images={image} setImages={setImage} />
              <ImageCloudinary
                open={cloudinaryImageOpen}
                setOpen={setCloudinaryImageOpen}
                image={image}
                setImage={setImage}
                imageCloudinary={imageCloudinary}
              />
              <ImageUrl
                open={urlImageOpen}
                setOpen={setUrlImageOpen}
                image={image}
                setImage={setImage}
                setError={setErrors}
              />
              <div className="button-container">
                <button type="button" className="button yellow-button" onClick={openImageCloudinary}>
                  Añadir archivo multimedia
                </button>
                <button type="button" className="button yellow-button" onClick={openImageUrl}>
                  Añadir URL de multimedia
                </button>
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
                  <option value="imagen">Imagen</option>
                  <option value="video">Video</option>
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

export default EditFormGallery;
