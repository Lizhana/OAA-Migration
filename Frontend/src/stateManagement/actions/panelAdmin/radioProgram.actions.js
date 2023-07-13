import axios from "axios";
import {
  RADIO_PROGRAM,
  ONE_RADIO_PROGRAM,
  CLEAR_ONE_RADIO_PROGRAM,
  RADIO_PROGRAM_FILTERS,
  CREATE_RADIO_PROGRAM,
  EDIT_RADIO_PROGRAM,
  EDIT_RADIO_PROGRAM_FORM,
  REMOVE_RADIO_PROGRAM,
  REACTIVE_RADIO_PROGRAM,
  DELETE_RADIO_PROGRAM,
} from "../../types/panelAdmin";
import { NEW_MESSAGE } from "../../types/alerts";
import { LOADER_OFF, LOADER_ON } from "../../types/loader";

export const getRadioProgram = () => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .get("/radio-program")
      .then((res) => {
        dispatch({ type: RADIO_PROGRAM, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: RADIO_PROGRAM_FILTERS,
          payload: {
            status: "active",
            order: "latest",
            search: false,
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en radioProgram.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar obtener programas de radio.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const oneRadioProgram = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .get(`/radio-program/detail/${id}`)
      .then((res) => {
        dispatch({ type: ONE_RADIO_PROGRAM, payload: res.data });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en radioProgram.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar obtener un programa de radio.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const clearOneRadioProgram = () => ({ type: CLEAR_ONE_RADIO_PROGRAM });

export const radioProgramFilters = (filters) => ({
  type: RADIO_PROGRAM_FILTERS,
  payload: filters,
});

export const createRadioProgram = (newData) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .post("/radio-program", newData)
      .then((res) => {
        dispatch({ type: CREATE_RADIO_PROGRAM, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Nueva transmisión de radio agregada exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en radioProgram.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar añadir una nueva transmisión de radio.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const editRadioProgram = (id, updateData) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .put(`/radio-program/detail/${id}`, updateData)
      .then((res) => {
        dispatch({ type: EDIT_RADIO_PROGRAM, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Una transmisión de radio fue editado exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en radioProgram.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar editar una transmisión de radio.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const editRadioProgramForm = (boolean) => ({
  type: EDIT_RADIO_PROGRAM_FORM,
  payload: boolean,
});

// desactivar - Borrado lógico
export const removeRadioProgram = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .put(`/radio-program/deactivate/${id}`)
      .then(() => {
        dispatch({ type: REMOVE_RADIO_PROGRAM, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Una transmisión de radio fue desactivada exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en radioProgram.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar desactivar una transmisión de radio.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

// reactivar - Borrado lógico
export const reactiveRadioProgram = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .put(`/radio-program/activate/${id}`)
      .then(() => {
        dispatch({ type: REACTIVE_RADIO_PROGRAM, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Una transmisión de radio fue reactivada exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en radioProgram.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar reactivar una transmisión de radio.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

// Borrado real
export const deleteRadioProgram = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .delete(`/radio-program/${id}`)
      .then(() => {
        dispatch({ type: DELETE_RADIO_PROGRAM, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Una transmisión de radio fue eliminada exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en radioProgram.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar eliminar una transmisión de radio.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};
