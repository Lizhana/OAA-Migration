import axios from "axios"
import { toast } from "sonner"
import * as constants from "../../types/constActionsDetail"

export function addUserToNewsletter(data) {
  return async function (dispatch) {
    try {
      const newUser = await axios.post("http://localhost:3001/newsletter", data);
      window.localStorage.setItem("suscriptor", JSON.stringify(newUser));
      toast.success("¡Te has suscrito correctamente a nuestra newsletter!")
      return dispatch({ type: constants.INSCRIPTION_NEWSLETTER, payload: newUser })

    } catch (error) {
      console.log(error);
      toast.error("Ocurrió un error al suscribirte.");
    }
  }
};

export function threNewsCategory(category) {
  return async function (dispatch) {
    try {
      const categoriesThree = await axios.get(`http://localhost:3001/news/category/${category}`)
      return dispatch({ type: constants.THREE_CATEGORIES, payload: categoriesThree.data })
    } catch (error) {
      console.log(error.message);
    }
  }
};

export function threNewsRecentAction() {
  return async function (dispatch) {
    try {
      const recentThree = await axios.get(`http://localhost:3001/news/news/recent`)
      return dispatch({ type: constants.THREE_RECENTS, payload: recentThree.data })
    } catch (error) {
      console.log(error.message);
    }
  }
};

export function getAWorkById(id) {
  return async function (dispatch) {
    try {
      const Awork = await axios.get(`/work/active/${id}`);
      return dispatch({ type: constants.GET_A_WORK, payload: Awork.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllWorKs() {
  return async function (dispatch) {
    try {
      const Allworks = await axios.get(`/work`);
      console.log(Allworks.data, 'actiomns');
      return dispatch({
        type: constants.GET_ALL_WORKS,
        payload: Allworks.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}