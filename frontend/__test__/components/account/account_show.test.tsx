import React from "react";
import * as reactRedux from "react-redux";
import { cleanup, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as AccountActions from "../../../actions/account_actions";
import * as SessionActions from "../../../actions/session_actions";
import { renderNonShowComponentWithUser, testAccountData } from "../../test_store_data";
import AccountShow from "../../../components/account/account_show";

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
            const accountShowMain = screen.queryByTestId("account-show__main");
            expect(accountShowMain).toHaveTextContent("Profile");
            expect(accountShowMain).not.toHaveTextContent("Annotations");
            expect(accountShowMain).not.toHaveTextContent("Comments");
        });
        describe("header", () => {
            test("displays current user's username", () => {
                const accountShowHeader = screen.queryByTestId("account-show-header");
                expect(accountShowHeader).toHaveTextContent("reallysmart");
            });
        });
        describe("profile", () => {
            describe("username update", () => {
                test("displays 'Please type password.' error when password value is empty", () => {
                    const accountShowMain = screen.queryByTestId("account-show__main");
                    const submitButton = within(accountShowMain).queryByTestId("account-show-profile__username-submit");
                    userEvent.click(submitButton);
                    const errors = within(accountShowMain).queryByTestId("account-show-profile__errors");
                    expect(errors).toHaveTextContent("Please type password.");
                });
                test("displays 'Passwords do not match.' error when password and confirmed password values do not match", () => {
                    const accountShowMain = screen.queryByTestId("account-show__main");
                    const password = within(accountShowMain).queryByTestId("account-show-profile__password");
                    userEvent.type(password, "password");
                    const submitButton = within(accountShowMain).queryByTestId("account-show-profile__username-submit");
                    userEvent.click(submitButton);
                    const errors = within(accountShowMain).queryByTestId("account-show-profile__errors");
                    expect(errors).toHaveTextContent("Passwords do not match.");
                });
                test("displays 'Please type new username.' error when new username value is empty", () => {
                    const accountShowMain = screen.queryByTestId("account-show__main");
                    const password = within(accountShowMain).queryByTestId("account-show-profile__password");
                    userEvent.type(password, "password");
                    const confirmedPassword = within(accountShowMain).queryByTestId("account-show-profile__confirmed-password");
                    userEvent.type(confirmedPassword, "password");
                    const submitButton = within(accountShowMain).queryByTestId("account-show-profile__username-submit");
                    userEvent.click(submitButton);
                    const errors = within(accountShowMain).queryByTestId("account-show-profile__errors");
                    expect(errors).toHaveTextContent("Please type new username.");
                });
                test("calls updateUser when all field values are valid", () => {
                    const accountShowMain = screen.queryByTestId("account-show__main");
                    const password = within(accountShowMain).queryByTestId("account-show-profile__password");
                    userEvent.type(password, "password");
                    const confirmedPassword = within(accountShowMain).queryByTestId("account-show-profile__confirmed-password");
                    userEvent.type(confirmedPassword, "password");
                    const newUsername = within(accountShowMain).queryByTestId("account-show-profile__new-username");
                    userEvent.type(newUsername, "newusername");
                    const submitButton = within(accountShowMain).queryByTestId("account-show-profile__username-submit");
                    userEvent.click(submitButton);
                    expect(useUpdateUser).toHaveBeenCalled();
                });
            });
            describe("password update", () => {
                test("displays 'Please type old password.' error when old password value is empty", () => {
                    const accountShowMain = screen.queryByTestId("account-show__main");
                    const submitButton = within(accountShowMain).queryByTestId("account-show-profile__password-submit");
                    userEvent.click(submitButton);
                    const errors = within(accountShowMain).queryByTestId("account-show-profile__errors");
                    expect(errors).toHaveTextContent("Please type old password.");
                });
                test("displays 'Old passwords do not match.' error when old password and confirmed old password values do not match", () => {
                    const accountShowMain = screen.queryByTestId("account-show__main");
                    const oldPassword = within(accountShowMain).queryByTestId("account-show-profile__old-password");
                    userEvent.type(oldPassword, "oldpassword");
                    const submitButton = within(accountShowMain).queryByTestId("account-show-profile__password-submit");
                    userEvent.click(submitButton);
                    const errors = within(accountShowMain).queryByTestId("account-show-profile__errors");
                    expect(errors).toHaveTextContent("Old passwords do not match.");
                });
                test("displays 'Please type new password.' error when new password value is empty", () => {
                    const accountShowMain = screen.queryByTestId("account-show__main");
                    const oldPassword = within(accountShowMain).queryByTestId("account-show-profile__old-password");
                    userEvent.type(oldPassword, "oldpassword");
                    const confirmedOldPassword = screen.queryByTestId("account-show-profile__confirmed-old-password");
                    userEvent.type(confirmedOldPassword, "oldpassword");
                    const submitButton = within(accountShowMain).queryByTestId("account-show-profile__password-submit");
                    userEvent.click(submitButton);
                    const errors = within(accountShowMain).queryByTestId("account-show-profile__errors");
                    expect(errors).toHaveTextContent("Please type new password.");
                });
                test("displays 'New passwords do not match.' error when new password and confirmed new password values do not match", () => {
                    const accountShowMain = screen.queryByTestId("account-show__main");
                    const oldPassword = within(accountShowMain).queryByTestId("account-show-profile__old-password");
                    userEvent.type(oldPassword, "oldpassword");
                    const confirmedOldPassword = screen.queryByTestId("account-show-profile__confirmed-old-password");
                    userEvent.type(confirmedOldPassword, "oldpassword");
                    const newPassword = screen.queryByTestId("account-show-profile__new-password");
                    userEvent.type(newPassword, "newpassword");
                    const submitButton = within(accountShowMain).queryByTestId("account-show-profile__password-submit");
                    userEvent.click(submitButton);
                    const errors = within(accountShowMain).queryByTestId("account-show-profile__errors");
                    expect(errors).toHaveTextContent("New passwords do not match.");
                });
                test("calls updateUser when all field values are valid", () => {
                    const accountShowMain = screen.queryByTestId("account-show__main");
                    const oldPassword = within(accountShowMain).queryByTestId("account-show-profile__old-password");
                    userEvent.type(oldPassword, "oldpassword");
                    const confirmedOldPassword = screen.queryByTestId("account-show-profile__confirmed-old-password");
                    userEvent.type(confirmedOldPassword, "oldpassword");
                    const newPassword = screen.queryByTestId("account-show-profile__new-password");
                    userEvent.type(newPassword, "newpassword");
                    const confirmedNewPassword = screen.queryByTestId("account-show-profile__confirmed-new-password");
                    userEvent.type(confirmedNewPassword, "newpassword");
                    const submitButton = within(accountShowMain).queryByTestId("account-show-profile__password-submit");
                    userEvent.click(submitButton);
                    expect(useUpdateUser).toHaveBeenCalled();
                });
            });
        });
        describe("annotations", () => {
            const annotations = testAccountData.annotations;
            test("displays the correct number of annotations", () => {
                const accountAnnotationsTab = screen.queryByTestId("account-tabdisplay-item__Annotations");
                userEvent.click(accountAnnotationsTab);
                const accountShowItems = screen.queryAllByTestId("account-show__item");
                expect(annotations.length).toEqual(accountShowItems.length);
            });
            test("displays the correct body", () => {
                const accountAnnotationsTab = screen.queryByTestId("account-tabdisplay-item__Annotations");
                userEvent.click(accountAnnotationsTab);
                const accountShowItems = screen.queryAllByTestId("account-show__item");
                annotations.forEach((annotation, idx) => {
                    expect(accountShowItems[idx]).toHaveTextContent(annotation.body);
                });
            });
            test("displays the correct number of votes", () => {
                const accountAnnotationsTab = screen.queryByTestId("account-tabdisplay-item__Annotations");
                userEvent.click(accountAnnotationsTab);
                const accountShowItems = screen.queryAllByTestId("account-show__item");
                annotations.forEach((annotation, idx) => {
                    expect(accountShowItems[idx]).toHaveTextContent(`+${annotation.votes}`);
                });
            });
            test("contains a link element that goes to the proper track page", () => {
                const accountAnnotationsTab = screen.queryByTestId("account-tabdisplay-item__Annotations");
                userEvent.click(accountAnnotationsTab);
                const accountShowItems = screen.queryAllByTestId("account-show__item");
                userEvent.click(within(accountShowItems[0]).queryByTestId("account-show__item-link"));
                const pathName = global.window.location.pathname;
                expect(pathName).toEqual("/tracks/niki__selene");
            });
            test("displays the correct date", () => {
                const accountAnnotationsTab = screen.queryByTestId("account-tabdisplay-item__Annotations");
                userEvent.click(accountAnnotationsTab);
                const accountShowItems = screen.queryAllByTestId("account-show__item");
                expect(accountShowItems[0]).toHaveTextContent("2022-04-09");
            });
        });
        describe("comments", () => {
            const comments = testAccountData.comments;
            test("displays the correct number of Comments", () => {
                const accountCommentsTab = screen.queryByTestId("account-tabdisplay-item__Comments");
                userEvent.click(accountCommentsTab);
                const accountShowItems = screen.queryAllByTestId("account-show__item");
                expect(comments.length).toEqual(accountShowItems.length);
            });
            test("displays the correct body", () => {
                const accountCommentsTab = screen.queryByTestId("account-tabdisplay-item__Comments");
                userEvent.click(accountCommentsTab);
                const accountShowItems = screen.queryAllByTestId("account-show__item");
                comments.forEach((comment, idx) => {
                    expect(accountShowItems[idx]).toHaveTextContent(comment.body);
                });
            });
            test("displays the correct number of votes", () => {
                const accountCommentsTab = screen.queryByTestId("account-tabdisplay-item__Comments");
                userEvent.click(accountCommentsTab);
                const accountShowItems = screen.queryAllByTestId("account-show__item");
                comments.forEach((comment, idx) => {
                    expect(accountShowItems[idx]).toHaveTextContent(`+${comment.votes}`);
                });
            });
            test("contains a link element that goes to the proper track page", () => {
                const accountCommentsTab = screen.queryByTestId("account-tabdisplay-item__Comments");
                userEvent.click(accountCommentsTab);
                const accountShowItems = screen.queryAllByTestId("account-show__item");
                userEvent.click(within(accountShowItems[0]).queryByTestId("account-show__item-link"));
                const pathName = global.window.location.pathname;
                expect(pathName).toEqual("/tracks/niki__selene");
            });
            test("displays the correct date", () => {
                const accountCommentsTab = screen.queryByTestId("account-tabdisplay-item__Comments");
                userEvent.click(accountCommentsTab);
                const accountShowItems = screen.queryAllByTestId("account-show__item");
                expect(accountShowItems[0]).toHaveTextContent("2022-04-09");
            });
        });
    });
});