import React from "react";
import { cleanup, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reactRedux from "react-redux";
import { renderShowComponentWithoutUser, testShowStoreWithoutUser } from "../../test_store_data";
import TrackShow from "../../../components/tracks/track_show";

const useMockDispatch = jest.spyOn(reactRedux, "useDispatch");
const useMockEffect = jest.spyOn(React, "useEffect");
const useMockSelector = jest.spyOn(reactRedux, "useSelector");
const useMockState = jest.spyOn(React, "useState");

describe("lyrics", () => {
    beforeEach(() => {
        renderShowComponentWithoutUser(<TrackShow />);
    });
    afterEach(() => {
        cleanup();
    });

    test("useDispatch is called", () => {
        expect(useMockDispatch).toHaveBeenCalled();
    });
    test("useEffect is called", () => {
        expect(useMockEffect).toHaveBeenCalled();
    });
    test("useSelector is called", () => {
        expect(useMockSelector).toHaveBeenCalled();
    });
    test("useState is called", () => {
        expect(useMockState).toHaveBeenCalled();
    });
    test("contains the lyrics of the song", () => {
        const lyricsBody = screen.getByTestId("lyrics__body");
        expect(lyricsBody).toHaveTextContent(testShowStoreWithoutUser.entities.track.lyrics);
    });
    test("contains the correct number of annotated sections", () => {
        const lyricsBody = screen.getByTestId("lyrics__body");
        const annotatedSections = within(lyricsBody).getAllByTestId("lyrics__is-annotation");
        expect(annotatedSections.length).toBe(2);
    });
    test("contains the correct number of non-annotated sections", () => {
        const lyricsBody = screen.getByTestId("lyrics__body");
        const annotatedSections = within(lyricsBody).getAllByTestId("lyrics__not-annotation");
        expect(annotatedSections.length).toBe(3);
    });
    describe("annotation show component", () => {
        test("shows 'About <track title>' by default", () => {
            const annotationShow = screen.queryByTestId("annotation-show");
            expect(annotationShow).toHaveTextContent("Highlight part of the lyrics to add an annotationClick on a highlighted section to show annotation");
        });
        test("is shown when an annotated section is clicked on", () => {
            const annotatedSection = screen.queryAllByTestId("lyrics__is-annotation")[0];
            userEvent.click(annotatedSection);
            const annotationShow = screen.queryByTestId("annotation-show");
            expect(annotationShow).toBeInTheDocument();
        });
        test("shows default text when anywhere except an annotated section is clicked on after already clicking on an annotated section", () => {
            const annotatedSection = screen.queryAllByTestId("lyrics__is-annotation")[0];
            userEvent.click(annotatedSection);
            const nonAnnotatedSection = screen.queryAllByTestId("lyrics__not-annotation")[0];
            userEvent.click(nonAnnotatedSection);
            const annotationShow = screen.queryByTestId("annotation-show");
            expect(annotationShow).toHaveTextContent("Highlight part of the lyrics to add an annotationClick on a highlighted section to show annotation");
        });
    });
    describe("comment show component", () => {
        test("contains comment show component", () => {
            const lyrics = screen.queryByTestId("lyrics__main");
            const commentShowItem = within(lyrics).queryAllByTestId("comment-show-item")[0];
            expect(commentShowItem).toBeInTheDocument();
        });
    });
});