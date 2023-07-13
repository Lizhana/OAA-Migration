import {
  CONFIMATION_WINDOW_OPEN,
  CONFIMATION_WINDOW_CLOSE,
} from "../../types/alerts";

export const confirmationOpen = (options) => ({
  type: CONFIMATION_WINDOW_OPEN,
  payload: options,
});

export const confirmationClose = () => ({ type: CONFIMATION_WINDOW_CLOSE });
