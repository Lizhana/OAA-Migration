import { CLEAN_QUERY, QUERY_STATE, SYNC_STATE } from "../../types/panelAdmin";

export const syncCurrentState  = (data) => {
  return {type: SYNC_STATE, payload: data};
};

export const queryCurrentState = (query) => {
  return {type: QUERY_STATE, payload: query};
}

export const cleanCurrentQuery = () => {
  return {type:CLEAN_QUERY};
}
