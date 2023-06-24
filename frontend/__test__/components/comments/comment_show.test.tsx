import React from "react";
import { cleanup, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderShowComponentWithoutUser, renderShowComponentWithUser, testShowStoreWithUser } from "../../test_store_data";
import TrackShow from "../../../components/tracks/TrackShow";

describe("comment show", () => {
    describe("user irrelevant tests", () => {
        beforeEach(() => {
            renderShowComponentWithoutUser(<TrackShow />);
        });
        afterEach(() => {
            cleanup();
        });

        test("contains the commenter username and the body of the comment", () => {
            const commentShow = screen.queryByTestId("comment-show");
            const commentItem = within(commentShow).queryAllByTestId("comment-item")[0];
            expect(commentItem).toHaveTextContent("This is one of my new favorite songs now.");
            expect(commentItem).toHaveTextContent("reallysmart");
        });
        describe("edited displays", () => {
            test("does not display edited info when never edited", () => {
                const commentShow = screen.queryByTestId("comment-show");
                const commentItem = within(commentShow).queryAllByTestId("comment-item")[0];
                expect(commentItem).not.toHaveTextContent("edited: 2022-05-09 21:05");
            });
            test("does display edited info when edited", () => {
                const commentShow = screen.queryByTestId("comment-show");
                const commentItem = within(commentShow).queryAllByTestId("comment-item")[1];
                expect(commentItem).toHaveTextContent("edited: 2022-05-09 21:05");
            });
        });
        test("contains votes show component", () => {
            const lyrics = screen.queryByTestId("lyrics__main");
            const commentItem = within(lyrics).queryAllByTestId("comment-item")[0];
            const voteShow = within(commentItem).queryByTestId("vote-show");
            expect(voteShow).toBeInTheDocument();
        });
        describe("comments for track", () => {
            test("contains the correct amount of comments for the track", () => {
                const commentShow = screen.queryByTestId("comment-show");
                const commentItems = within(commentShow).queryAllByTestId("comment-item");
                expect(commentItems.length).toEqual(2);
            });
            test("contains correct comments for track", () => {
                const commentShow = screen.queryByTestId("comment-show");
                const commentItem1 = within(commentShow).queryAllByTestId("comment-item")[0];
                expect(commentItem1).toHaveTextContent("This is one of my new favorite songs now.");
                const commentItem2 = within(commentShow).queryAllByTestId("comment-item")[1];
                expect(commentItem2).toHaveTextContent("I wonder what these lyrics mean.");
            });
        });
        describe("comments for annotation", () => {
            test("contains the correct amount of comments for the annotation", () => {
                const annotatedSection = screen.queryAllByTestId("lyrics-text__body--annotated")[0];
                userEvent.click(annotatedSection);
                const annotationShow = screen.queryByTestId("annotation-show");
                const commentItems = within(annotationShow).queryAllByTestId("comment-item");
                expect(commentItems.length).toEqual(1);
            });
            test("contains correct comments for the annotation", () => {
                const annotatedSection = screen.queryAllByTestId("lyrics-text__body--annotated")[0];
                userEvent.click(annotatedSection);
                const annotationShow = screen.queryByTestId("annotation-show");
                const commentItems = within(annotationShow).queryAllByTestId("comment-item");
                expect(commentItems.length).toEqual(1);
                const commentItem = within(annotationShow).queryAllByTestId("comment-item")[0];
                expect(commentItem).toHaveTextContent("OOOOOHHHHHHH! Now I get it.");
            });
        });
    });
    describe("no user tests", () => {
        beforeEach(() => {
            renderShowComponentWithoutUser(<TrackShow />);
        });
        afterEach(() => {
            cleanup();
        });

        test("contains only the options to sign up and log in and does not contain the comment creation prompt", () => {
            const commentShow = screen.queryByTestId("comment-show");
            const commentSession = within(commentShow).queryByTestId("comment-show--session");
            expect(commentSession).toHaveTextContent("Sign Up");
            expect(commentSession).toHaveTextContent("Log In");
            const commentShowBegin = within(commentShow).queryByTestId("comment-show__begin");
            expect(commentShowBegin).not.toBeInTheDocument();
        });
        test("does not contain the options to edit and delete any created comment", () => {
            const commentShow = screen.queryByTestId("comment-show");
            const commentItems = within(commentShow).queryAllByTestId("comment-item");
            for (let commentItem of commentItems) {
                const editButton = within(commentItem).queryByTestId("comment-item__edit");
                const deleteButton = within(commentItem).queryByTestId("comment-item__delete");
                expect(editButton).not.toBeInTheDocument();
                expect(deleteButton).not.toBeInTheDocument();
            }
        });
    });
    describe("current user tests", () => {
        beforeEach(() => {
            renderShowComponentWithUser(<TrackShow />);
        });
        afterEach(() => {
            cleanup();
        });

        test("shows text area for comment creation after the 'Add a comment' box is clicked on", () => {
            const commentShow = screen.queryByTestId("comment-show");
            const commentShowBeginText = within(commentShow).queryByTestId("comment-show--begin__text");
            expect(commentShowBeginText).toBeInTheDocument();
            userEvent.click(commentShowBeginText);
            const commentForm = within(commentShow).queryByTestId("comment-form");
            expect(commentForm).toBeInTheDocument();
            expect(commentShowBeginText.tagName).toBe("TEXTAREA");
        });
        test("shows what is typed in it by user", () => {
            const commentShow = screen.queryByTestId("comment-show");
            const commentShowBeginText = within(commentShow).queryByTestId("comment-show--begin__text");
            userEvent.click(commentShowBeginText);
            const commentForm = within(commentShow).queryByTestId("comment-form");
            const commentFormText = within(commentForm).queryByTestId("comment-form__body")
            userEvent.type(commentFormText, "test");
            expect(commentFormText).toHaveValue("test");
        });
        test("returns to previous option after the 'Cancel' button is clicked on", () => {
            const commentShow = screen.queryByTestId("comment-show");
            let commentShowBeginText = within(commentShow).queryByTestId("comment-show--begin__text");
            userEvent.click(commentShowBeginText);
            let commentForm = within(commentShow).queryByTestId("comment-form");
            expect(commentForm).toBeInTheDocument();
            const commentFormCancel = within(commentForm).queryByTestId("comment-form__cancel");
            userEvent.click(commentFormCancel);
            commentShowBeginText = within(commentShow).queryByTestId("comment-show--begin__text");
            expect(commentShowBeginText).toBeInTheDocument();
            commentForm = within(commentShow).queryByTestId("comment-form");
            expect(commentForm).not.toBeInTheDocument();
        });
        test("does not contain the options to edit and delete the comment if the current user did not create the comment", () => {
            const commentShow = screen.queryByTestId("comment-show");
            const commentItem2 = within(commentShow).queryAllByTestId("comment-item")[1];
            const editButton = within(commentItem2).queryByTestId("comment-item__edit");
            const deleteButton = within(commentItem2).queryByTestId("comment-item__delete");
            expect(editButton).not.toBeInTheDocument();
            expect(deleteButton).not.toBeInTheDocument();
        });
        test("contains the options to edit and delete the comment if the current user created the comment", () => {
            const commentShow = screen.queryByTestId("comment-show");
            const commentItem1 = within(commentShow).queryAllByTestId("comment-item")[0];
            const editButton = within(commentItem1).queryByTestId("comment-item__edit");
            const deleteButton = within(commentItem1).queryByTestId("comment-item__delete");
            expect(editButton).toBeInTheDocument();
            expect(deleteButton).toBeInTheDocument();
        });
        describe("edit option", () => {
            test("contains the comment text in the text area and changes the value when typed in after the 'Edit' button is clicked on", () => {
                const { body } = testShowStoreWithUser.entities.comments[1];
                const commentShow = screen.queryByTestId("comment-show");
                const commentItem1 = within(commentShow).queryAllByTestId("comment-item")[0];
                const editButton = within(commentItem1).queryByTestId("comment-item__edit");
                userEvent.click(editButton);
                const commentForm = within(commentShow).queryByTestId("comment-form");
                const commentFormText = within(commentForm).queryByTestId("comment-form__body");
                expect(commentFormText).toHaveValue(body);
                userEvent.type(commentFormText, "test");
                expect(commentFormText).toHaveValue(`${body}test`);
            });
            test("returns to previous options after the 'Cancel' button is clicked on", () => {
                const commentShow = screen.queryByTestId("comment-show");
                const commentItem1 = within(commentShow).queryAllByTestId("comment-item")[0];
                let editButton = within(commentItem1).queryByTestId("comment-item__edit");
                userEvent.click(editButton);
                let commentForm = within(commentShow).queryByTestId("comment-form");
                expect(commentForm).toBeInTheDocument();
                const cancelButton = within(commentForm).queryByTestId("comment-form__cancel");
                userEvent.click(cancelButton);
                commentForm = within(commentShow).queryByTestId("comment-form");
                expect(commentForm).not.toBeInTheDocument();
            });
        });
        describe("delete option", () => {
            test("prompts 'Are you sure?' question with 'Yes' and 'No' options after the 'Delete' button is clicked on", () => {
                const commentShow = screen.queryByTestId("comment-show");
                const commentItem1 = within(commentShow).queryAllByTestId("comment-item")[0];
                const deleteButton = within(commentItem1).queryByTestId("comment-item__delete");
                userEvent.click(deleteButton);
                const commentItemButtons = within(commentShow).queryByTestId("comment-item__buttons");
                expect(commentItemButtons).toHaveTextContent("Are you sure?");
                expect(commentItemButtons).toHaveTextContent("Yes");
                expect(commentItemButtons).toHaveTextContent("No");
            });
            test("returns to previous options after the 'No' button is clicked on", () => {
                const commentShow = screen.queryByTestId("comment-show");
                let commentItem1 = within(commentShow).queryAllByTestId("comment-item")[0];
                const deleteButton = within(commentItem1).queryByTestId("comment-item__delete");
                userEvent.click(deleteButton);
                let commentItemButtons = within(commentShow).queryByTestId("comment-item__buttons");
                expect(commentItemButtons).toBeInTheDocument();
                const commentItemDelete = within(commentItemButtons).queryByTestId("comment-item__delete");
                userEvent.click(commentItemDelete);
                commentItemButtons = within(commentShow).queryByTestId("comment-item__buttons");
                expect(commentItemButtons).not.toBeInTheDocument();
            });
        });
    });
});