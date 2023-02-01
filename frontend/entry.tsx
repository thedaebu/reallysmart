import React from "react";
import ReactDOM from "react-dom";
import configureAppStore, { Store } from "./store/store";
import Root from "./components/root";

document.addEventListener("DOMContentLoaded", () => {
    const store: Store = configureAppStore();

    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store} />, root);
});