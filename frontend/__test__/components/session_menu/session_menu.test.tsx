import React from "react";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reactRedux from "react-redux";
import { renderNonShowComponentWithoutUser, renderNonShowComponentWithUser } from "../../test_store_data";
import SessionMenu from "../../../components/session_menu/SessionMenu";

const useMockDispatch = jest.spyOn(reactRedux, "useDispatch");
const useMockSelector = jest.spyOn(reactRedux, "useSelector");

describe("session menu", () => {
    describe("user irrelevant tests", () => {
        beforeEach(() => {
            renderNonShowComponentWithoutUser(<SessionMenu />);
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
            renderNonShowComponentWithoutUser(<SessionMenu />);
        });
        afterEach(() => {
            cleanup();
        });
        describe("sign up", () => {
            test("contains link to signup form page", () => {
                const signupLink = screen.queryByTestId("session-menu__signup");
                expect(signupLink).toBeInTheDocument();
            });
            test("proceeds to signup form page when signup link is clicked", () => {
                const signupLink = screen.queryByTestId("session-menu__signup");
                userEvent.click(signupLink);
                const pathName = global.window.location.pathname;
                expect(pathName).toEqual("/signup");
            });
        });
        describe("log in", () => {
            test("contains link to log in form page", () => {
                const loginLink = screen.queryByTestId("session-menu__login");
                expect(loginLink).toBeInTheDocument();
            });
            test("proceeds to login form page when log in link is clicked", () => {
                const loginLink = screen.queryByTestId("session-menu__login");
                userEvent.click(loginLink);
                const pathName = global.window.location.pathname;
                expect(pathName).toEqual("/login");
            });
        });
        test("does not contain option to access account page", () => {
            const accountLink = screen.queryByTestId("session-menu__account");
            expect(accountLink).not.toBeInTheDocument();
        });
        test("does not contain option to log out", () => {
            const logOutLink = screen.queryByTestId("session-menu__logout");
            expect(logOutLink).not.toBeInTheDocument();
        });
    });
    describe("current user tests", () => {
        beforeEach(() => {
            renderNonShowComponentWithUser(<SessionMenu />);
        });
        afterEach(() => {
            cleanup();
        });
        describe("account", () => {
            test("contains option to access account page", () => {
                const accountLink = screen.queryByTestId("session-menu__account");
                expect(accountLink).toBeInTheDocument();
            });
            test("proceeds to account page when account link is clicked", () => {
                const accountLink = screen.queryByTestId("session-menu__account");
                userEvent.click(accountLink);
                const pathName = global.window.location.pathname;
                expect(pathName).toEqual("/account");
            });
        });
        describe("log out", () => {
            test("contains option to log out", () => {
                const logOutLink = screen.queryByTestId("session-menu__logout");
                expect(logOutLink).toBeInTheDocument();
            });
        });
        test("does not contain option to sign up", () => {
            const signupLink = screen.queryByTestId("session-menu__signup");
            expect(signupLink).not.toBeInTheDocument();
        });
        test("does not contain option to log in", () => {
            const loginLink = screen.queryByTestId("session-menu__login");
            expect(loginLink).not.toBeInTheDocument();
        });
    });
});