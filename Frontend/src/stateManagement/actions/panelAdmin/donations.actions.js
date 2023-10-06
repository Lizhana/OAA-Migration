import axios from "axios";
import {
  DONATIONS,
  ONE_DONATION,
  CLEAR_ONE_DONATION,
  DONATIONS_FILTERS,
  REACTIVE_DONATION,
  REMOVE_DONATION,
  DELETE_DONATION,
} from "../../types/panelAdmin";
import { NEW_MESSAGE } from "../../types/alerts";
import { LOADER_OFF, LOADER_ON } from "../../types/loader";

export const getDonations = () => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .get("/donations")
      .then((res) => {
        dispatch({ type: DONATIONS, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: DONATIONS_FILTERS,
          payload: {
            status: "active",
            order: "latest",
            iso: "all",
            search: false,
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en donations.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Ha ocurrido un error al intentar obtener las donaciones.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const getOneDonation = (id) => ({ type: ONE_DONATION, payload: id });

export const clearOneDonation = () => ({ type: CLEAR_ONE_DONATION });

export const donationsFilter = (filters) => ({
  type: DONATIONS_FILTERS,
  payload: filters,
});

// desactivar - borrado lógico
export const removeDonation = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .put(`/donations/desactivate/${id}`)
      .then(() => {
        dispatch({ type: REMOVE_DONATION, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Una donación fue suspendida exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en donations.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message: "Ha ocurrido un error al intentar suspender una donación.",
            state: "error",
          },
        };
        dispatch({ type: LOADER_OFF });
      });
  };
};

// reactivar - borrado lógico
export const reactiveDonation = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .put(`/donations/activate/${id}`)
      .then(() => {
        dispatch({ type: REACTIVE_DONATION, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Una donación fue reactivada exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en donations.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Ha ocurrido un error al intentar reactivar una donación.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

//borrado real
export const deleteDonations = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .delete(`/donations/${id}`)
      .then(() => {
        dispatch({ type: DELETE_DONATION, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Una donación fue eliminada exitosamente de la base de datos.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en donations.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar eliminar a una donación de la base de datos.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};
