import React, { useEffect, useState } from "react";
import { MdSearch, MdOutlineKeyboardArrowDown, MdCached } from "react-icons/md";
import styles from "./Subscriptions.module.css";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  clearOneSubscription,
  deleteSubscription,
  getOneSubscription,
  getSubscriptions,
  subscriptionsFilters,
} from "../../stateManagement/actions/panelAdmin/subscriptions.actions";
import ConfirmationWindow from "../Alerts/ConfirmationWindow";
import useForm from "../../utils/customHooks/useForm";
import { confirmationOpen } from "../../stateManagement/actions/alerts/confirmationWindow.actions";

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
  lastMonth = new Date(today.getFullYear(), today.getMonth() - 1),
  twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2);

const initialForm = {
  search: "",
};

export default function Subscriptions() {
  //variables de estados y formularios
  const dispatch = useDispatch(),
    [currentPage, setCurrentPage] = useState(1),
    {
      allSubscriptions,
      subscriptions,
      oneSubscriptor,
      idOneSubscriptor,
      filters,
    } = useSelector((state) => state.subscriptions),
    { form, changeHandler, resetHandler } = useForm(
      "searchSuscription",
      initialForm,
      () => {}
    ),
    { search } = form;

  //variables de paginación
  const numberPerPage = 7,
    initialIndex = numberPerPage * (currentPage - 1),
    finalIndex = initialIndex + numberPerPage;

  //elementos a mostar en cada paginacion
  const itemsPerPage = subscriptions.slice(initialIndex, finalIndex);

  //variables de estadísticas
  const totalSubscriptions = allSubscriptions.length;
  const currentMonthSubscriptions = allSubscriptions.filter((subscriptor) => {
    const createdAt = new Date(subscriptor.createdAt);
    return (
      createdAt.getMonth() === today.getMonth() &&
      createdAt.getFullYear() === today.getFullYear()
    );
  });
  const lastMonthSubscriptions = allSubscriptions.filter((subscriptor) => {
    const createdAt = new Date(subscriptor.createdAt);
    return (
      createdAt.getMonth() === lastMonth.getMonth() &&
      createdAt.getFullYear() === lastMonth.getFullYear()
    );
  });
  const twoMonthsAgoSubscriptions = allSubscriptions.filter((subscriptor) => {
    const createdAt = new Date(subscriptor.createdAt);
    return (
      createdAt.getMonth() === twoMonthsAgo.getMonth() &&
      createdAt.getFullYear() === twoMonthsAgo.getFullYear()
    );
  });

  // Se ejecuta cuando se monta el componente
  useEffect(() => {
    dispatch(getSubscriptions());
  }, []);

  // Funciones de filtrado:
  const orderDateHandler = (event) => {
    event.preventDefault();
    if (filters.order === "latest") {
      dispatch(subscriptionsFilters({ ...filters, order: "oldest" }));
    } else {
      dispatch(subscriptionsFilters({ ...filters, order: "latest" }));
    }
  };
  const orderNameHandler = (event) => {
    event.preventDefault();
    if (filters.order === "a-z") {
      dispatch(subscriptionsFilters({ ...filters, order: "z-a" }));
    } else {
      dispatch(subscriptionsFilters({ ...filters, order: "a-z" }));
    }
  };
  const searchHandler = (event) => {
    event.preventDefault();
    dispatch(subscriptionsFilters({ ...filters, search }));
  };
  const clearHandler = (event) => {
    event.preventDefault();
    dispatch(subscriptionsFilters({ order: "latest", search: false }));
    resetHandler();
  };

  //Funcion para eliminar un elemento:
  const deleteHandler = (id) => {
    dispatch(deleteSubscription(id));
    dispatch(clearOneSubscription());
  };
  const cancelHandler = () => {
    dispatch(clearOneSubscription());
  };

  return (
    <div className={`${styles["container"]}`}>
      <ConfirmationWindow
        aceptParams={idOneSubscriptor}
        text={`¿Seguro que quieres eliminar a ${oneSubscriptor.name} del newsletter? Esta acción es irreversible.`}
      />
      <section className={`${styles["data-container"]}`}>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>{totalSubscriptions}</p>
          <p className={`${styles["text"]}`}>Total suscripciones</p>
        </div>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>
            {currentMonthSubscriptions.length}
          </p>
          <p className={`${styles["text"]}`}>
            Total suscripciones de {monthNames[today.getMonth()]}
          </p>
        </div>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>
            {lastMonthSubscriptions.length}
          </p>
          <p className={`${styles["text"]}`}>
            Total suscripciones de {monthNames[lastMonth.getMonth()]}
          </p>
        </div>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>
            {twoMonthsAgoSubscriptions.length}
          </p>
          <p className={`${styles["text"]}`}>
            Total suscripciones de {monthNames[twoMonthsAgo.getMonth()]}
          </p>
        </div>
      </section>
      <form className={`${styles["form"]}`}>
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
              Nombre{" "}
              <button
                className={`${styles["button"]} ${styles["arrow"]}`}
                onClick={orderNameHandler}
              >
                <MdOutlineKeyboardArrowDown
                  className="white-icon"
                  size="1.45rem"
                />
              </button>
            </th>
            <th>Correo electrónico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className={`${styles["tbody"]}`}>
          {subscriptions.length !== 0 ? (
            <>
              {itemsPerPage.map(({ _id, name, email, createdAt }) => {
                const date = new Date(createdAt).toLocaleDateString();
                return (
                  <tr key={`subscription-${_id}`}>
                    <td className={`${styles["id"]}`} title={_id}>
                      {_id}
                    </td>
                    <td className={`${styles["date"]}`} title={date}>
                      {date}
                    </td>
                    <td className={`${styles["name"]}`} title={name}>
                      {name}
                    </td>
                    <td className={`${styles["email"]}`} title={email}>
                      {email}
                    </td>
                    <td className={`${styles["actions"]}`}>
                      <button
                        className={`button yellow-button ${styles["delete-button"]}`}
                        onClick={(event) => {
                          event.preventDefault();
                          dispatch(getOneSubscription(_id));
                          dispatch(
                            confirmationOpen({
                              message: false,
                              acept: deleteHandler,
                              cancel: cancelHandler,
                            })
                          );
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr>
              <td colSpan="5">No se encontró ningún dato.</td>
            </tr>
          )}
        </tbody>
      </table>
      {subscriptions.length > numberPerPage && (
        <Pagination
          numberOfItems={subscriptions.length}
          numberPerPage={numberPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
