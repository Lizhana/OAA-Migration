import axios from "axios";
import {
  OUR_WORKS,
  ONE_WORK,
  CLEAR_ONE_WORK,
  OUR_WORKS_FILTERS,
  CREATE_NEW_WORK,
  EDIT_WORK,
  EDIT_WORK_FORM,
  REMOVE_WORK,
  REACTIVE_WORK,
  DELETE_WORK,
} from "../../types/panelAdmin";
import { NEW_MESSAGE } from "../../types/alerts";
import { LOADER_OFF, LOADER_ON } from "../../types/loader";

export const getOurWorks = () => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .get("/work")
      .then((res) => {
        dispatch({ type: OUR_WORKS, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: OUR_WORKS_FILTERS,
          payload: {
            status: "active",
            order: "latest",
            progress: "all",
            search: false,
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en ourWorks.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar obtener los datos de la nuestros proyectos.",
            state: "error",
          },
        };
      });
  };
};

export const getOneWork = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .get(`/work/detail/${id}`)
      .then((res) => {
        dispatch({ type: ONE_WORK, payload: res.data });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en ourProjects.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar obtener los datos de un proyecto.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const clearOneWork = () => ({ type: CLEAR_ONE_WORK });

export const ourWorksFilters = (filters) => ({
  type: OUR_WORKS_FILTERS,
  payload: filters,
});

export const createNewWork = (newData) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .post("/work", newData)
      .then((res) => {
        dispatch({ type: CREATE_NEW_WORK, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Nuevo proyecto creado exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en ourProjects.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar crear un nuevo proyecto.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const editWork = (id, updateData) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .put(`/work/detail/${id}`, updateData)
      .then((res) => {
        dispatch({ type: EDIT_WORK, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Un proyecto fue editado exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en ourProjects.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Ha ocurrido un error al intentar editar un proyecto.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const editWorkForm = (boolean) => ({
  type: EDIT_WORK_FORM,
  payload: boolean,
});

//desactivar - borrado lógico
export const removeWork = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .put(`/work/deactivate/${id}`)
      .then(() => {
        dispatch({ type: REMOVE_WORK, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Un proyecto fue desactivado exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en ourProjects.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Ha ocurrido un error al intentar desactivar un proyecto.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

//reactivar - borrado lógico
export const reactiveWork = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .put(`/work/activate/${id}`)
      .then(() => {
        dispatch({ type: REACTIVE_WORK, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Un proyecto fue reactivado exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en ourProjects.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Ha ocurrido un error al intentar reactivar un proyecto.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

//borrado real
export const deleteWork = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .delete(`/work/${id}`)
      .then(() => {
        dispatch({ type: DELETE_WORK, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Un proyecto fue eliminado exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en ourProjects.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Ha ocurrido un error al intentar eliminar un proyecto.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};
