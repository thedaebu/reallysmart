import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as reactRedux from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import DemoLogin from "../../../components/demo_login/demo_login";
import { testShowStoreWithoutUser, testShowStoreWithUser } from "../../test_store_data";
import { Store } from "../../../store/store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testStoreWithoutUser: any = mockStore(testShowStoreWithoutUser);
const testStoreWithUser: any = mockStore(testShowStoreWithUser);

const useMockDispatch = jest.spyOn(reactRedux, "useDispatch");
const useMockSelector = jest.spyOn(reactRedux, "useSelector");

function renderComponent(store: Store) {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <DemoLogin />
            </Provider>
        </BrowserRouter>
    );
}

describe("demo login", () => {
    describe("user irrelevant tests", () => {
        beforeEach(() => {
            renderComponent(testStoreWithoutUser);
        });
        afterEach(() => {
            cleanup();
        });
        test("useDispatch is called", () => {
            expect(useMockDispatch).toHaveBeenCalled();
        });
        test("useSelector is called", () => {
            expect(useMockSelector).toHaveBeenCalled();
        });
    });
    describe("no user tests", () => {
        beforeEach(() => {
            renderComponent(testStoreWithoutUser);
        });
        afterEach(() => {
            cleanup();
        });
        test("contains option to use demo login", () => {
            const demoLoginButton = screen.queryByTestId("demo-login");
            expect(demoLoginButton).toBeInTheDocument();
        });
        test("contains the text 'DEMO'", () => {
            const demoLoginButton = screen.queryByTestId("demo-login");
            expect(demoLoginButton).toHaveTextContent("DEMO");
        });
    });
    describe("current user tests", () => {
        beforeEach(() => {
            renderComponent(testStoreWithUser);
        });
        afterEach(() => {
            cleanup();
        });
        test("does not contain option to use demo login", () => {
            const demoLoginButton = screen.queryByTestId("demo-login");
            expect(demoLoginButton).not.toBeInTheDocument();
        });
    });
});