import React from "react";
import ReactDOM from "react-dom";
import configureAppStore, { Store } from "./store/store";
import { PreloadedState, Window } from "./my_types";
import Root from "./components/root";

declare const window: Window;

document.addEventListener("DOMContentLoaded", () => {
    let store: Store;
    if (window.currentUser) {
        const preloadedState: PreloadedState = {
          entities: {
            user: { [window.currentUser.id]: window.currentUser }
          },
          session: { id: window.currentUser.id }
        };
        store = configureAppStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureAppStore();
    }

    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store} />, root);
});