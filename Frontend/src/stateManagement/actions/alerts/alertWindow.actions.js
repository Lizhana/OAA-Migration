import { NEW_MESSAGE, HIDDEN_MESSAGE } from "../../types/alerts";

export const newMessage = (object) => ({
  //object = {message, state: 'error' || 'success'}
  type: NEW_MESSAGE,
  payload: object,
});

export const hiddenMessage = () => ({
  type: HIDDEN_MESSAGE,
});
