import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MdDelete,
  MdEdit,
  MdSearch,
  MdOutlineKeyboardArrowDown,
  MdCached,
} from "react-icons/md";
import Pagination from "../Pagination/Pagination";
import useForm from "../../utils/customHooks/useForm";
import ConfirmationWindow from "../Alerts/ConfirmationWindow";
import { confirmationOpen } from "../../stateManagement/actions/alerts/confirmationWindow.actions";

import styles from "./OurWorks.module.css";
import {
  ourWorksFilters,
  getOurWorks,
  editWorkForm,
  getOneWork,
  removeWork,
  clearOneWork,
  deleteWork,
} from "../../stateManagement/actions/panelAdmin/ourWorks.actions";

const initialForm = {
  search: "",
  status: "active",
};

export default function OurWorks() {
  //variables de estados y formularios
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    [currentPage, setCurrentPage] = useState(1),
    { ourWorks, idOneWork, filters } = useSelector((state) => state.ourWorks),
    { form, changeHandler, resetHandler } = useForm(
      "searchOurWorks",
      initialForm,
      () => {}
    ),
    { search, status } = form;

  //variables de paginación
  const numberPerPage = 7,
    initialIndex = numberPerPage * (currentPage - 1),
    finalIndex = initialIndex + numberPerPage;

  //elementos a mostar en cada paginacion
  const itemsPerPage = ourWorks.slice(initialIndex, finalIndex);

  // Se ejecuta cuando se monta el componente
  useEffect(() => {
    dispatch(getOurWorks());
  }, []);

  // Se ejecuta cuando status cambia
  useEffect(() => {
    dispatch(
      ourWorksFilters({
        ...filters,
        status,
      })
    );
  }, [status]);

  // Funciones de filtrado:
  const orderDateHandler = (event) => {
    event.preventDefault();
    if (filters.order === "latest") {
      dispatch(
        ourWorksFilters({
          ...filters,
          order: "oldest",
        })
      );
    } else {
      dispatch(
        ourWorksFilters({
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
        ourWorksFilters({
          ...filters,
          order: "z-a",
        })
      );
    } else {
      dispatch(
        ourWorksFilters({
          ...filters,
          order: "a-z",
        })
      );
    }
  };
  const progressHandler = (event) => {
    event.preventDefault();
    if (filters.progress === "all") {
      dispatch(
        ourWorksFilters({
          ...filters,
          progress: "isFinished",
        })
      );
    } else if (filters.progress === "isFinished") {
      dispatch(
        ourWorksFilters({
          ...filters,
          progress: "inProgress",
        })
      );
    } else if (filters.progress === "inProgress") {
      dispatch(
        ourWorksFilters({
          ...filters,
          progress: "all",
        })
      );
    }
  };
  const searchHandler = (event) => {
    event.preventDefault();
    dispatch(
      ourWorksFilters({
        ...filters,
        search,
      })
    );
  };
  const clearHandler = (event) => {
    event.preventDefault();
    dispatch(
      ourWorksFilters({
        ...filters,
        search: false,
      })
    );
    resetHandler();
  };

  //Función para crear un elemento:
  const createHandler = (event) => {
    event.preventDefault();
    dispatch(editWorkForm(false));
    navigate("/panel-admin/our-works-form");
  };

  //Función para editar un elemento:
  const editHandler = (event, id) => {
    event.preventDefault();
    dispatch(getOneWork(id));
    dispatch(editWorkForm(true));
    navigate("/panel-admin/our-works-form");
  };

  //Función para desactivar un elemento:
  const removeHandler = (id) => {
    dispatch(removeWork(id));
    dispatch(clearOneWork());
  };

  //Funcion para eliminar un elemento:
  const deleteHandler = (id) => {
    dispatch(deleteWork(id));
    dispatch(clearOneWork());
  };
  const cancelHandler = () => {
    dispatch(clearOneWork());
  };

  return (
    <div className={`${styles["container"]}`}>
      <ConfirmationWindow aceptParams={idOneWork} />
      <form className={`${styles["form"]}`}>
        <button className="button yellow-button" onClick={createHandler}>
          Agregar nuevo caso
        </button>
        <div className={`${styles["select-container"]}`}>
          <label htmlFor="status">Mostrar:</label>
          <select
            className={`${styles["select"]}`}
            name="status"
            onChange={changeHandler}
            defaultValue="active"
            id="status"
          >
            <option value="active">Publicaciones activas</option>
            <option value="inactive">Publicaciones inactivas</option>
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
              Estado{" "}
              <button
                className={`${styles["button"]} ${styles["arrow"]}`}
                onClick={progressHandler}
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
          {ourWorks.length > 0 ? (
            <>
              {itemsPerPage.map(
                ({ _id, titleMain, isFinished, createdAt, isDeleted }) => {
                  const date = new Date(createdAt).toLocaleDateString();
                  return (
                    <tr key={`publications-${_id}`}>
                      <td className={`${styles["id"]}`} title={_id}>
                        {_id}
                      </td>
                      <td className={`${styles["date"]}`} title={date}>
                        {date}
                      </td>
                      <td className={`${styles["title"]}`} title={titleMain}>
                        {titleMain}
                      </td>
                      <td
                        className={`${styles["progress"]}`}
                        title={isFinished ? "Finalizado" : "En Desarrollo"}
                      >
                        {isFinished ? "Finalizado" : "En Desarrollo"}
                      </td>
                      <td className={`${styles["actions"]}`}>
                        <button
                          className={`${styles["button"]} ${styles["button-left"]}`}
                          onClick={(e) => editHandler(e, _id)}
                        >
                          <MdEdit className="blue-icon" size="1.5rem" />
                        </button>

                        <button
                          className={`${styles["button"]} ${styles["button-right"]}`}
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(getOneWork(_id));
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
      {ourWorks.length > numberPerPage && (
        <Pagination
          numberOfItems={ourWorks.length}
          numberPerPage={numberPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
