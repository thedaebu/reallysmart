import React from "react";
import ReactDOM from "react-dom";
import configureAppStore, { Store } from "./store/store";
import Root from "./components/Root";
import { User, Window } from "./my_types";

declare const window: Window;

document.addEventListener("DOMContentLoaded", () => {
    let store: Store;
    if (window.currentUser) {
        const preloadedState: { entities: { user: User; }; } = {
          entities: {
            user: window.currentUser
          }
        };
        store = configureAppStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureAppStore();
    }

    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store} />, root);
});