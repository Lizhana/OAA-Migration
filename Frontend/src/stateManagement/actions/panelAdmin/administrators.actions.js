import axios from "axios";
import {
  ADMINISTRATORS,
  ADMINISTRATORS_FILTERS,
  ONE_ADMINISTRATOR,
  CLEAR_ONE_ADMINISTRATOR,
  CREATE_ADMINISTRATOR,
  EDIT_ADMINISTRATOR,
  DELETE_ADMINISTRATOR,
} from "../../types/panelAdmin";
import { NEW_MESSAGE } from "../../types/alerts";
import { LOADER_OFF, LOADER_ON } from "../../types/loader";

export const getAllAdministrators = () => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .get("/admin")
      .then((res) => {
        dispatch({ type: ADMINISTRATORS, payload: res.data });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en administrators.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar obtener los usuario administradores.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const administratorsFilters = (filters) => ({
  type: ADMINISTRATORS_FILTERS,
  payload: filters,
});

export const getOneAdministrator = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .get(`/admin/data/${id}`)
      .then((res) => {
        dispatch({ type: ONE_ADMINISTRATOR, payload: res.data });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en administrators.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar obtener un usuario administrador.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const clearOneAdministrator = () => ({ type: CLEAR_ONE_ADMINISTRATOR });

export const createAdministrator = (newAdmin) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .post("/admin", { ...newAdmin })
      .then((res) => {
        dispatch({ type: CREATE_ADMINISTRATOR, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Nuevo administrador creado exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en administrators.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar crear un nuevo usuario administrador.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const editAdministrator = (id, { name, email }) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .put(`/admin/data/${id}`, { name, email })
      .then((res) => {
        dispatch({ type: EDIT_ADMINISTRATOR, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Un administrador fue editado exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en administrators.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar editar a un usuario administrador.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const deleteAdministrator = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    console.log("hola")
    axios
      .delete(`/admin/${id}`)
      .then(() => {
        dispatch({ type: DELETE_ADMINISTRATOR, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Un administrador fue removido exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en administrators.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar remover a un usuario administrador.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};
