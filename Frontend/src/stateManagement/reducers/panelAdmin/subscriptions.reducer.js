import {
  SUBSCRIPTIONS,
  SUBSCRIPTIONS_FILTERS,
  DELETE_SUBSCRIPTION,
  ONE_SUBSCRIPTION,
  CLEAR_ONE_SUBSCRIPTION,
  COUNT_SUBSCRIPTIONS,
} from "../../types/panelAdmin";

const initialState = {
  allSubscriptions: [],
  countSubscriptions: 0,
  subscriptions: [],
  oneSubscriptor: {},
  idOneSubscriptor: null,
  filters: {
    order: "latest",
    search: false,
  },
};

export default function subscriptionsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SUBSCRIPTIONS: // Get
      return {
        ...state,
        allSubscriptions: [...state.allSubscriptions, payload],
        subscriptions: [...state.subscriptions, payload],
      };

    case COUNT_SUBSCRIPTIONS: 
      return {
        ...state,
        countSubscriptions: payload
      };

    case ONE_SUBSCRIPTION: // Get ID
      return {
        ...state,
        oneSubscriptor: { ...payload },
        idOneSubscriptor: payload._id,
      };

    case CLEAR_ONE_SUBSCRIPTION: //Clear get ID
      return { ...state, oneSubscriptor: {} };

    case SUBSCRIPTIONS_FILTERS: // Filters
      const { order, search } = payload;
      let filteredSubscriptions = [...state.allSubscriptions];

      if (search) {
        filteredSubscriptions = filteredSubscriptions.filter((a) => {
          const searchLowerCase = search.toLowerCase();
          const name = a["name"].toLowerCase();
          return (
            a["_id"].includes(searchLowerCase) ||
            name.includes(searchLowerCase) ||
            a["email"].includes(searchLowerCase)
          );
        });
      }

      if (order === "a-z") {
        filteredSubscriptions.sort((a, b) => a.name.localeCompare(b.name));
      } else if (order === "z-a") {
        filteredSubscriptions
          .sort((a, b) => a.name.localeCompare(b.name))
          .reverse();
      } else if (order === "latest") {
        filteredSubscriptions.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
        );
      } else if (order === "oldest") {
        filteredSubscriptions
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
          )
          .reverse();
      }

      return {
        ...state,
        subscriptions: [...filteredSubscriptions],
        filters: { ...payload },
      };
    case DELETE_SUBSCRIPTION: // Delete
      const deletedAllSubscriptions = state.allSubscriptions.filter(
        (admin) => admin.id !== payload
      );
      const deletedSubscriptions = state.subscriptions.filter(
        (admin) => admin.id !== payload
      );
      return {
        ...state,
        allSubscriptions: [...deletedAllSubscriptions],
        subscriptions: [...deletedSubscriptions],
      };
    default:
      return state;
  }
}
