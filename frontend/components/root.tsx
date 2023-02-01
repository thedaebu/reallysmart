import React, { useState } from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { AnyAction, Store } from "redux";
import { ApolloProvider } from "@apollo/client";
import actionCable from "actioncable";
import graphQLClient from "../graphql_client/graphql_client";
import { ThemeContext } from "../contexts/theme_context";
import App from "./app";

function Root({ store }: { store: Store<any, AnyAction> }) {
    const cableApp: any = {};
    const cableName: string = process.env.NODE_ENV === "development"
        ? `ws://${window.location.hostname}:3000/cable`
        : "ws://https://reallysmart.onrender.com/cable";
    cableApp["cable"] = actionCable.createConsumer(cableName);

    const [theme, setTheme] = useState<"light" | "dark">(window.sessionStorage.theme ? window.sessionStorage.theme : "light");

    function changeTheme() {
        if (theme === "light") {
            setTheme("dark");
            window.sessionStorage.setItem("theme", "dark");
        } else {
            setTheme("light");
            window.sessionStorage.setItem("theme", "light");
        }
    }

    return (
        <Provider store={store}>
            <ApolloProvider client={graphQLClient}>
                <HashRouter>
                    <ThemeContext.Provider value={{changeTheme, theme}}>
                        <App cableApp={cableApp} />
                    </ThemeContext.Provider>
                </HashRouter>
            </ApolloProvider>
        </Provider>
    );
}

export default Root;