import { createStore, applyMiddleware, compose } from "redux"; // Import 'compose' from Redux
import reduxThunk from "redux-thunk";
import reducer from "./reducers";

// Check if Redux DevTools Extension is installed and available in the browser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;
