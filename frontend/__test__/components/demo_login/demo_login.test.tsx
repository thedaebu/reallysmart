import React from "react";
import { cleanup, screen } from "@testing-library/react";
import * as reactRedux from "react-redux";
import { renderNonShowComponentWithoutUser, renderNonShowComponentWithUser } from "../../test_store_data";
import actionCable, { Cable } from "actioncable";
import App from "../../../components/app";

const useMockDispatch = jest.spyOn(reactRedux, "useDispatch");

const cable: Cable = actionCable.createConsumer(`ws://${window.location.hostname}:3000/cable`);
const cableApp: {"cable": Cable} = {"cable": cable};

describe("demo login", () => {
    describe("user irrelevant tests", () => {
        beforeEach(() => {
            renderNonShowComponentWithoutUser(<App cableApp={cableApp} />);
        });
        afterEach(() => {
            cleanup();
        });
        test("useDispatch is called", () => {
            expect(useMockDispatch).toHaveBeenCalled();
        });
    });
    describe("no user tests", () => {
        beforeEach(() => {
            renderNonShowComponentWithoutUser(<App cableApp={cableApp} />);
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
            renderNonShowComponentWithUser(<App cableApp={cableApp} />);
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