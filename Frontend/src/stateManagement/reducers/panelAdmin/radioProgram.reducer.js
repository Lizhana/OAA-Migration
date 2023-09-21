import {
  RADIO_PROGRAM,
  ONE_RADIO_PROGRAM,
  CLEAR_ONE_RADIO_PROGRAM,
  RADIO_PROGRAM_FILTERS,
  CREATE_RADIO_PROGRAM,
  EDIT_RADIO_PROGRAM,
  EDIT_RADIO_PROGRAM_FORM,
  REMOVE_RADIO_PROGRAM,
  REACTIVE_RADIO_PROGRAM,
  DELETE_RADIO_PROGRAM,
} from "../../types/panelAdmin";

const initialState = {
  allRadioPrograms: [],
  radioProgram: [],
  oneRadioProgram: {},
  idOneRadioProgram: null,
  edit: false,
  filters: {
    status: "active",
    order: "latest",
    search: false,
  },
};

export default function radioProgramReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RADIO_PROGRAM: // Get
      return {
        ...state,
        allRadioPrograms: [...payload],
        radioProgram: [...payload],
      };
    case ONE_RADIO_PROGRAM: // Get ID
      return {
        ...state,
        oneRadioProgram: { ...payload },
        idOneRadioProgram: payload._id,
      };
    case CLEAR_ONE_RADIO_PROGRAM: //Clear get ID
      return { ...state, oneRadioProgram: {} };
    case RADIO_PROGRAM_FILTERS: // Filters
      const { status, order, search } = payload;
      let filteredRadio = [...state.allRadioPrograms];

      if (status === "active") {
        filteredRadio = filteredRadio.filter((a) => a["isDeleted"] === false);
      } else if (status === "inactive") {
        filteredRadio = filteredRadio.filter((a) => a["isDeleted"] === true);
      }

      if (search) {
        filteredRadio = filteredRadio.filter((a) => {
          const searchLowerCase = search.toLowerCase();
          const titleMain = a["titleMain"].toLowerCase();
          return (
            a["_id"].includes(searchLowerCase) ||
            titleMain.includes(searchLowerCase)
          );
        });
      }

      if (order === "a-z") {
        filteredRadio.sort((a, b) => a.titleMain.localeCompare(b.titleMain));
      } else if (order === "z-a") {
        filteredRadio
          .sort((a, b) => a.titleMain.localeCompare(b.titleMain))
          .reverse();
      } else if (order === "latest") {
        filteredRadio.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
        );
      } else if (order === "oldest") {
        filteredRadio
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
          )
          .reverse();
      }

      return {
        ...state,
        radioProgram: [...filteredRadio],
        filters: { ...payload },
      };
    case CREATE_RADIO_PROGRAM: // Post
      return {
        ...state,
        allRadioPrograms: [payload, ...state.allRadioPrograms],
        radioProgram: [payload, ...state.radioProgram],
      };
    case EDIT_RADIO_PROGRAM_FORM: //edit or create form
      return { ...state, edit: payload };
    case EDIT_RADIO_PROGRAM: // Put
      const updatedAllRadio = state.allRadioPrograms.find(
        (a) => a._id === payload._id
      );
      updatedAllRadio.titleMain = payload.titleMain;
      updatedAllRadio.category = payload.category;
      const updatedRadio = state.radioProgram.find(
        (a) => a._id === payload._id
      );
      updatedRadio && (updatedRadio.titleMain = payload.titleMain);
      updatedRadio && (updatedRadio.category = payload.category);
      return {
        ...state,
      };
    case REMOVE_RADIO_PROGRAM: // Remove
      const removedAllRadio = state.allRadioPrograms.find(
        (admin) => admin._id === payload
      );
      removedAllRadio.isDeleted = true;
      const removedRadio = state.radioProgram.filter(
        (admin) => admin._id !== payload
      );
      return { ...state, radioProgram: [...removedRadio] };
    case REACTIVE_RADIO_PROGRAM: //Reactive
      const reactiveRadioPrograms = state.allRadioPrograms.find(
        (a) => a._id === payload
      );
      reactiveRadioPrograms.isDeleted = false;
      const reactiveRadioProgram = state.radioProgram.find(
        (a) => a._id === payload
      );
      reactiveRadioProgram && (reactiveRadioProgram.isDeleted = false);
    case DELETE_RADIO_PROGRAM: // Delete
      const deletedAllRadio = state.allRadioPrograms.filter(
        (admin) => admin.id !== payload
      );
      const deletedRadio = state.radioProgram.filter(
        (admin) => admin.id !== payload
      );
      return {
        ...state,
        allRadioPrograms: [...deletedAllRadio],
        radioProgram: [...deletedRadio],
      };
    default:
      return state;
  }
}
