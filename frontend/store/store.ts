import { applyMiddleware, createStore, Middleware } from "redux";
import thunk from "redux-thunk";
import { State } from "../my_types";
import rootReducer from "../reducers/root_reducer";

const middlewares: Array<Middleware> = [thunk];

if (process.env.NODE_ENV !== "production") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

function configureStore(preloadedState: State | {} = {}) {
    return createStore(rootReducer, preloadedState, applyMiddleware(...middlewares));
};

export default configureStore;