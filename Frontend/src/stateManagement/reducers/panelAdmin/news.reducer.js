import {
  NEWS,
  NEW_DETAIL,
  NEWS_FILTERS,
  CREATE_NEW,
  EDIT_NEW,
  REMOVE_NEW,
  DELETE_NEW,
  CLEAR_NEW_DETAIL,
  REACTIVE_NEW,
  EDIT_NEW_FORM,
} from "../../types/panelAdmin";

const initialState = {
  allNews: [],
  news: [],
  newDetail: {},
  idNewDetail: null,
  edit: false,
  filters: {
    status: "active",
    order: "latest",
    category: "all",
    search: false,
  },
};

export default function newsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NEWS: // Get
      return { ...state, allNews: [...payload], news: [...payload] };
    case NEW_DETAIL: // Get ID
      return { ...state, newDetail: { ...payload }, idNewDetail: payload._id };
    case CLEAR_NEW_DETAIL: // Clear get ID
      return { ...state, newDetail: {} };
    case NEWS_FILTERS: // Filters
      const { status, order, category, search } = payload;
      let filteredNews = [...state.allNews];

      if (status === "active") {
        filteredNews = filteredNews.filter((a) => a["isDeleted"] === false);
      } else if (status === "inactive") {
        filteredNews = filteredNews.filter((a) => a["isDeleted"] === true);
      }

      if (search) {
        filteredNews = filteredNews.filter((a) => {
          const searchLowerCase = search.toLowerCase();
          const titleMain = a["titleMain"].toLowerCase();
          return (
            a["_id"].includes(searchLowerCase) ||
            titleMain.includes(searchLowerCase)
          );
        });
      }

      if (category !== "all") {
        filteredNews = filteredNews.filter((a) => a["category"] === category);
      }

      if (order === "a-z") {
        filteredNews.sort((a, b) => a.titleMain.localeCompare(b.titleMain));
      } else if (order === "z-a") {
        filteredNews
          .sort((a, b) => a.titleMain.localeCompare(b.titleMain))
          .reverse();
      } else if (order === "latest") {
        filteredNews.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
        );
      } else if (order === "oldest") {
        filteredNews
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
          )
          .reverse();
      }

      return { ...state, news: [...filteredNews], filters: { ...payload } };
    case CREATE_NEW: // Post
      return {
        ...state,
        allNews: [payload, ...state.allNews],
        news: [payload, ...state.news],
      };
    case EDIT_NEW_FORM: // Edit or create form
      return { ...state, edit: payload };
    case EDIT_NEW: // Put
      const updatedAllNews = state.allNews.find(
        (oneNew) => oneNew._id === payload._id
      );
      updatedAllNews.titleMain = payload.titleMain;
      updatedAllNews.category = payload.category;
      const updatedNews = state.news.find(
        (oneNew) => oneNew._id === payload._id
      );
      updatedNews && (updatedNews.titleMain = payload.titleMain);
      updatedNews && (updatedNews.category = payload.category);
      return {
        ...state,
      };
    case REMOVE_NEW: // Remove
      const removedAllNew = state.allNews.find(
        (oneNew) => oneNew._id === payload
      );
      removedAllNew.isDeleted = true;
      const removedNew = state.news.find((oneNew) => oneNew._id === payload);
      removedNew && (removedNew.isDeleted = true);
      const removedNews = state.news.filter((oneNew) => oneNew._id !== payload);
      return { ...state, news: [...removedNews] };
    case REACTIVE_NEW: //Reactive
      const reactiveNews = state.allNews.find(
        (oneNew) => oneNew._id === payload
      );
      reactiveNews.isDeleted = false;
      const reactiveNew = state.news.find((oneNew) => oneNew._id === payload);
      reactiveNew.isDeleted = false;
      return { ...state };
    case DELETE_NEW: // Delete
      const deletedAllNews = state.allNews.filter(
        (oneNew) => oneNew._id !== payload
      );
      const deletedNews = state.news.filter((oneNew) => oneNew._id !== payload);
      return { ...state, allNews: [...deletedAllNews], news: [...deletedNews] };
    default:
      return state;
  }
}
