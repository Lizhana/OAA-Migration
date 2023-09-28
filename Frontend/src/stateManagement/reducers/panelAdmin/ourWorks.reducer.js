import {
  OUR_WORKS,
  ONE_WORK,
  CLEAR_ONE_WORK,
  OUR_WORKS_FILTERS,
  CREATE_NEW_WORK,
  EDIT_WORK,
  EDIT_WORK_FORM,
  REMOVE_WORK,
  REACTIVE_WORK,
  DELETE_WORK,
} from "../../types/panelAdmin";

const initialState = {
  allOurWorks: [],
  ourWorks: [],
  oneWork: {},
  idOneWork: null,
  edit: false,
  filters: {
    status: "active",
    order: "latest",
    progress: "all",
    search: false,
  },
};

export default function ourWorksReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case OUR_WORKS: // Get
      return { ...state, allOurWorks: [...payload], ourWorks: [...payload] };
    case ONE_WORK: // Get ID
      return { ...state, oneWork: { ...payload }, idOneWork: payload._id };
    case CLEAR_ONE_WORK: // Clear get ID
      return { ...state, oneWork: {} };
    case OUR_WORKS_FILTERS: // Filters
      const { status, order, progress, search } = payload;
      let filteredOurWorks = [...state.allOurWorks];

      if (status === "active") {
        filteredOurWorks = filteredOurWorks.filter(
          (a) => a["isDeleted"] === false
        );
      } else if (status === "inactive") {
        filteredOurWorks = filteredOurWorks.filter(
          (a) => a["isDeleted"] === true
        );
      }

      if (search) {
        filteredOurWorks = filteredOurWorks.filter((a) => {
          const searchLowerCase = search.toLowerCase();
          const titleMain = a["titleMain"].toLowerCase();
          return (
            a["_id"].includes(searchLowerCase) ||
            titleMain.includes(searchLowerCase)
          );
        });
      }

      if (progress !== "all") {
        if (progress === "isFinished") {
          filteredOurWorks = filteredOurWorks.filter(
            (a) => a["isFinished"] === true
          );
        } else {
          filteredOurWorks = filteredOurWorks.filter(
            (a) => a["isFinished"] === false
          );
        }
      }

      if (order === "a-z") {
        filteredOurWorks.sort((a, b) => a.titleMain.localeCompare(b.titleMain));
      } else if (order === "z-a") {
        filteredOurWorks
          .sort((a, b) => a.titleMain.localeCompare(b.titleMain))
          .reverse();
      } else if (order === "latest") {
        filteredOurWorks.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
        );
      } else if (order === "oldest") {
        filteredOurWorks
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
          )
          .reverse();
      }

      return {
        ...state,
        ourWorks: [...filteredOurWorks],
        filters: { ...payload },
      };
    case CREATE_NEW_WORK: // Post
      return {
        ...state,
        allOurWorks: [payload, ...state.allOurWorks],
        ourWorks: [payload, ...state.ourWorks],
      };
    case EDIT_WORK_FORM: // Edit or create form
      return { ...state, edit: payload };
    case EDIT_WORK: // Put
      const updatedAllOurWorks = state.allOurWorks.find(
        (work) => work._id === payload._id
      );
      updatedAllOurWorks.titleMain = payload.titleMain;
      updatedAllOurWorks.progress = payload.progress;
      const updatedOurWorks = state.ourWorks.find(
        (work) => work._id === payload._id
      );
      updatedOurWorks && (updatedOurWorks.titleMain = payload.titleMain);
      updatedOurWorks && (updatedOurWorks.progress = payload.progress);
      return {
        ...state,
      };
    case REMOVE_WORK: // Remove
      const removedAllWorks = state.allOurWorks.find(
        (work) => work._id === payload
      );
      removedAllWorks.isDeleted = true;
      const removedWork = state.ourWorks.find((work) => work._id === payload);
      removedWork && (removedWork.isDeleted = true);
      const removedourWorks = state.ourWorks.filter(
        (work) => work._id !== payload
      );
      return { ...state, ourWorks: [...removedourWorks] };
    case REACTIVE_WORK: //Reactive
      const reactiveourWorks = state.allOurWorks.find(
        (work) => work._id === payload
      );
      reactiveourWorks.isDeleted = false;
      const reactiveWork = state.ourWorks.find((work) => work._id === payload);
      reactiveWork.isDeleted = false;
      return { ...state };

    case DELETE_WORK: // Delete
      {
        const deletedallOurWorks = state.allOurWorks.filter(
          (work) => work.id !== payload
        );
        const deletedourWorks = state.ourWorks.filter(
          (work) => work.id !== payload
        );

        return {
          ...state,
          allOurWorks: deletedallOurWorks,
          ourWorks: deletedourWorks,
        };
      }
    default:
      return state;
  }
}
