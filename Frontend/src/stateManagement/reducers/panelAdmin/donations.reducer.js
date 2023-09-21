import {
  DONATIONS,
  ONE_DONATION,
  CLEAR_ONE_DONATION,
  DONATIONS_FILTERS,
  REACTIVE_DONATION,
  REMOVE_DONATION,
  DELETE_DONATION,
} from "../../types/panelAdmin";

const initialState = {
  allDonations: [],
  donations: [],
  idDonation: null,
  filters: {
    status: "active",
    order: "latest",
    iso: "all",
    search: false,
  },
};

export default function donationsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case DONATIONS: // Get
      return { ...state, allDonations: [...payload], donations: [...payload] };
    case ONE_DONATION: //Get ID
      return { ...state, idDonation: payload };
    case CLEAR_ONE_DONATION: //Clear get ID
      return { ...state, idDonation: null };
    case DONATIONS_FILTERS: // Filters
      const { status, iso, order, search } = payload;
      let filteredDonations = [...state.allDonations];

      if (status === "active") {
        filteredDonations = filteredDonations.filter(
          (a) => a["isDeleted"] === false
        );
      } else if (status === "inactive") {
        filteredDonations = filteredDonations.filter(
          (a) => a["isDeleted"] === true
        );
      }

      if (search) {
        filteredDonations = filteredDonations.filter((a) => {
          return a["_id"].includes(search) || a["amount"].includes(search);
        });
      }

      if (iso !== "all") {
        if (iso === "ARS") {
          filteredDonations = filteredDonations.filter(
            (a) => a["iso"] === "ARS"
          );
        } else if (iso === "USD") {
          filteredDonations = filteredDonations.filter(
            (a) => a["iso"] === "USD"
          );
        }
      }

      if (order === "higher") {
        filteredDonations.sort((a, b) => a.amount - b.amount).reverse();
      } else if (order === "lower") {
        filteredDonations.sort((a, b) => a.amount - b.amount);
      } else if (order === "latest") {
        filteredDonations.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
        );
      } else if (order === "oldest") {
        filteredDonations
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
          )
          .reverse();
      }

      return {
        ...state,
        donations: [...filteredDonations],
        filters: { ...payload },
      };
    case REMOVE_DONATION: // Remove
      const removedAllDonations = state.allDonations.find(
        (donation) => donation._id === payload
      );
      removedAllDonations.isDeleted = true;
      const removedDonation = state.donations.find(
        (donation) => donation._id === payload
      );
      removedDonation && (removedDonation.isDeleted = true);
      const removedDonations = state.donations.filter(
        (donation) => donation._id !== payload
      );
      return { ...state, donations: [...removedDonations] };
    case REACTIVE_DONATION: //Reactive
      const reactiveDonations = state.allDonations.find(
        (donation) => donation._id === payload
      );
      reactiveDonations.isDeleted = false;
      const reactiveNew = state.donations.find(
        (donation) => donation._id === payload
      );
      reactiveNew.isDeleted = false;
      const reactiveDonation = state.donations.filter(
        (donation) => donation._id !== payload
      );
      return { ...state, donations: [...reactiveDonation] };
    case DELETE_DONATION: // Delete
      const deletedAllDonations = state.allDonations.filter(
        (donation) => donation.id !== payload
      );
      const deletedDonations = state.donations.filter(
        (donation) => donation.id !== payload
      );
      return {
        ...state,
        allDonations: [...deletedAllDonations],
        donations: [...deletedDonations],
      };
    default:
      return state;
  }
}
