import {
  ADMINISTRATORS,
  ADMINISTRATORS_FILTERS,
  ONE_ADMINISTRATOR,
  CLEAR_ONE_ADMINISTRATOR,
  CREATE_ADMINISTRATOR,
  EDIT_ADMINISTRATOR,
  DELETE_ADMINISTRATOR,
} from "../../types/panelAdmin";

const initialState = {
  allAdministrators: [],
  administrators: [],
  oneAdministrator: {},
  idOneAdministrator: null,
  filters: {
    order: "latest",
    search: false,
  },
};

export default function administratorsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADMINISTRATORS: // Get
      return {
        ...state,
        allAdministrators: [...payload],
        administrators: [...payload],
      };
    case ONE_ADMINISTRATOR: // Get ID
      return {
        ...state,
        oneAdministrator: { ...payload },
        idOneAdministrator: payload._id,
      };
    case CLEAR_ONE_ADMINISTRATOR: // Clear get ID
      return {
        ...state,
        oneAdministrator: {},
      };
    case ADMINISTRATORS_FILTERS: //Filter
      const { order, search } = payload;
      let filteredAdministrators = [...state.allAdministrators];

      if (search) {
        filteredAdministrators = filteredAdministrators.filter((a) => {
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
        filteredAdministrators.sort((a, b) => a.name.localeCompare(b.name));
      } else if (order === "z-a") {
        filteredAdministrators
          .sort((a, b) => a.name.localeCompare(b.name))
          .reverse();
      } else if (order === "latest") {
        filteredAdministrators.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
        );
      } else if (order === "oldest") {
        filteredAdministrators
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
          )
          .reverse();
      }

      return {
        ...state,
        administrators: [...filteredAdministrators],
        filters: { ...payload },
      };
    case CREATE_ADMINISTRATOR: // Post
      return {
        ...state,
        allAdministrators: [payload, ...state.allAdministrators],
        administrators: [payload, ...state.administrators],
      };
    case EDIT_ADMINISTRATOR: // Put
      const updatedAllAdministrator = state.allAdministrators.find(
        (admin) => admin._id === payload._id
      );
      updatedAllAdministrator.name = payload.name;
      updatedAllAdministrator.email = payload.email;
      const updatedAdministrator = state.administrators.find(
        (admin) => admin._id === payload._id
      );
      updatedAdministrator && (updatedAdministrator.name = payload.name);
      updatedAdministrator && (updatedAdministrator.email = payload.email);
      return {
        ...state,
      };
    case DELETE_ADMINISTRATOR: // Delete
      const deletedAllAdministrator = state.allAdministrators.filter(
        (admin) => admin.id !== payload
      );
      const deletedAdministrator = state.administrators.filter(
        (admin) => admin.id !== payload
      );
      return {
        ...state,
        allAdministrators: [...deletedAllAdministrator],
        administrators: [...deletedAdministrator],
      };
    default:
      return state;
  }
}
