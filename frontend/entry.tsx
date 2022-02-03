import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import { Window } from "./my_types";
import { Store } from "redux";

declare const window: Window

document.addEventListener("DOMContentLoaded", () => {
    let store: any;
    if (window.currentUser) {
        const preloadedState = {
          entities: {
            user: { [window.currentUser.id]: window.currentUser }
          },
          session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    const root = document.getElementById("root");
    ReactDOM.render(<Root store={ store } />, root);
});