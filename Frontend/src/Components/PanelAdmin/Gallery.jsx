import React, { useEffect, useState } from "react";
import {
  MdDelete,
  MdEdit,
  MdSearch,
  MdOutlineKeyboardArrowDown,
  MdCached,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import styles from "./Gallery.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearOneGallery,
  deleteGallery,
  galleryFilters,
  getGalleries,
  removeGallery,
} from "../../stateManagement/actions/panelAdmin/gallery.actions";
import useForm from "../../utils/customHooks/useForm";
import { editGalleryForm } from "../../stateManagement/actions/panelAdmin/gallery.actions";
import { getOneGallery } from "../../stateManagement/actions/panelAdmin/gallery.actions";
import ConfirmationWindow from "../Alerts/ConfirmationWindow";
import { confirmationOpen } from "../../stateManagement/actions/alerts/confirmationWindow.actions";

const initialForm = {
  search: "",
  status: "active",
};

export default function Gallery() {
  //variables de estados y formularios
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    [currentPage, setCurrentPage] = useState(1),
    { galleries, idOneGallery, filters } = useSelector(
      (state) => state.gallery
    ),
    { form, changeHandler, resetHandler } = useForm(
      "searchGallery",
      initialForm,
      () => {}
    ),
    { search, status } = form;

  //variables de paginación
  const numberPerPage = 7,
    initialIndex = numberPerPage * (currentPage - 1),
    finalIndex = initialIndex + numberPerPage;

  //elementos a mostar en cada paginacion
  const itemsPerPage = galleries.slice(initialIndex, finalIndex);

  // Se ejecuta cuando se monta el componente
  useEffect(() => {
    dispatch(getGalleries());
  }, []);

  // Se ejecuta cuando status cambia
  useEffect(() => {
    dispatch(
      galleryFilters({
        ...filters,
        status,
      })
    );
  }, [status]);

  // Funciones de filtrado
  const orderDateHandler = (event) => {
    event.preventDefault();
    if (filters.order === "latest") {
      dispatch(
        galleryFilters({
          ...filters,
          order: "oldest",
        })
      );
    } else {
      dispatch(
        galleryFilters({
          ...filters,
          order: "latest",
        })
      );
    }
  };
  const orderTitleHandler = (event) => {
    event.preventDefault();
    if (filters.order === "a-z") {
      dispatch(
        galleryFilters({
          ...filters,
          order: "z-a",
        })
      );
    } else {
      dispatch(
        galleryFilters({
          ...filters,
          order: "a-z",
        })
      );
    }
  };
  const categoryHandler = (event) => {
    event.preventDefault();
    if (filters.category === "all") {
      dispatch(
        galleryFilters({
          ...filters,
          category: "Imagen",
        })
      );
    } else if (filters.category === "Imagen") {
      dispatch(
        galleryFilters({
          ...filters,
          category: "Video",
        })
      );
    } else if (filters.category === "Video") {
      dispatch(
        galleryFilters({
          ...filters,
          category: "all",
        })
      );
    }
  };
  const searchHandler = (event) => {
    event.preventDefault();
    dispatch(
      galleryFilters({
        ...filters,
        search,
      })
    );
  };
  const clearHandler = (event) => {
    event.preventDefault();
    dispatch(
      galleryFilters({
        ...filters,
        search: false,
      })
    );
    resetHandler();
  };

  //Función para crear un elemento:
  const createImageHandler = (event) => {
    event.preventDefault();
    dispatch(editGalleryForm(false));
    navigate("/panel-admin/gallery-image-form");
  };
  const createVideoHandler = (event) => {
    event.preventDefault();
    dispatch(editGalleryForm(false));
    navigate("/panel-admin/gallery-video-form");
  };

  //Función para editar un elemento:
  const editImageHandler = (event, id) => {
    event.preventDefault();
    dispatch(getOneGallery(id));
    dispatch(editGalleryForm(true));
    navigate("/panel-admin/gallery-image-form");
  };
  const editVideoHandler = (event, id) => {
    event.preventDefault();
    dispatch(getOneGallery(id));
    dispatch(editGalleryForm(true));
    navigate("/panel-admin/gallery-video-form");
  };

  //Función para desactivar un elemento:
  const removeHandler = (id) => {
    dispatch(removeGallery(id));
    dispatch(clearOneGallery());
  };

  //Funcion para eliminar un elemento:
  const deleteHandler = (id) => {
    dispatch(deleteGallery(id));
    dispatch(clearOneGallery());
  };
  const cancelHandler = () => {
    dispatch(clearOneGallery());
  };

  return (
    <div className={`${styles["container"]}`}>
      <ConfirmationWindow aceptParams={idOneGallery} />
      <form className={`${styles["form"]}`}>
        <div>
          <button className="button yellow-button" onClick={createVideoHandler}>
            Nuevo Vídeo
          </button>
          <button className="button yellow-button" onClick={createImageHandler}>
            Nueva Imagen
          </button>
        </div>
        <div className={`${styles["select-container"]}`}>
          <label htmlFor="status">Mostrar:</label>
          <select
            className={`${styles["select"]}`}
            name="status"
            onChange={changeHandler}
            defaultValue="active"
            id="status"
          >
            <option value="active">Archivos activos</option>
            <option value="inactive">Archivos inactivos</option>
          </select>
        </div>
        <div>
          <input
            className="search-input"
            type="text"
            name="search"
            placeholder="Buscar..."
            autoComplete="off"
            value={search}
            onBlur={changeHandler}
            onChange={changeHandler}
          />
          {search && (
            <button
              className={`${styles["button"]} ${styles["clear-button"]}`}
              onClick={clearHandler}
            >
              <MdCached className="blue-icon" size="1.25rem" />
            </button>
          )}
          <button className={`${styles["button"]}`} onClick={searchHandler}>
            <MdSearch className="blue-icon" size="1.25rem" />
          </button>
        </div>
      </form>
      <table className={`${styles["table"]}`}>
        <thead className={`${styles["thead"]}`}>
          <tr>
            <th>ID</th>
            <th>
              Fecha{" "}
              <button
                className={`${styles["button"]} ${styles["arrow"]}`}
                onClick={orderDateHandler}
              >
                <MdOutlineKeyboardArrowDown
                  className="white-icon"
                  size="1.45rem"
                />
              </button>
            </th>
            <th>
              Título{" "}
              <button
                className={`${styles["button"]} ${styles["arrow"]}`}
                onClick={orderTitleHandler}
              >
                <MdOutlineKeyboardArrowDown
                  className="white-icon"
                  size="1.45rem"
                />
              </button>
            </th>
            <th>
              Formato{" "}
              <button
                className={`${styles["button"]} ${styles["arrow"]}`}
                onClick={categoryHandler}
              >
                <MdOutlineKeyboardArrowDown
                  className="white-icon"
                  size="1.45rem"
                />
              </button>
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className={`${styles["tbody"]}`}>
          {galleries.length > 0 ? (
            <>
              {itemsPerPage.map(
                ({ _id, titleMain, category, createdAt, isDeleted }) => {
                  const date = new Date(createdAt).toLocaleDateString();
                  return (
                    <tr key={`gallery-${_id}`}>
                      <td className={`${styles["id"]}`} title={_id}>
                        {_id}
                      </td>
                      <td className={`${styles["date"]}`} title={date}>
                        {date}
                      </td>
                      <td className={`${styles["title"]}`} title={titleMain}>
                        {titleMain}
                      </td>
                      <td className={`${styles["format"]}`} title={category}>
                        {category}
                      </td>
                      <td className={`${styles["actions"]}`}>
                        <button
                          className={`${styles["button"]} ${styles["button-left"]}`}
                          onClick={(e) =>
                            category === "Video"
                              ? editVideoHandler(e, _id)
                              : editImageHandler(e, _id)
                          }
                        >
                          <MdEdit className="blue-icon" size="1.5rem" />
                        </button>

                        <button
                          className={`${styles["button"]} ${styles["button-right"]}`}
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(getOneGallery(_id));
                            isDeleted
                              ? dispatch(
                                  confirmationOpen({
                                    message:
                                      "¿Seguro que desea eliminar esta publicación? Esta acción es irreversible y estos datos se perderán para siempre.",
                                    acept: deleteHandler,
                                    cancel: cancelHandler,
                                  })
                                )
                              : dispatch(
                                  confirmationOpen({
                                    message:
                                      "¿Desea desactivar esta publicación? Esta acción es reversible.",
                                    acept: removeHandler,
                                    cancel: cancelHandler,
                                  })
                                );
                          }}
                        >
                          <MdDelete className="blue-icon" size="1.5rem" />
                        </button>
                      </td>
                    </tr>
                  );
                }
              )}
            </>
          ) : (
            <tr>
              <td colSpan="5">No se encontró ningún dato.</td>
            </tr>
          )}
        </tbody>
      </table>
      {galleries.length > numberPerPage && (
        <Pagination
          numberOfItems={galleries.length}
          numberPerPage={numberPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
