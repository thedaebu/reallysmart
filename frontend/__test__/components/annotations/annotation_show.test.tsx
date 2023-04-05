import React from "react";
import { cleanup, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderShowComponentWithoutUser, renderShowComponentWithUser, testShowStoreWithoutUser, testShowStoreWithUser } from "../../test_store_data";
import TrackShow from "../../../components/tracks/track_show";

describe("annotation show", () => {
    describe("user irrelevant tests", () => {
        beforeEach(() => {
            renderShowComponentWithoutUser(<TrackShow />);
        });
        afterEach(() => {
            cleanup();
        });

        test("contains the about section when annotation is not clicked on", () => {
            const annotationShow = screen.queryByTestId("annotation-show");
            expect(annotationShow).toHaveTextContent("Highlight part of the lyrics to add an annotationClick on a highlighted section to show annotation");
        });
        test("contains the annotator username and annotation body when annotation is clicked on", () => {
            const { annotator_name, body } = testShowStoreWithoutUser.entities.annotations[1];
            const annotation = screen.queryAllByTestId("lyrics__is-annotation")[0];
            userEvent.click(annotation);
            const annotationShow = screen.queryByTestId("annotation-show");
            expect(annotationShow).toHaveTextContent(`${annotator_name}`);
            expect(annotationShow).toHaveTextContent(`${body}`);
        });
        describe("edited displays", () => {
            test("does not display edited info when never edited", () => {
                const annotation = screen.queryAllByTestId("lyrics__is-annotation")[0];
                userEvent.click(annotation);
                const annotationShow = screen.queryByTestId("annotation-show-item");
                expect(annotationShow).not.toHaveTextContent("edited: 2022-05-09 21:05");
            });
            test("does display edited info when edited", () => {
                const annotation = screen.queryAllByTestId("lyrics__is-annotation")[1];
                userEvent.click(annotation);
                const annotationShow = screen.queryByTestId("annotation-show-item");
                expect(annotationShow).toHaveTextContent("edited: 2022-05-09 21:05");
            });
        });
        test("contains votes show component when annotation is clicked on", () => {
            const annotation = screen.queryAllByTestId("lyrics__is-annotation")[0];
            userEvent.click(annotation);
            const annotationShow = screen.queryByTestId("annotation-show-item");
            const voteShow = within(annotationShow).queryAllByTestId("vote-show")[0];
            expect(voteShow).toBeInTheDocument();
        });
        test("contains comment show component when annotation is clicked on", () => {
            const annotation = screen.queryAllByTestId("lyrics__is-annotation")[0];
            userEvent.click(annotation);
            const annotationShow = screen.queryByTestId("annotation-show-item");
            const commentShowItem = within(annotationShow).queryAllByTestId("comment-show-item")[0];
            expect(commentShowItem).toBeInTheDocument();
        });
    });
    describe("no user tests", () => {
        beforeEach(() => {
            renderShowComponentWithoutUser(<TrackShow />);
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
            renderShowComponentWithUser(<TrackShow />);
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