import {
  CONFIMATION_WINDOW_OPEN,
  CONFIMATION_WINDOW_CLOSE,
} from "../../types/alerts";

const initialState = {
  confirmationWindow: "invisible",
  message: "",
  acept: () => {},
  cancel: null,
};

export default function confirmationReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CONFIMATION_WINDOW_OPEN:
      return { ...state, confirmationWindow: "visible", ...payload };
    case CONFIMATION_WINDOW_CLOSE:
      return initialState;
    default:
      return state;
  }
}
