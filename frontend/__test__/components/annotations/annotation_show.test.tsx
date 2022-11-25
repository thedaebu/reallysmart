import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import TrackShow from "../../../components/tracks/track_show";
import { testShowStoreWithoutUser, testShowStoreWithUser } from "../../test_store_data";
import { Store } from "../../../store/store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testStoreWithoutUser: any = mockStore(testShowStoreWithoutUser);
const testStoreWithUser: any = mockStore(testShowStoreWithUser);

function renderComponent(store: Store) {
    render(
        <BrowserRouter>
            <MemoryRouter initialEntries={['tracks/niki__selene']}>
                <Provider store={store}>
                    <Route path='tracks/:trackName'>
                        <TrackShow/>
                    </Route>
                </Provider>
            </MemoryRouter>
        </BrowserRouter>
    );
}

describe("annotation show", () => {
    describe("user irrelevant tests", () => {
        beforeEach(() => {
            renderComponent(testStoreWithoutUser);
        });
        afterEach(() => {
            cleanup();
        });

        test("contains the about section when annotation is not clicked on", () => {
            const { title } = testShowStoreWithoutUser.entities.track;
            const annotationShow = screen.queryByTestId("annotation-show");
            expect(annotationShow).toHaveTextContent(`About "${title}"`);
        });
        test("contains the annotator username and annotation body when annotation is clicked on", () => {
            const { annotator_name, body } = testShowStoreWithoutUser.entities.annotations[1];
            const annotation = screen.queryAllByTestId("lyrics__is-annotation")[0];
            userEvent.click(annotation);
            const annotationShow = screen.queryByTestId("annotation-show");
            expect(annotationShow).toHaveTextContent(`${annotator_name}`);
            expect(annotationShow).toHaveTextContent(`${body}`);
        });
        test("contains comment show component when annotation is clicked on", () => {
            const annotation = screen.queryAllByTestId("lyrics__is-annotation")[0];
            userEvent.click(annotation);
            const annotationShow = screen.queryByTestId("annotation-show-item");
            const commentShowItem = within(annotationShow).queryAllByTestId("comment-show-item")[0];
            expect(commentShowItem).toBeInTheDocument();
        });
        test("contains votes show component when annotation is clicked on", () => {
            const annotation = screen.queryAllByTestId("lyrics__is-annotation")[0];
            userEvent.click(annotation);
            const annotationShow = screen.queryByTestId("annotation-show-item");
            const voteShow = within(annotationShow).queryAllByTestId("vote-show")[0];
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

        test("does not contain the options to edit and delete the annotation", () => {
            const annotation = screen.queryAllByTestId("lyrics__is-annotation")[0];
            userEvent.click(annotation);
            const annotationShowItem = screen.queryByTestId("annotation-show-item");
            const annotationEditButton = within(annotationShowItem).queryByTestId("annotation-show-item__edit");
            expect(annotationEditButton).toBeFalsy();
            const annotationDeleteButton = within(annotationShowItem).queryByTestId("annotation-show-item__delete");
            expect(annotationDeleteButton).toBeFalsy();
        });
    });
    describe("current user tests", () => {
        beforeEach(() => {
            renderComponent(testStoreWithUser);
        });
        afterEach(() => {
            cleanup();
        });

        test("does not contain the options to edit and delete the annotation if the current user did not create the annotation", () => {
            const annotation = screen.queryAllByTestId("lyrics__is-annotation")[1];
            userEvent.click(annotation);
            const annotationShowItem = screen.queryByTestId("annotation-show-item");
            const annotationEditButton = within(annotationShowItem).queryByTestId("annotation-show-item__edit");
            expect(annotationEditButton).toBeFalsy();
            const annotationDeleteButton = within(annotationShowItem).queryByTestId("annotation-show-item__delete");
            expect(annotationDeleteButton).toBeFalsy();
        });
        test("contains the options to edit and delete the annotation if the current user created the annotation", () => {
            const annotation = screen.queryAllByTestId("lyrics__is-annotation")[0];
            userEvent.click(annotation);
            const annotationShowItem = screen.queryByTestId("annotation-show-item");
            const annotationEditButton = within(annotationShowItem).queryByTestId("annotation-show-item__edit");
            expect(annotationEditButton).toBeInTheDocument();
            const annotationDeleteButton = within(annotationShowItem).queryByTestId("annotation-show-item__delete");
            expect(annotationDeleteButton).toBeInTheDocument();
        });
        describe("edit option", () => {
            test("contains the annotation text in the text area with 'Save' and 'Cancel' buttons when the 'Edit' button is clicked on", () => {
                const { body } = testShowStoreWithUser.entities.annotations[1];
                const annotation = screen.queryAllByTestId("lyrics__is-annotation")[0];
                userEvent.click(annotation);
                const annotationShowItem = screen.queryByTestId("annotation-show-item");
                const annotationEditButton = within(annotationShowItem).queryByTestId("annotation-show-item__edit");
                userEvent.click(annotationEditButton);
                const annotationShowForm = screen.queryByTestId("annotation-show-form");
                expect(annotationShowForm).toHaveTextContent(body);
                expect(annotationShowForm).toHaveTextContent("Save");
                expect(annotationShowForm).toHaveTextContent("Cancel");
            });
            test("returns to previous options when the 'Cancel' button is clicked on", () => {
                const annotation = screen.queryAllByTestId("lyrics__is-annotation")[0];
                userEvent.click(annotation);
                let annotationShowItem = screen.queryByTestId("annotation-show-item");
                let annotationEditButton = within(annotationShowItem).queryByTestId("annotation-show-item__edit");
                userEvent.click(annotationEditButton);
                annotationShowItem = screen.queryByTestId("annotation-show-item");
                expect(annotationShowItem).toBeFalsy();
                let annotationShowForm = screen.queryByTestId("annotation-show-form");
                const cancelButton = within(annotationShowForm).queryByTestId("annotation-show-form__bottom-cancel");
                userEvent.click(cancelButton);
                annotationShowForm = screen.queryByTestId("annotation-show-form");
                expect(annotationShowForm).toBeFalsy();
                annotationShowItem = screen.queryByTestId("annotation-show-item");
                annotationEditButton = within(annotationShowItem).queryByTestId("annotation-show-item__edit");
                expect(annotationEditButton).toBeInTheDocument();
                const annotationDeleteButton = within(annotationShowItem).queryByTestId("annotation-show-item__delete");
                expect(annotationDeleteButton).toBeInTheDocument();
            });
        });
        describe("delete option", () => {
            test("prompts 'Are you sure?' question with 'Yes' and 'No' options when the 'Delete' button is clicked on", () => {
                const annotation = screen.queryAllByTestId("lyrics__is-annotation")[0];
                userEvent.click(annotation);
                const annotationShowItem = screen.queryByTestId("annotation-show-item");
                const annotationDeleteButton = within(annotationShowItem).queryByTestId("annotation-show-item__delete");
                userEvent.click(annotationDeleteButton);
                const annotationShowItemQuestion = within(annotationShowItem).queryByTestId("annotation-show-item__question");
                expect(annotationShowItemQuestion).toHaveTextContent("Are you sure?");
                expect(annotationShowItem).toHaveTextContent("Yes");
                expect(annotationShowItem).toHaveTextContent("No");
            });
            test("returns to previous options when the 'No' button is clicked on", () => {
                const annotation = screen.queryAllByTestId("lyrics__is-annotation")[0];
                userEvent.click(annotation);
                let annotationShowItem = screen.queryByTestId("annotation-show-item");
                let annotationDeleteButton = within(annotationShowItem).queryByTestId("annotation-show-item__delete");
                userEvent.click(annotationDeleteButton);
                let annotationShowItemQuestion = within(annotationShowItem).queryByTestId("annotation-show-item__question");
                expect(annotationShowItemQuestion).toBeInTheDocument();
                const noButton = screen.queryByTestId("annotation-show-item__delete-no");
                userEvent.click(noButton);
                annotationShowItemQuestion = within(annotationShowItem).queryByTestId("annotation-show-item__question");
                expect(annotationShowItemQuestion).toBeFalsy();
                annotationShowItem = screen.queryByTestId("annotation-show-item");
                const annotationEditButton = within(annotationShowItem).queryByTestId("annotation-show-item__edit");
                expect(annotationEditButton).toBeInTheDocument();
                annotationDeleteButton = within(annotationShowItem).queryByTestId("annotation-show-item__delete");
                expect(annotationDeleteButton).toBeInTheDocument();
            });
        });
    });
});