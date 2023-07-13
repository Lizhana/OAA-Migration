import { LOADER_OFF, LOADER_ON } from "../../types/loader";

const initialState = {
  loader: "invisible",
};

export default function loaderReducer(state = initialState, action) {
  switch (action.type) {
    case LOADER_ON:
      return { ...state, loader: "visible" };
    case LOADER_OFF:
      return { ...state, loader: "invisible" };
    default:
      return state;
  }
}
