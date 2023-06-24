import React from "react";
import * as reactRedux from "react-redux";
import { cleanup, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderNonShowComponentWithUser, testAccountData } from "../../test_store_data";
import * as AccountActions from "../../../actions/account_actions";
import * as SessionActions from "../../../actions/session_actions";
import AccountShow from "../../../components/account/AccountShow";

const useMockContext = jest.spyOn(React, "useContext");
const useMockDispatch = jest.spyOn(reactRedux, "useDispatch");
const useMockSelector = jest.spyOn(reactRedux, "useSelector");
const useMockState = jest.spyOn(React, "useState");
const useFetchAccount = jest.spyOn(AccountActions, "fetchAccount");
const useUpdateUser = jest.spyOn(SessionActions, "updateUser");

describe("account show", () => {
    beforeEach(() => {
        renderNonShowComponentWithUser(<AccountShow />);
    });
    afterEach(() => {
        cleanup();
    });

    test("useContext is called", () => {
        expect(useMockContext).toHaveBeenCalled();
    });
    test("useDispatch is called", () => {
        expect(useMockDispatch).toHaveBeenCalled();
    });
    test("useSelector is called", () => {
        expect(useMockSelector).toHaveBeenCalled();
    });
    test("useState is called", () => {
        expect(useMockState).toHaveBeenCalled();
    });
    test("fetchAccount is called", () => {
        expect(useFetchAccount).toHaveBeenCalled();
    });
    describe("account show display", () => {
        test("should display account profile tab initially", () => {
            const accountShowDisplay = screen.queryByTestId("account-show__display");
            expect(accountShowDisplay).toHaveTextContent("Profile");
            expect(accountShowDisplay).not.toHaveTextContent("Annotations");
            expect(accountShowDisplay).not.toHaveTextContent("Comments");
        });
        describe("header", () => {
            test("displays current user's username", () => {
                const accountHeader = screen.queryByTestId("account-header");
                expect(accountHeader).toHaveTextContent("reallysmart");
            });
        });
        describe("profile", () => {
            describe("username update", () => {
                test("displays 'Please type password.' error when password value is empty", () => {
                    const accountShowDisplay = screen.queryByTestId("account-show__display");
                    const submitButton = within(accountShowDisplay).queryByTestId("account-profile__username-submit");
                    userEvent.click(submitButton);
                    const errors = within(accountShowDisplay).queryByTestId("account-profile__errors");
                    expect(errors).toHaveTextContent("Please type password.");
                });
                test("displays 'Passwords do not match.' error when password and confirmed password values do not match", () => {
                    const accountShowDisplay = screen.queryByTestId("account-show__display");
                    const password = within(accountShowDisplay).queryByTestId("account-profile__password");
                    userEvent.type(password, "password");
                    const submitButton = within(accountShowDisplay).queryByTestId("account-profile__username-submit");
                    userEvent.click(submitButton);
                    const errors = within(accountShowDisplay).queryByTestId("account-profile__errors");
                    expect(errors).toHaveTextContent("Passwords do not match.");
                });
                test("displays 'Please type new username.' error when new username value is empty", () => {
                    const accountShowDisplay = screen.queryByTestId("account-show__display");
                    const password = within(accountShowDisplay).queryByTestId("account-profile__password");
                    userEvent.type(password, "password");
                    const confirmedPassword = within(accountShowDisplay).queryByTestId("account-profile__confirmed-password");
                    userEvent.type(confirmedPassword, "password");
                    const submitButton = within(accountShowDisplay).queryByTestId("account-profile__username-submit");
                    userEvent.click(submitButton);
                    const errors = within(accountShowDisplay).queryByTestId("account-profile__errors");
                    expect(errors).toHaveTextContent("Please type new username.");
                });
                test("calls updateUser when all field values are valid", () => {
                    const accountShowDisplay = screen.queryByTestId("account-show__display");
                    const password = within(accountShowDisplay).queryByTestId("account-profile__password");
                    userEvent.type(password, "password");
                    const confirmedPassword = within(accountShowDisplay).queryByTestId("account-profile__confirmed-password");
                    userEvent.type(confirmedPassword, "password");
                    const newUsername = within(accountShowDisplay).queryByTestId("account-profile__new-username");
                    userEvent.type(newUsername, "newusername");
                    const submitButton = within(accountShowDisplay).queryByTestId("account-profile__username-submit");
                    userEvent.click(submitButton);
                    expect(useUpdateUser).toHaveBeenCalled();
                });
            });
            describe("password update", () => {
                test("displays 'Please type old password.' error when old password value is empty", () => {
                    const accountShowDisplay = screen.queryByTestId("account-show__display");
                    const submitButton = within(accountShowDisplay).queryByTestId("account-profile__password-submit");
                    userEvent.click(submitButton);
                    const errors = within(accountShowDisplay).queryByTestId("account-profile__errors");
                    expect(errors).toHaveTextContent("Please type old password.");
                });
                test("displays 'Old passwords do not match.' error when old password and confirmed old password values do not match", () => {
                    const accountShowDisplay = screen.queryByTestId("account-show__display");
                    const oldPassword = within(accountShowDisplay).queryByTestId("account-profile__old-password");
                    userEvent.type(oldPassword, "oldpassword");
                    const submitButton = within(accountShowDisplay).queryByTestId("account-profile__password-submit");
                    userEvent.click(submitButton);
                    const errors = within(accountShowDisplay).queryByTestId("account-profile__errors");
                    expect(errors).toHaveTextContent("Old passwords do not match.");
                });
                test("displays 'Please type new password.' error when new password value is empty", () => {
                    const accountShowDisplay = screen.queryByTestId("account-show__display");
                    const oldPassword = within(accountShowDisplay).queryByTestId("account-profile__old-password");
                    userEvent.type(oldPassword, "oldpassword");
                    const confirmedOldPassword = screen.queryByTestId("account-profile__confirmed-old-password");
                    userEvent.type(confirmedOldPassword, "oldpassword");
                    const submitButton = within(accountShowDisplay).queryByTestId("account-profile__password-submit");
                    userEvent.click(submitButton);
                    const errors = within(accountShowDisplay).queryByTestId("account-profile__errors");
                    expect(errors).toHaveTextContent("Please type new password.");
                });
                test("displays 'New passwords do not match.' error when new password and confirmed new password values do not match", () => {
                    const accountShowDisplay = screen.queryByTestId("account-show__display");
                    const oldPassword = within(accountShowDisplay).queryByTestId("account-profile__old-password");
                    userEvent.type(oldPassword, "oldpassword");
                    const confirmedOldPassword = screen.queryByTestId("account-profile__confirmed-old-password");
                    userEvent.type(confirmedOldPassword, "oldpassword");
                    const newPassword = screen.queryByTestId("account-profile__new-password");
                    userEvent.type(newPassword, "newpassword");
                    const submitButton = within(accountShowDisplay).queryByTestId("account-profile__password-submit");
                    userEvent.click(submitButton);
                    const errors = within(accountShowDisplay).queryByTestId("account-profile__errors");
                    expect(errors).toHaveTextContent("New passwords do not match.");
                });
                test("calls updateUser when all field values are valid", () => {
                    const accountShowDisplay = screen.queryByTestId("account-show__display");
                    const oldPassword = within(accountShowDisplay).queryByTestId("account-profile__old-password");
                    userEvent.type(oldPassword, "oldpassword");
                    const confirmedOldPassword = screen.queryByTestId("account-profile__confirmed-old-password");
                    userEvent.type(confirmedOldPassword, "oldpassword");
                    const newPassword = screen.queryByTestId("account-profile__new-password");
                    userEvent.type(newPassword, "newpassword");
                    const confirmedNewPassword = screen.queryByTestId("account-profile__confirmed-new-password");
                    userEvent.type(confirmedNewPassword, "newpassword");
                    const submitButton = within(accountShowDisplay).queryByTestId("account-profile__password-submit");
                    userEvent.click(submitButton);
                    expect(useUpdateUser).toHaveBeenCalled();
                });
            });
        });
        describe("annotations", () => {
            const annotations = testAccountData.annotations;
            test("displays the correct number of annotations", () => {
                const accountAnnotationsTab = screen.queryByTestId("account-header__tablist-item--Annotations");
                userEvent.click(accountAnnotationsTab);
                const accountItems = screen.queryAllByTestId("account-item");
                expect(annotations.length).toEqual(accountItems.length);
            });
            test("displays the correct body", () => {
                const accountAnnotationsTab = screen.queryByTestId("account-header__tablist-item--Annotations");
                userEvent.click(accountAnnotationsTab);
                const accountItems = screen.queryAllByTestId("account-item");
                annotations.forEach((annotation, idx) => {
                    expect(accountItems[idx]).toHaveTextContent(annotation.body);
                });
            });
            test("displays the correct number of votes", () => {
                const accountAnnotationsTab = screen.queryByTestId("account-header__tablist-item--Annotations");
                userEvent.click(accountAnnotationsTab);
                const accountItems = screen.queryAllByTestId("account-item");
                annotations.forEach((annotation, idx) => {
                    expect(accountItems[idx]).toHaveTextContent(`+${annotation.votes}`);
                });
            });
            test("contains a link element that goes to the proper track page", () => {
                const accountAnnotationsTab = screen.queryByTestId("account-header__tablist-item--Annotations");
                userEvent.click(accountAnnotationsTab);
                const accountItems = screen.queryAllByTestId("account-item");
                userEvent.click(within(accountItems[0]).queryByTestId("account-item__link"));
                const pathName = global.window.location.pathname;
                expect(pathName).toEqual("/tracks/niki__selene");
            });
            test("displays the correct date", () => {
                const accountAnnotationsTab = screen.queryByTestId("account-header__tablist-item--Annotations");
                userEvent.click(accountAnnotationsTab);
                const accountItems = screen.queryAllByTestId("account-item");
                expect(accountItems[0]).toHaveTextContent("2022-04-09");
            });
        });
        describe("comments", () => {
            const comments = testAccountData.comments;
            test("displays the correct number of Comments", () => {
                const accountCommentsTab = screen.queryByTestId("account-header__tablist-item--Comments");
                userEvent.click(accountCommentsTab);
                const accountItems = screen.queryAllByTestId("account-item");
                expect(comments.length).toEqual(accountItems.length);
            });
            test("displays the correct body", () => {
                const accountCommentsTab = screen.queryByTestId("account-header__tablist-item--Comments");
                userEvent.click(accountCommentsTab);
                const accountItems = screen.queryAllByTestId("account-item");
                comments.forEach((comment, idx) => {
                    expect(accountItems[idx]).toHaveTextContent(comment.body);
                });
            });
            test("displays the correct number of votes", () => {
                const accountCommentsTab = screen.queryByTestId("account-header__tablist-item--Comments");
                userEvent.click(accountCommentsTab);
                const accountItems = screen.queryAllByTestId("account-item");
                comments.forEach((comment, idx) => {
                    expect(accountItems[idx]).toHaveTextContent(`+${comment.votes}`);
                });
            });
            test("contains a link element that goes to the proper track page", () => {
                const accountCommentsTab = screen.queryByTestId("account-header__tablist-item--Comments");
                userEvent.click(accountCommentsTab);
                const accountItems = screen.queryAllByTestId("account-item");
                userEvent.click(within(accountItems[0]).queryByTestId("account-item__link"));
                const pathName = global.window.location.pathname;
                expect(pathName).toEqual("/tracks/niki__selene");
            });
            test("displays the correct date", () => {
                const accountCommentsTab = screen.queryByTestId("account-header__tablist-item--Comments");
                userEvent.click(accountCommentsTab);
                const accountItems = screen.queryAllByTestId("account-item");
                expect(accountItems[0]).toHaveTextContent("2022-04-09");
            });
        });
    });
});