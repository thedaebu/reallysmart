import React from "react";
import { cleanup, screen, within } from "@testing-library/react";
import actionCable, { Cable } from "actioncable";
import { renderNonShowComponentWithoutUser } from "../../test_store_data";
import App from "../../../components/app";

const cable: Cable = actionCable.createConsumer(`ws://${window.location.hostname}:3000/cable`);
const cableApp: { cable: Cable } = { cable };

describe("flash message", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.clearAllTimers();
    });
    test("does not display flash message initially", () => {
        renderNonShowComponentWithoutUser(<App cableApp={ cableApp } />);
        const flashMessage = screen.queryByTestId("flash-message")
        expect(flashMessage).not.toBeInTheDocument();
        cleanup();
    });
    test("displays flash message component with correct message when there is a message in the redux state", () => {
        renderNonShowComponentWithoutUser(<App cableApp={ cableApp } />, "Test Flash Message.");
        const flashMessage = screen.queryByTestId("flash-message");
        expect(flashMessage).toBeInTheDocument();
        const flashMessageMessage = within(flashMessage).queryByTestId("flash-message__message");
        expect(flashMessageMessage).toBeInTheDocument();
        expect(flashMessageMessage).toHaveTextContent("Test Flash Message.");
        cleanup();
    });
});