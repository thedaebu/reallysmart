import React from "react";
import { cleanup, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderShowComponentWithoutUser } from "../../test_store_data";
import TrackShow from "../../../components/tracks/TrackShow";

describe("vote show", () => {
    describe("user irrelevant tests", () => {
        beforeEach(() => {
            renderShowComponentWithoutUser(<TrackShow />);
        });
        afterEach(() => {
            cleanup();
        });

        test("contains the correct amount of votes for the track comment", () => {
            const lyrics = screen.queryByTestId("lyrics__main");
            const commentShowItem1 = within(lyrics).queryAllByTestId("comment-item")[0];
            const voteShow1 = within(commentShowItem1).queryByTestId("vote-show");
            expect(voteShow1).toHaveTextContent("+1");
            const commentShowItem2 = within(lyrics).queryAllByTestId("comment-item")[1];
            const voteShow2 = within(commentShowItem2).queryByTestId("vote-show");
            expect(voteShow2).toHaveTextContent("+0");
        });
        test("contains the correct amount of votes for the annotation", () => {
            const annotatedSection = screen.queryAllByTestId("lyrics-text__body--annotated")[0];
            userEvent.click(annotatedSection);
            const annotationShow = screen.queryByTestId("annotation-show");
            expect(annotationShow).toHaveTextContent("+1");
        });
        test("contains the correct amount of votes for the annotation comment", () => {
            const annotatedSection = screen.queryAllByTestId("lyrics-text__body--annotated")[0];
            userEvent.click(annotatedSection);
            const annotationShow = screen.queryByTestId("annotation-show");
            const commentShowItem = within(annotationShow).queryByTestId("comment-item");
            const voteShow = within(commentShowItem).queryByTestId("vote-show");
            expect(voteShow).toHaveTextContent("+0");
        });
    });
    describe("no user tests", () => {
        beforeEach(() => {
            renderShowComponentWithoutUser(<TrackShow />);
        });
        afterEach(() => {
            cleanup();
        });

        test("contains an upvote button and does not change the upvote count when clicked on", () => {
            const voteShow = screen.queryAllByTestId("vote-show")[0];
            expect(voteShow).toBeInTheDocument();
            const voteShowNotVoted = within(voteShow).queryByTestId("vote-show__not-voted");
            expect(voteShowNotVoted).toBeInTheDocument();
            expect(voteShow).toHaveTextContent("+1");
            userEvent.click(voteShowNotVoted);
            expect(voteShow).toHaveTextContent("+1");
        });
    });
});