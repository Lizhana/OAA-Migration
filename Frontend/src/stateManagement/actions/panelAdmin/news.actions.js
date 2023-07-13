import axios from "axios";
import {
  NEWS,
  NEW_DETAIL,
  CLEAR_NEW_DETAIL,
  NEWS_FILTERS,
  CREATE_NEW,
  EDIT_NEW,
  EDIT_NEW_FORM,
  REMOVE_NEW,
  REACTIVE_NEW,
  DELETE_NEW,
} from "../../types/panelAdmin";
import { NEW_MESSAGE } from "../../types/alerts";
import { LOADER_OFF, LOADER_ON } from "../../types/loader";

export const getAllNews = () => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .get("/news")
      .then((res) => {
        dispatch({ type: NEWS, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEWS_FILTERS,
          payload: {
            status: "active",
            order: "latest",
            category: "all",
            search: false,
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en news.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Ha ocurrido un error al intentar obtener las noticias.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const getNewDetail = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .get(`/news/detail/${id}`)
      .then((res) => {
        dispatch({ type: NEW_DETAIL, payload: res.data });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en news.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Error al intentar obtener una noticia.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const clearNewDetail = () => ({ type: CLEAR_NEW_DETAIL });

export const newsFilters = (filters) => ({
  type: NEWS_FILTERS,
  payload: filters,
});

export const createNew = (newData) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .post("/news", newData)
      .then((res) => {
        dispatch({ type: CREATE_NEW, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Nueva publicación creada exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en news.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar crear una nueva publicación.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const editNewForm = (boolean) => ({
  type: EDIT_NEW_FORM,
  payload: boolean,
});

export const editNew = (id, updateData) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .put(`/news/detail/${id}`, updateData)
      .then((res) => {
        dispatch({ type: EDIT_NEW, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Una publicación fue editada exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en news.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Ha ocurrido un error al intentar editar una publicación.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

// remover - borrado lógico
export const removeNew = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .put(`/news/deactivate/${id}`)
      .then(() => {
        dispatch({ type: REMOVE_NEW, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Una publicación fue desactivada exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en news.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar desactivar una publicación.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

// reactivar - borrado lógico
export const reactiveNew = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .put(`/news/activate/${id}`)
      .then(() => {
        dispatch({ type: REACTIVE_NEW, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Una publicación fue activada exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en news.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar activar una publicación.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

//borrado real
export const deleteNew = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .delete(`/news/${id}`)
      .then(() => {
        dispatch({ type: DELETE_NEW, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Una publicación fue eliminada exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en news.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar eliminar a una publicación.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};
