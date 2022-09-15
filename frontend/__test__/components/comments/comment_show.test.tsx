import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TrackShow from "../../../components/tracks/track_show";
import { testMatch, testShowStoreWithoutUser, testShowStoreWithUser } from "../../test_store_data";
import { Store } from "../../../store/store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testStoreWithoutUser: any = mockStore(testShowStoreWithoutUser);
const testStoreWithUser: any = mockStore(testShowStoreWithUser);

function renderComponent(store: Store) {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <TrackShow history={undefined} location={undefined} match={testMatch} />
            </Provider>
        </BrowserRouter>
    );
}

describe("comment show", () => {
    describe("user irrelevant tests", () => {
        beforeEach(() => {
            renderComponent(testStoreWithoutUser);
        });
        afterEach(() => {
            cleanup();
        });
    
        test("contains the commenter username and the body of the comment", () => {
            const commentShow = screen.queryByTestId("comment-show");
            const commentShowItem = within(commentShow).queryAllByTestId("comment-show-item")[0];
            expect(commentShowItem).toHaveTextContent("This is one of my new favorite songs now.");
            expect(commentShowItem).toHaveTextContent("reallysmart");
        });
        describe("comments for track", () => {
            test("contains the correct amount of comments for the track", () => {
                const commentShow = screen.queryByTestId("comment-show");
                const commentShowItems = within(commentShow).queryAllByTestId("comment-show-item");
                expect(commentShowItems.length).toEqual(2);
            });
            test("contains correct comments for track", () => {
                const commentShow = screen.queryByTestId("comment-show");
                const commentShowItem1 = within(commentShow).queryAllByTestId("comment-show-item")[0];
                expect(commentShowItem1).toHaveTextContent("This is one of my new favorite songs now.");
                const commentShowItem2 = within(commentShow).queryAllByTestId("comment-show-item")[1];
                expect(commentShowItem2).toHaveTextContent("I wonder what these lyrics mean.");
            });
        });
        describe("comments for annotation", () => {
            test("contains the correct amount of comments for the annotation", () => {
                const annotatedSection = screen.queryAllByTestId("lyrics__is-annotation")[0];
                userEvent.click(annotatedSection);
                const annotationShow = screen.queryByTestId("annotation-show");
                const commentShowItems = within(annotationShow).queryAllByTestId("comment-show-item");
                expect(commentShowItems.length).toEqual(1);
            });
            test("contains correct comments for the annotation", () => {
                const annotatedSection = screen.queryAllByTestId("lyrics__is-annotation")[0];
                userEvent.click(annotatedSection);
                const annotationShow = screen.queryByTestId("annotation-show");
                const commentShowItems = within(annotationShow).queryAllByTestId("comment-show-item");
                expect(commentShowItems.length).toEqual(1);
                const commentShowItem = within(annotationShow).queryAllByTestId("comment-show-item")[0];
                expect(commentShowItem).toHaveTextContent("OOOOOHHHHHHH! Now I get it.");
            });
        });
        test("contains votes show component", () => {
            const lyrics = screen.queryByTestId("lyrics__main");
            const commentShowItem = within(lyrics).queryAllByTestId("comment-show-item")[0];
            const voteShow = within(commentShowItem).queryByTestId("vote-show");
            expect(voteShow).toBeInTheDocument();
        });
    });
    describe("no user tests", () => {
        beforeEach(() => {
            renderComponent(testStoreWithoutUser);
        });
        afterEach(() => {
            cleanup();
        });

        test("contains only the options to sign up and log in and does not contain the comment creation prompt", () => {
            const commentShow = screen.queryByTestId("comment-show");
            const commentShowSession = within(commentShow).queryByTestId("comment-show__session");
            expect(commentShowSession).toHaveTextContent("Sign Up");
            expect(commentShowSession).toHaveTextContent("Log In");
            const commentShowBegin = within(commentShow).queryByTestId("comment-show__begin");
            expect(commentShowBegin).toBeFalsy();
        });
        test("does not contain the options to edit and delete any created comment", () => {
            const commentShow = screen.queryByTestId("comment-show");
            const commentShowItems = within(commentShow).queryAllByTestId("comment-show-item");
            for (let commentShowItem of commentShowItems) {
                const editButton = within(commentShowItem).queryByTestId("comment-show-item__edit");
                const deleteButton = within(commentShowItem).queryByTestId("comment-show-item__delete");
                expect(editButton).toBeFalsy();
                expect(deleteButton).toBeFalsy();
            }
        });
    });
    describe("current user tests", () => {
        beforeEach(() => {
            renderComponent(testStoreWithUser);
        });
        afterEach(() => {
            cleanup();
        });

        test("shows text area for comment creation after the 'Add a comment' box is clicked on", () => {
            const commentShow = screen.queryByTestId("comment-show");
            const commentShowBeginText = within(commentShow).queryByTestId("comment-show__begin-text");
            expect(commentShowBeginText).toBeTruthy();
            userEvent.click(commentShowBeginText);
            const commentShowForm = within(commentShow).queryByTestId("comment-show-form");
            expect(commentShowForm).toBeTruthy();
            expect(commentShowBeginText.tagName).toBe("TEXTAREA");
        });
        test("shows what is typed in it by user", () => {
            const commentShow = screen.queryByTestId("comment-show");
            const commentShowBeginText = within(commentShow).queryByTestId("comment-show__begin-text");
            userEvent.click(commentShowBeginText);
            const commentShowForm = within(commentShow).queryByTestId("comment-show-form");
            const commentShowFormText = within(commentShowForm).queryByTestId("comment-show-form__text")
            userEvent.type(commentShowFormText, "test");
            expect(commentShowFormText).toHaveValue("test");
        });
        test("returns to previous option after the 'Cancel' button is clicked on", () => {
            const commentShow = screen.queryByTestId("comment-show");
            let commentShowBeginText = within(commentShow).queryByTestId("comment-show__begin-text");
            userEvent.click(commentShowBeginText);
            let commentShowForm = within(commentShow).queryByTestId("comment-show-form");
            expect(commentShowForm).toBeTruthy();
            const commentShowFormCancel = within(commentShowForm).queryByTestId("comment-show-form__cancel");
            userEvent.click(commentShowFormCancel);
            commentShowBeginText = within(commentShow).queryByTestId("comment-show__begin-text");
            expect(commentShowBeginText).toBeTruthy();
            commentShowForm = within(commentShow).queryByTestId("comment-show-form");
            expect(commentShowForm).toBeFalsy();
        });
        test("does not contain the options to edit and delete the comment if the current user did not create the comment", () => {
            const commentShow = screen.queryByTestId("comment-show");
            const commentShowItem2 = within(commentShow).queryAllByTestId("comment-show-item")[1];
            const editButton = within(commentShowItem2).queryByTestId("comment-show-item__edit");
            const deleteButton = within(commentShowItem2).queryByTestId("comment-show-item__delete");
            expect(editButton).toBeFalsy();
            expect(deleteButton).toBeFalsy();
        });
        test("contains the options to edit and delete the comment if the current user created the comment", () => {
            const commentShow = screen.queryByTestId("comment-show");
            const commentShowItem1 = within(commentShow).queryAllByTestId("comment-show-item")[0];
            const editButton = within(commentShowItem1).queryByTestId("comment-show-item__edit");
            const deleteButton = within(commentShowItem1).queryByTestId("comment-show-item__delete");
            expect(editButton).toBeTruthy();
            expect(deleteButton).toBeTruthy();
        });
        describe("edit option", () => {
            test("contains the comment text in the text area and changes the value when typed in after the 'Edit' button is clicked on", () => {
                const { body } = testShowStoreWithUser.entities.comments[1];
                const commentShow = screen.queryByTestId("comment-show");
                const commentShowItem1 = within(commentShow).queryAllByTestId("comment-show-item")[0];
                const editButton = within(commentShowItem1).queryByTestId("comment-show-item__edit");
                userEvent.click(editButton);
                const commentShowForm = within(commentShow).queryByTestId("comment-show-form");
                const commentShowFormText = within(commentShowForm).queryByTestId("comment-show-form__text");
                expect(commentShowFormText).toHaveValue(body);
                userEvent.type(commentShowFormText, "test");
                expect(commentShowFormText).toHaveValue(`${body}test`);
            });
            test("returns to previous options after the 'Cancel' button is clicked on", () => {
                const commentShow = screen.queryByTestId("comment-show");
                const commentShowItem1 = within(commentShow).queryAllByTestId("comment-show-item")[0];
                let editButton = within(commentShowItem1).queryByTestId("comment-show-item__edit");
                userEvent.click(editButton);
                let commentShowForm = within(commentShow).queryByTestId("comment-show-form");
                expect(commentShowForm).toBeTruthy();
                const cancelButton = within(commentShowForm).queryByTestId("comment-show-form__cancel");
                userEvent.click(cancelButton);
                commentShowForm = within(commentShow).queryByTestId("comment-show-form");
                expect(commentShowForm).toBeFalsy();
            });
        });
        describe("delete option", () => {
            test("prompts 'Are you sure?' question with 'Yes' and 'No' options after the 'Delete' button is clicked on", () => {
                const commentShow = screen.queryByTestId("comment-show");
                const commentShowItem1 = within(commentShow).queryAllByTestId("comment-show-item")[0];
                const deleteButton = within(commentShowItem1).queryByTestId("comment-show-item__delete");
                userEvent.click(deleteButton);
                const commentShowItemButtons = within(commentShow).queryByTestId("comment-show-item__buttons");
                expect(commentShowItemButtons).toHaveTextContent("Are you sure?");
                expect(commentShowItemButtons).toHaveTextContent("Yes");
                expect(commentShowItemButtons).toHaveTextContent("No");
            });
            test("returns to previous options after the 'No' button is clicked on", () => {
                const commentShow = screen.queryByTestId("comment-show");
                let commentShowItem1 = within(commentShow).queryAllByTestId("comment-show-item")[0];
                const deleteButton = within(commentShowItem1).queryByTestId("comment-show-item__delete");
                userEvent.click(deleteButton);
                let commentShowItemButtons = within(commentShow).queryByTestId("comment-show-item__buttons");
                expect(commentShowItemButtons).toBeTruthy();
                const commentShowItemDelete = within(commentShowItemButtons).queryByTestId("comment-show-item__delete");
                userEvent.click(commentShowItemDelete);
                commentShowItemButtons = within(commentShow).queryByTestId("comment-show-item__buttons");
                expect(commentShowItemButtons).toBeFalsy();
            });
        });
    });
});