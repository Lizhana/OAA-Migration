import React, { useEffect, useState } from "react";
import AdministratorsForm from "./AdministratorsForm";
import {
  MdDelete,
  MdEdit,
  MdSearch,
  MdOutlineKeyboardArrowDown,
  MdCached,
} from "react-icons/md";
import Pagination from "../Pagination/Pagination";
import styles from "./Administrators.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  administratorsFilters,
  clearOneAdministrator,
  deleteAdministrator,
  getAllAdministrators,
  getOneAdministrator,
} from "../../stateManagement/actions/panelAdmin/administrators.actions";
import useForm from "../../utils/customHooks/useForm";
import ConfirmationWindow from "../Alerts/ConfirmationWindow";
import { confirmationOpen } from "../../stateManagement/actions/alerts/confirmationWindow.actions";

const initialForm = {
  search: "",
};

export default function Administrators() {

  //variables de estados y formularios
  const dispatch = useDispatch(),
    [edit, setEdit] = useState(false),
    [currentPage, setCurrentPage] = useState(1),
    { admin } = useSelector((state) => state.admin),
    { administrators, oneAdministrator, idOneAdministrator, filters } =
      useSelector((state) => state.administrators),
    { form, changeHandler, resetHandler } = useForm(
      "searchAdmin",
      initialForm,
      () => {}
    ),
    { search } = form;

  //variables de paginación
  const numberPerPage = 7,
    initialIndex = numberPerPage * (currentPage - 1),
    finalIndex = initialIndex + numberPerPage;

  //elementos a mostar en cada paginacion
  const itemsPerPage = administrators.slice(initialIndex, finalIndex);

  // Se ejecuta cuando se monta el componente
  useEffect(() => {
    dispatch(getAllAdministrators());
  }, []);

  // Funciones de filtrado:
  const orderDateHandler = (event) => {
    event.preventDefault();
    if (filters.order === "latest") {
      dispatch(administratorsFilters({ ...filters, order: "oldest" }));
    } else {
      dispatch(administratorsFilters({ ...filters, order: "latest" }));
    }
  };
  const orderNameHandler = (event) => {
    event.preventDefault();
    if (filters.order === "a-z") {
      dispatch(administratorsFilters({ ...filters, order: "z-a" }));
    } else {
      dispatch(administratorsFilters({ ...filters, order: "a-z" }));
    }
  };
  const searchHandler = (event) => {
    event.preventDefault();
    dispatch(administratorsFilters({ ...filters, search }));
  };
  const clearHandler = (event) => {
    event.preventDefault();
    dispatch(administratorsFilters({ order: "latest", search: false }));
    resetHandler();
  };

  //Funcion para eliminar un elemento:
  const deleteHandler = (id) => {
    dispatch(deleteAdministrator(id));
    dispatch(clearOneAdministrator());
  };
  const cancelHandler = () => {
    dispatch(clearOneAdministrator());
  };

  return (
    <div className={`${styles["container"]}`}>
      <ConfirmationWindow
        aceptParams={idOneAdministrator}
        text={`¿Seguro que quieres eliminar a ${
          oneAdministrator && oneAdministrator.name
        } de administradores? Esta acción no es reversible y este usuario no tendrá acceso al Panel de Administrador.`}
      />
      <div className={`${styles["forms-container"]}`}>
        <AdministratorsForm edit={edit} setEdit={setEdit} />
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
      </div>
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
          {administrators.length !== 0 ? (
            <>
              {itemsPerPage.map(({ _id, name, email, createdAt }) => {
                const date = new Date(createdAt).toLocaleDateString();
                return (
                  <tr key={`admin-${_id}`}>
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
                        className={`${styles["button"]} ${styles["button-left"]}`}
                        onClick={(event) => {
                          event.preventDefault();
                          dispatch(getOneAdministrator(_id));
                          setEdit(true);
                        }}
                      >
                        <MdEdit className="blue-icon" size="1.5rem" />
                      </button>
                      {_id !== admin._id && (
                        <button
                          className={`${styles["button"]} ${styles["button-right"]}`}
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(getOneAdministrator(_id));
                            dispatch(
                              confirmationOpen({
                                message: false,
                                acept: deleteHandler,
                                cancel: cancelHandler,
                              })
                            );
                          }}
                        >
                          <MdDelete className="blue-icon" size="1.5rem" />
                        </button>
                      )}
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
      {administrators.length > numberPerPage && (
        <Pagination
          numberOfItems={administrators.length}
          numberPerPage={numberPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
