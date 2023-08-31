import { configureStore, Middleware } from "@reduxjs/toolkit";
import rootReducer from "../reducers/root_reducer";
import { User } from "../my_types";

function configureAppStore(preloadedState: { entities: { user: User; }; } | {} = {}) {
    const middleware: Array<Middleware> = [];
    // if (process.env.NODE_ENV === "development") {
    //     const { logger } = require("redux-logger");
    //     middleware.push(logger);
    // }

    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), ...middleware],
        preloadedState
    });
}

export type Store = ReturnType<typeof configureAppStore>;
export default configureAppStore;