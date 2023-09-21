import { CLEAN_QUERY, QUERY_STATE, SYNC_STATE } from "../../types/panelAdmin";

const initialState = {
  currentData: [],
  cacheData: []
};

export default function currentWorkingStateReducer (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SYNC_STATE: {
      return {...state, currentData:payload, cacheData: payload};
    }
    case QUERY_STATE: {
      const queryData = state.currentData.filter((item) => {
        return item.titleMain.toLowerCase().includes(payload.toLowerCase());
      });

      return {... state, currentData: queryData}
    }

    case CLEAN_QUERY: {
      return {...state, currentData: state.cacheData}
    }
    default:
      return state;
  }
}

