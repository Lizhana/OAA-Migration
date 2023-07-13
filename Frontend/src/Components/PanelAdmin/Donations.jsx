import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MdDelete,
  MdCheckCircle,
  MdSearch,
  MdOutlineKeyboardArrowDown,
  MdCached,
} from "react-icons/md";
import Pagination from "../Pagination/Pagination";
import useForm from "../../utils/customHooks/useForm";
import ConfirmationWindow from "../Alerts/ConfirmationWindow";
import { confirmationOpen } from "../../stateManagement/actions/alerts/confirmationWindow.actions";

import styles from "./Donations.module.css";
import {
  clearOneDonation,
  deleteDonations,
  donationsFilter,
  getDonations,
  getOneDonation,
  reactiveDonation,
  removeDonation,
} from "../../stateManagement/actions/panelAdmin/donations.actions";

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

export default function Donations() {
  //variables de estados y formularios
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    [currentPage, setCurrentPage] = useState(1),
    { allDonations, donations, idDonation, filters } = useSelector(
      (state) => state.donations
    ),
    { form, changeHandler, resetHandler } = useForm(
      "searchDonations",
      initialForm,
      () => {}
    ),
    { search, status } = form;

  //variables de paginación
  const numberPerPage = 7,
    initialIndex = numberPerPage * (currentPage - 1),
    finalIndex = initialIndex + numberPerPage;

  //elementos a mostar en cada paginacion
  const itemsPerPage = donations.slice(initialIndex, finalIndex);

  //variables de estadísticas
  // --- Número total de donaciones de este mes
  const totalDonations = allDonations.filter((donation) => {
    const createdAt = new Date(donation.createdAt);
    return (
      !donation.isDeleted &&
      createdAt.getMonth() === today.getMonth() &&
      createdAt.getFullYear() === today.getFullYear()
    );
  });
  // --- Total de ARS en donaciones de este mes
  const currentMonthDonationsArs = allDonations.filter((donation) => {
    const createdAt = new Date(donation.createdAt);
    return (
      !donation.isDeleted &&
      donation.iso === "ARS" &&
      createdAt.getMonth() === today.getMonth() &&
      createdAt.getFullYear() === today.getFullYear()
    );
  });
  const currentMonthArs = currentMonthDonationsArs.reduce(
    (acum, donation) => parseInt(acum) + parseInt(donation.amount),
    0
  );
  // --- Total de USD en donaciones de este mes
  const currentMonthDonationsUsd = allDonations.filter((donation) => {
    const createdAt = new Date(donation.createdAt);
    return (
      !donation.isDeleted &&
      donation.iso === "USD" &&
      createdAt.getMonth() === today.getMonth() &&
      createdAt.getFullYear() === today.getFullYear()
    );
  });
  const currentMonthUsd = currentMonthDonationsUsd.reduce(
    (acum, donation) => parseInt(acum) + parseInt(donation.amount),
    0
  );
  // --- Total de ARS en donaciones del mes anterior
  const lastMonthDonationsArs = allDonations.filter((donation) => {
    const createdAt = new Date(donation.createdAt);
    return (
      !donation.isDeleted &&
      donation.iso === "ARS" &&
      createdAt.getMonth() === lastMonth.getMonth() &&
      createdAt.getFullYear() === lastMonth.getFullYear()
    );
  });
  const lastMonthArs = lastMonthDonationsArs.reduce(
    (acum, donation) => parseInt(acum) + parseInt(donation.amount),
    0
  );
  // --- Total de USD en donaciones del mes anterior
  const lastMonthDonationsUsd = allDonations.filter((donation) => {
    const createdAt = new Date(donation.createdAt);
    return (
      !donation.isDeleted &&
      donation.iso === "USD" &&
      createdAt.getMonth() === lastMonth.getMonth() &&
      createdAt.getFullYear() === lastMonth.getFullYear()
    );
  });
  const lastMonthUsd = lastMonthDonationsUsd.reduce(
    (acum, donation) => parseInt(acum) + parseInt(donation.amount),
    0
  );

  // Se ejecuta cuando se monta el componente
  useEffect(() => {
    dispatch(getDonations());
  }, []);

  // Se ejecuta cuando status cambia
  useEffect(() => {
    dispatch(
      donationsFilter({
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
        donationsFilter({
          ...filters,
          order: "oldest",
        })
      );
    } else {
      dispatch(
        donationsFilter({
          ...filters,
          order: "latest",
        })
      );
    }
  };
  const orderAmountHandler = (event) => {
    event.preventDefault();
    if (filters.order === "higher") {
      dispatch(
        donationsFilter({
          ...filters,
          order: "lower",
        })
      );
    } else {
      dispatch(
        donationsFilter({
          ...filters,
          order: "higher",
        })
      );
    }
  };
  const isoHandler = (event) => {
    event.preventDefault();
    if (filters.iso === "all") {
      dispatch(
        donationsFilter({
          ...filters,
          iso: "ARS",
        })
      );
    } else if (filters.iso === "ARS") {
      dispatch(
        donationsFilter({
          ...filters,
          iso: "USD",
        })
      );
    } else if (filters.iso === "USD") {
      dispatch(
        donationsFilter({
          ...filters,
          iso: "all",
        })
      );
    }
  };
  const searchHandler = (event) => {
    event.preventDefault();
    dispatch(
      donationsFilter({
        ...filters,
        search,
      })
    );
  };
  const clearHandler = (event) => {
    event.preventDefault();
    dispatch(
      donationsFilter({
        ...filters,
        search: false,
      })
    );
    resetHandler();
  };

  //Función para desactivar un elemento:
  const removeHandler = (id) => {
    dispatch(removeDonation(id));
    dispatch(clearOneDonation());
  };

  //Funcion para eliminar un elemento:
  const deleteHandler = (id) => {
    dispatch(deleteDonations(id));
    dispatch(clearOneDonation());
  };
  const cancelHandler = () => {
    dispatch(clearOneDonation());
  };

  return (
    <div className={`${styles["container"]}`}>
      <ConfirmationWindow aceptParams={idDonation} />
      <section className={`${styles["data-container"]}`}>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>{totalDonations.length}</p>
          <p className={`${styles["text"]}`}>
            Donaciones de {monthNames[today.getMonth()]}
          </p>
        </div>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>{currentMonthArs}</p>
          <p className={`${styles["text"]}`}>
            Total ARS de {monthNames[today.getMonth()]}
          </p>
        </div>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>{currentMonthUsd}</p>
          <p className={`${styles["text"]}`}>
            Total USD de {monthNames[today.getMonth()]}
          </p>
        </div>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>{lastMonthArs}</p>
          <p className={`${styles["text"]}`}>
            Total ARS de {monthNames[lastMonth.getMonth()]}
          </p>
        </div>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>{lastMonthUsd}</p>
          <p className={`${styles["text"]}`}>
            Total USD de {monthNames[lastMonth.getMonth()]}
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
            <option value="active">Donaciones aprobadas</option>
            <option value="inactive">Donaciones rechazadas</option>
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
              Importe{" "}
              <button
                className={`${styles["button"]} ${styles["arrow"]}`}
                onClick={orderAmountHandler}
              >
                <MdOutlineKeyboardArrowDown
                  className="white-icon"
                  size="1.45rem"
                />
              </button>
            </th>
            <th>
              Moneda{" "}
              <button
                className={`${styles["button"]} ${styles["arrow"]}`}
                onClick={isoHandler}
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
          {donations.length > 0 ? (
            <>
              {itemsPerPage.map(
                ({ _id, iso, amount, createdAt, isDeleted }) => {
                  const date = new Date(createdAt).toLocaleDateString();
                  return (
                    <tr key={`admin-${_id}`}>
                      <td className={`${styles["id"]}`} title={_id}>
                        {_id}
                      </td>
                      <td className={`${styles["date"]}`} title={date}>
                        {date}
                      </td>
                      <td className={`${styles["amount"]}`} title={amount}>
                        {amount}
                      </td>
                      <td className={`${styles["iso"]}`} title={iso}>
                        {iso}
                      </td>
                      <td className={`${styles["actions"]}`}>
                        {isDeleted && (
                          <button
                            className={`${styles["button"]} ${styles["button-left"]}`}
                            onClick={() => dispatch(reactiveDonation(_id))}
                          >
                            <MdCheckCircle
                              className="blue-icon"
                              size="1.5rem"
                            />
                          </button>
                        )}

                        <button
                          className={`${styles["button"]} ${styles["button-right"]}`}
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(getOneDonation(_id));
                            isDeleted
                              ? dispatch(
                                  confirmationOpen({
                                    message:
                                      "¿Seguro que desea eliminar esta donación? Esta acción es irreversible y estos datos se perderán para siempre.",
                                    acept: deleteHandler,
                                    cancel: cancelHandler,
                                  })
                                )
                              : dispatch(
                                  confirmationOpen({
                                    message:
                                      "¿Desea desactivar esta donación? Esta acción es reversible.",
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
      {donations.length > numberPerPage && (
        <Pagination
          numberOfItems={donations.length}
          numberPerPage={numberPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
