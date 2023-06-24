import React from "react";
import { cleanup, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderShowComponentWithoutUser, renderShowComponentWithUser, testShowStoreWithoutUser, testShowStoreWithUser } from "../../test_store_data";
import TrackShow from "../../../components/tracks/TrackShow";

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
            const annotation = screen.queryAllByTestId("lyrics-text__body--annotated")[0];
            userEvent.click(annotation);
            const annotationShow = screen.queryByTestId("annotation-show");
            expect(annotationShow).toHaveTextContent(`${annotator_name}`);
            expect(annotationShow).toHaveTextContent(`${body}`);
        });
        describe("edited displays", () => {
            test("does not display edited info when never edited", () => {
                const annotation = screen.queryAllByTestId("lyrics-text__body--annotated")[0];
                userEvent.click(annotation);
                const annotationShow = screen.queryByTestId("annotation-item");
                expect(annotationShow).not.toHaveTextContent("edited: 2022-05-09 21:05");
            });
            test("does display edited info when edited", () => {
                const annotation = screen.queryAllByTestId("lyrics-text__body--annotated")[1];
                userEvent.click(annotation);
                const annotationShow = screen.queryByTestId("annotation-item");
                expect(annotationShow).toHaveTextContent("edited: 2022-05-09 21:05");
            });
        });
        test("contains votes show component when annotation is clicked on", () => {
            const annotation = screen.queryAllByTestId("lyrics-text__body--annotated")[0];
            userEvent.click(annotation);
            const annotationShow = screen.queryByTestId("annotation-item");
            const voteShow = within(annotationShow).queryAllByTestId("vote-show")[0];
            expect(voteShow).toBeInTheDocument();
        });
        test("contains comment show component when annotation is clicked on", () => {
            const annotation = screen.queryAllByTestId("lyrics-text__body--annotated")[0];
            userEvent.click(annotation);
            const annotationShow = screen.queryByTestId("annotation-item");
            const commentItem = within(annotationShow).queryAllByTestId("comment-item")[0];
            expect(commentItem).toBeInTheDocument();
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
            const annotation = screen.queryAllByTestId("lyrics-text__body--annotated")[0];
            userEvent.click(annotation);
            const annotationItem = screen.queryByTestId("annotation-item");
            const annotationEditButton = within(annotationItem).queryByTestId("annotation-item__edit");
            expect(annotationEditButton).not.toBeInTheDocument();
            const annotationDeleteButton = within(annotationItem).queryByTestId("annotation-item__delete");
            expect(annotationDeleteButton).not.toBeInTheDocument();
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
            const annotation = screen.queryAllByTestId("lyrics-text__body--annotated")[1];
            userEvent.click(annotation);
            const annotationItem = screen.queryByTestId("annotation-item");
            const annotationEditButton = within(annotationItem).queryByTestId("annotation-item__edit");
            expect(annotationEditButton).not.toBeInTheDocument();
            const annotationDeleteButton = within(annotationItem).queryByTestId("annotation-item__delete");
            expect(annotationDeleteButton).not.toBeInTheDocument();
        });
        test("contains the options to edit and delete the annotation if the current user created the annotation", () => {
            const annotation = screen.queryAllByTestId("lyrics-text__body--annotated")[0];
            userEvent.click(annotation);
            const annotationItem = screen.queryByTestId("annotation-item");
            const annotationEditButton = within(annotationItem).queryByTestId("annotation-item__edit");
            expect(annotationEditButton).toBeInTheDocument();
            const annotationDeleteButton = within(annotationItem).queryByTestId("annotation-item__delete");
            expect(annotationDeleteButton).toBeInTheDocument();
        });
        describe("edit option", () => {
            test("contains the annotation text in the text area with 'Save' and 'Cancel' buttons when the 'Edit' button is clicked on", () => {
                const { body } = testShowStoreWithUser.entities.annotations[1];
                const annotation = screen.queryAllByTestId("lyrics-text__body--annotated")[0];
                userEvent.click(annotation);
                const annotationItem = screen.queryByTestId("annotation-item");
                const annotationEditButton = within(annotationItem).queryByTestId("annotation-item__edit");
                userEvent.click(annotationEditButton);
                const annotationForm = screen.queryByTestId("annotation-form");
                expect(annotationForm).toHaveTextContent(body);
                expect(annotationForm).toHaveTextContent("Save");
                expect(annotationForm).toHaveTextContent("Cancel");
            });
            test("returns to previous options when the 'Cancel' button is clicked on", () => {
                const annotation = screen.queryAllByTestId("lyrics-text__body--annotated")[0];
                userEvent.click(annotation);
                let annotationItem = screen.queryByTestId("annotation-item");
                let annotationEditButton = within(annotationItem).queryByTestId("annotation-item__edit");
                userEvent.click(annotationEditButton);
                annotationItem = screen.queryByTestId("annotation-item");
                expect(annotationItem).not.toBeInTheDocument();
                let annotationForm = screen.queryByTestId("annotation-form");
                const cancelButton = within(annotationForm).queryByTestId("annotation-form__bottom__cancel");
                userEvent.click(cancelButton);
                annotationForm = screen.queryByTestId("annotation-form");
                expect(annotationForm).not.toBeInTheDocument();
                annotationItem = screen.queryByTestId("annotation-item");
                annotationEditButton = within(annotationItem).queryByTestId("annotation-item__edit");
                expect(annotationEditButton).toBeInTheDocument();
                const annotationDeleteButton = within(annotationItem).queryByTestId("annotation-item__delete");
                expect(annotationDeleteButton).toBeInTheDocument();
            });
        });
        describe("delete option", () => {
            test("prompts 'Are you sure?' question with 'Yes' and 'No' options when the 'Delete' button is clicked on", () => {
                const annotation = screen.queryAllByTestId("lyrics-text__body--annotated")[0];
                userEvent.click(annotation);
                const annotationItem = screen.queryByTestId("annotation-item");
                const annotationDeleteButton = within(annotationItem).queryByTestId("annotation-item__delete");
                userEvent.click(annotationDeleteButton);
                const annotationItemQuestion = within(annotationItem).queryByTestId("annotation-item__question");
                expect(annotationItemQuestion).toHaveTextContent("Are you sure?");
                expect(annotationItem).toHaveTextContent("Yes");
                expect(annotationItem).toHaveTextContent("No");
            });
            test("returns to previous options when the 'No' button is clicked on", () => {
                const annotation = screen.queryAllByTestId("lyrics-text__body--annotated")[0];
                userEvent.click(annotation);
                let annotationItem = screen.queryByTestId("annotation-item");
                let annotationDeleteButton = within(annotationItem).queryByTestId("annotation-item__delete");
                userEvent.click(annotationDeleteButton);
                let annotationItemQuestion = within(annotationItem).queryByTestId("annotation-item__question");
                expect(annotationItemQuestion).toBeInTheDocument();
                const noButton = screen.queryByTestId("annotation-item__delete-no");
                userEvent.click(noButton);
                annotationItemQuestion = within(annotationItem).queryByTestId("annotation-item__question");
                expect(annotationItemQuestion).not.toBeInTheDocument();
                annotationItem = screen.queryByTestId("annotation-item");
                const annotationEditButton = within(annotationItem).queryByTestId("annotation-item__edit");
                expect(annotationEditButton).toBeInTheDocument();
                annotationDeleteButton = within(annotationItem).queryByTestId("annotation-item__delete");
                expect(annotationDeleteButton).toBeInTheDocument();
            });
        });
    });
});