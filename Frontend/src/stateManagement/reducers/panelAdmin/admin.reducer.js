import { getItem, setItem } from "../../../utils/customHooks/useLocalStorage";
import { ADMIN_LOGIN, ADMIN_LOGOUT } from "../../types/panelAdmin";

const initialState = {
  admin: null,
};

export default function adminReducer(
  state = getItem("admin", initialState),
  action
) {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_LOGIN:
      setItem("admin", { ...state, admin: payload });
      return getItem("admin", initialState);
    case ADMIN_LOGOUT:
      setItem("admin", initialState);
      return getItem("admin", initialState);
    default:
      return state;
  }
}
