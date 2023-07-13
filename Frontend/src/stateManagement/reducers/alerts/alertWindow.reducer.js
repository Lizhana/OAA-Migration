import { NEW_MESSAGE, HIDDEN_MESSAGE } from "../../types/alerts";

const initialState = {
  success: null,
  error: null,
  className: "alert-hidden",
};

export default function alertReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case NEW_MESSAGE:
      if (payload.state === "error") {
        return {
          success: null,
          error: payload.message,
          className: "alert-show",
        };
      }
      return {
        success: payload.message,
        error: null,
        className: "alert-show",
      };

    case HIDDEN_MESSAGE:
      return { ...state, className: "alert-hidden" };
    default:
      return state;
  }
}
