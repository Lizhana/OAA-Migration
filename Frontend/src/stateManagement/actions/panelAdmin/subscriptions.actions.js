import axios from "axios";
import {
  SUBSCRIPTIONS,
  SUBSCRIPTIONS_FILTERS,
  DELETE_SUBSCRIPTION,
  CLEAR_ONE_SUBSCRIPTION,
  ONE_SUBSCRIPTION,
  COUNT_SUBSCRIPTIONS,
} from "../../types/panelAdmin";
import { LOADER_OFF, LOADER_ON } from "../../types/loader";
import { NEW_MESSAGE } from "../../types/alerts";

export const getSubscriptions = () => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .get("/newsletter")
      .then((res) => {
        dispatch({ type: SUBSCRIPTIONS, payload: res.data });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en subscriptions.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar obtener los suscriptores de la newsletter.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const getCountSubscription = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get("/subscribers/count");
      dispatch({
        type: COUNT_SUBSCRIPTIONS,
        payload: data.total,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export const getOneSubscription = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .get(`/newsletter/${id}`)
      .then((res) => {
        dispatch({ type: ONE_SUBSCRIPTION, payload: res.data });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en subscriptions.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Ha ocurrido un error al intentar obtener un suscriptor.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const clearOneSubscription = () => ({ type: CLEAR_ONE_SUBSCRIPTION });

export const subscriptionsFilters = (filters) => ({
  type: SUBSCRIPTIONS_FILTERS,
  payload: filters,
});

export const deleteSubscription = (id) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .delete(`/newsletter/${id}`)
      .then(() => {
        dispatch({ type: DELETE_SUBSCRIPTION, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Un suscriptor de la newsletter fue eliminado exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en subscriptions.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar eliminar a un suscriptor de la newsletter.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};
