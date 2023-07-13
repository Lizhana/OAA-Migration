import axios from "axios";
import { ADMIN_LOGIN, ADMIN_LOGOUT } from "../../types/panelAdmin";
import { NEW_MESSAGE } from "../../types/alerts";
import { LOADER_OFF, LOADER_ON } from "../../types/loader";

export const loginAdmin = ({ email, password }) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .put("/admin/log", { email, password })
      .then((res) => {
        dispatch({ type: ADMIN_LOGIN, payload: res.data });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en admin.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "El correo o la contraseña no son válidos.",
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const logoutAdmin = () => ({ type: ADMIN_LOGOUT });

export const resetPassword = (email) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .put(`/admin/password`, { email })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Nueva contraseña enviada al correo.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en admin.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: error.response.data.message,
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};

export const editPassword = (id, password) => {
  return function (dispatch) {
    dispatch({ type: LOADER_ON });
    axios
      .put(`/admin/password/${id}`, { password })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Su contraseña fue actualizada exitosamente.",
            state: "success",
          },
        });
      })
      .then(() => {
        dispatch({ type: LOADER_OFF });
      })
      .catch((error) => {
        console.log("Error en admin.actions: ", error);
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: error.response.data.message,
            state: "error",
          },
        });
        dispatch({ type: LOADER_OFF });
      });
  };
};
