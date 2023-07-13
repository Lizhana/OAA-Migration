import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdDelete,
  MdEdit,
  MdSearch,
  MdOutlineKeyboardArrowDown,
  MdCached,
} from "react-icons/md";
import Pagination from "../Pagination/Pagination";
import styles from "./Publications.module.css";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../utils/customHooks/useForm";
import {
  clearNewDetail,
  deleteNew,
  editNewForm,
  getAllNews,
  getNewDetail,
  newsFilters,
  removeNew,
} from "../../stateManagement/actions/panelAdmin/news.actions";
import { confirmationOpen } from "../../stateManagement/actions/alerts/confirmationWindow.actions";
import ConfirmationWindow from "../Alerts/ConfirmationWindow";

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const today = new Date(),
  lastMonth = new Date(today.getFullYear(), today.getMonth() - 1);

const initialForm = {
  search: "",
  status: "active",
};

export default function Publications() {
  //variables de estados y formularios
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    [currentPage, setCurrentPage] = useState(1),
    { allNews, news, idNewDetail, filters } = useSelector(
      (state) => state.news
    ),
    { form, changeHandler, resetHandler } = useForm(
      "searchPublications",
      initialForm,
      () => {}
    ),
    { search, status } = form;

  //variables de paginación
  const numberPerPage = 7,
    initialIndex = numberPerPage * (currentPage - 1),
    finalIndex = initialIndex + numberPerPage;

  //elementos a mostar en cada paginacion
  const itemsPerPage = news.slice(initialIndex, finalIndex);

  //variables de estadísticas
  const totalPublications = allNews.filter(
    (publication) => !publication.isDeleted
  );
  const currentMonthPublications = allNews.filter((publication) => {
    const createdAt = new Date(publication.createdAt);
    return (
      !publication.isDeleted &&
      createdAt.getMonth() === today.getMonth() &&
      createdAt.getFullYear() === today.getFullYear()
    );
  });
  const lastMonthPublications = allNews.filter((publication) => {
    const createdAt = new Date(publication.createdAt);
    return (
      !publication.isDeleted &&
      createdAt.getMonth() === lastMonth.getMonth() &&
      createdAt.getFullYear() === lastMonth.getFullYear()
    );
  });

  // Se ejecuta cuando se monta el componente
  useEffect(() => {
    dispatch(getAllNews());
  }, []);

  // Se ejecuta cuando status cambia
  useEffect(() => {
    dispatch(
      newsFilters({
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
        newsFilters({
          ...filters,
          order: "oldest",
        })
      );
    } else {
      dispatch(
        newsFilters({
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
        newsFilters({
          ...filters,
          order: "z-a",
        })
      );
    } else {
      dispatch(
        newsFilters({
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
        newsFilters({
          ...filters,
          category: "Novedades",
        })
      );
    } else if (filters.category === "Novedades") {
      dispatch(
        newsFilters({
          ...filters,
          category: "Comunidades",
        })
      );
    } else if (filters.category === "Comunidades") {
      dispatch(
        newsFilters({
          ...filters,
          category: "Agroecología",
        })
      );
    } else if (filters.category === "Agroecología") {
      dispatch(
        newsFilters({
          ...filters,
          category: "all",
        })
      );
    }
  };
  const searchHandler = (event) => {
    event.preventDefault();
    dispatch(
      newsFilters({
        ...filters,
        search,
      })
    );
  };
  const clearHandler = (event) => {
    event.preventDefault();
    dispatch(
      newsFilters({
        ...filters,
        search: false,
      })
    );
    resetHandler();
  };

  //Función para crear un elemento:
  const createHandler = (event) => {
    event.preventDefault();
    dispatch(editNewForm(false));
    navigate("/panel-admin/publications-form");
  };

  //Función para editar un elemento:
  const editHandler = (event, id) => {
    event.preventDefault();
    dispatch(getNewDetail(id));
    dispatch(editNewForm(true));
    navigate("/panel-admin/publications-form");
  };

  //Función para desactivar un elemento:
  const removeHandler = (id) => {
    dispatch(removeNew(id));
    dispatch(clearNewDetail());
  };

  //Funcion para eliminar un elemento:
  const deleteHandler = (id) => {
    dispatch(deleteNew(id));
    dispatch(clearNewDetail());
  };
  const cancelHandler = () => {
    dispatch(clearNewDetail());
  };

  return (
    <div className={`${styles["container"]}`}>
      <ConfirmationWindow aceptParams={idNewDetail} />
      <section className={`${styles["data-container"]}`}>
        <button
          className={`button yellow-button ${styles["create-button"]}`}
          onClick={createHandler}
        >
          Crear nueva Publicación
        </button>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>{totalPublications.length}</p>
          <p className={`${styles["text"]}`}>Total de publicaciones</p>
        </div>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>
            {currentMonthPublications.length}
          </p>
          <p className={`${styles["text"]}`}>
            Publicaciones en {monthNames[today.getMonth()]}
          </p>
        </div>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>{lastMonthPublications.length}</p>
          <p className={`${styles["text"]}`}>
            Publicaciones en {monthNames[lastMonth.getMonth()]}
          </p>
        </div>
      </section>
      <form className={`${styles["form"]}`}>
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
              Categoría{" "}
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
          {news.length > 0 ? (
            <>
              {itemsPerPage.map(
                ({ _id, titleMain, category, createdAt, isDeleted }) => {
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
                      <td className={`${styles["category"]}`} title={category}>
                        {category}
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
                            dispatch(getNewDetail(_id));
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
      {news.length > numberPerPage && (
        <Pagination
          numberOfItems={news.length}
          numberPerPage={numberPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
