import {
  GALLERY,
  ONE_GALLERY,
  GALLERY_FILTERS,
  CLEAR_ONE_GALLERY,
  CREATE_GALLERY,
  EDIT_GALLERY,
  EDIT_GALLERY_FORM,
  REACTIVE_GALLERY,
  REMOVE_GALLERY,
  DELETE_GALLERY,
} from "../../types/panelAdmin";

const initialState = {
  allGalleries: [],
  galleries: [],
  oneGallery: {},
  idOneGallery: null,
  edit: false,
  filters: {
    status: "active",
    order: "latest",
    category: "all",
    search: false,
  },
};

export default function galleryReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GALLERY: // Get
      return { ...state, allGalleries: [...payload], galleries: [...payload] };
    case ONE_GALLERY: // Get ID
      return {
        ...state,
        oneGallery: { ...payload },
        idOneGallery: payload._id,
      };
    case CLEAR_ONE_GALLERY: //Clear get ID
      return { ...state, oneGallery: {} };
    case GALLERY_FILTERS: // Filters
    {
        const { status, order, category, search } = payload;
        let filteredGallery = [...state.allGalleries];
        console.log(order)

        if (status === "active") {
          filteredGallery = filteredGallery.filter(
            (a) => a["isDeleted"] === false
          );
        } else if (status === "inactive") {
          filteredGallery = filteredGallery.filter(
            (a) => a["isDeleted"] === true
          );
        }

        if (search) {
          filteredGallery = filteredGallery.filter((a) => {
            const searchLowerCase = search.toLowerCase();
            const titleMain = a["titleMain"].toLowerCase();
            return (
              a["_id"].includes(searchLowerCase) ||
                titleMain.includes(searchLowerCase)
            );
          });
        }

        if (category !== "all") {
          filteredGallery = filteredGallery.filter(
            (a) => a["category"] === category
          );
        }

if (order === "a-z") {
  filteredGallery.sort((a, b) => a.titleMain.localeCompare(b.titleMain));
} else if (order === "z-a") {
  filteredGallery.sort((a, b) => b.titleMain.localeCompare(a.titleMain));
}  else if (order === "latest") {
          filteredGallery.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
          );
        } else if (order === "oldest") {
          filteredGallery
            .sort(
              (a, b) =>
                new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
            )
            .reverse();
        }

        console.log(payload.order)

        return {
          ...state,
          galleries: [...filteredGallery],
          filters: { ...payload, order: payload.order },
        };
      }
    case CREATE_GALLERY: // Post
      return {
        ...state,
        allGalleries: [payload, state.allGalleries],
        galleries: [payload, state.galleries],
      };
    case EDIT_GALLERY_FORM: // Edit or create form
      return { ...state, edit: payload };
    case EDIT_GALLERY: // Put
      const updatedAllGallery = state.allGalleries.find(
        (a) => a._id === payload._id
      );
      updatedAllGallery.titleMain = payload.titleMain;
      updatedAllGallery.category = payload.category;
      const updatedGallery = state.galleries.find((a) => a._id === payload._id);
      updatedGallery && (updatedGallery.titleMain = payload.titleMain);
      updatedGallery && (updatedGallery.category = payload.category);
      return {
        ...state,
      };
    case REMOVE_GALLERY: // Remove
      const removedAllGalleries = state.allGalleries.find(
        (gallery) => gallery._id === payload
      );
      removedAllGalleries.isDeleted = true;
      const removedGallery = state.galleries.find(
        (gallery) => gallery._id === payload
      );
      removedGallery && (removedGallery.isDeleted = true);
      const removedGalleries = state.galleries.filter(
        (gallery) => gallery._id !== payload
      );
      return { ...state, galleries: [...removedGalleries] };
    case REACTIVE_GALLERY: //Reactive
      const reactiveGalleries = state.allGalleries.find(
        (gallery) => gallery._id === payload
      );
      reactiveGalleries.isDeleted = false;
      const reactiveGallery = state.galleries.find(
        (gallery) => gallery._id === payload
      );
      reactiveGallery.isDeleted = false;
      return { ...state };
    case DELETE_GALLERY: // Delete
      const deletedAllGallery = state.allGalleries.filter(
        (gallery) => gallery.id !== payload
      );
      const deletedGallery = state.galleries.filter(
        (gallery) => gallery.id !== payload
      );
      return {
        ...state,
        allGalleries: [...deletedAllGallery],
        galleries: [...deletedGallery],
      };
    default:
      return state;
  }
}


export const selectGallery = (state) => state.galleries;
