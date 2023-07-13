import axios from "axios";
import {
  GALLERY,
  ONE_GALLERY,
  GALLERY_FILTERS,
  CLEAR_ONE_GALLERY,
  CREATE_GALLERY,
  EDIT_GALLERY,
  EDIT_GALLERY_FORM,
  REACTIVE_GALLERY,
  REMOVE_GALLERY,
  DELETE_GALLERY,
} from "../../types/panelAdmin";
import { NEW_MESSAGE } from "../../types/alerts";
import { LOADER_OFF, LOADER_ON } from "../../types/loader";

export const getGalleries = () => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .get("/gallery")
      .then((res) => {
        dispatch({ type: GALLERY, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: GALLERY_FILTERS,
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
        console.log("Error en gallery.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar obtener los datos de la galería.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const getOneGallery = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .get(`/gallery/detail/${id}`)
      .then((res) => {
        dispatch({ type: ONE_GALLERY, payload: res.data });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en gallery.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar obtener un archivo de la galería.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const clearOneGallery = () => ({ type: CLEAR_ONE_GALLERY });

export const galleryFilters = (filters) => ({
  type: GALLERY_FILTERS,
  payload: filters,
});

export const createGallery = (newData) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .post("/gallery", newData)
      .then((res) => {
        dispatch({ type: CREATE_GALLERY, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Nuevo archivo añadido exitosamente a la galería.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en gallery.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar añadir un nuevo archivo a la galería.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const editGallery = (id, updateData) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .put(`/gallery/detail/${id}`, updateData)
      .then((res) => {
        dispatch({ type: EDIT_GALLERY, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Un archivo de la galería fue editado exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en gallery.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar editar un archivo de la galería.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const editGalleryForm = (boolean) => ({
  type: EDIT_GALLERY_FORM,
  payload: boolean,
});

// remover - borrado lógico
export const removeGallery = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .put(`/gallery/deactivate/${id}`)
      .then(() => {
        dispatch({ type: REMOVE_GALLERY, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Un archivo de la galería fue desactivado exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en gallery.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar desactivar a un archivo de la galería.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

// reactivar - borrado lógico
export const reactiveGallery = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .put(`/gallery/reactive/${id}`)
      .then(() => {
        dispatch({ type: REACTIVE_GALLERY, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Un archivo de la galería fue activado exitosamente.",
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
              "Ha ocurrido un error al intentar activar un archivo de la galería.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

//borrado real
export const deleteGallery = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .delete(`/gallery/${id}`)
      .then(() => {
        dispatch({ type: DELETE_GALLERY, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Un archivo fue eliminado de la galería exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en gallery.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar eliminar a un archivo de la galería.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};
