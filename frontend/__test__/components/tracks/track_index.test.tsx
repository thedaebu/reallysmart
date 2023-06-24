import React from "react";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import * as reactRedux from "react-redux";
import { renderIndexComponent, testIndexStore } from "../../test_store_data";
import * as trackActions from "../../../actions/track_actions";
import { IndexTrack } from "../../../my_types";
import TrackIndex from "../../../components/tracks/TrackIndex";

const useMockDispatch = jest.spyOn(reactRedux, "useDispatch");
const useMockEffect = jest.spyOn(React, "useEffect");
const useMockSelector = jest.spyOn(reactRedux, "useSelector");
const useMockState = jest.spyOn(React, "useState");
const useFetchTracks = jest.spyOn(trackActions, "fetchTracks");

describe("track index", () => {
    beforeEach(() => {
        renderIndexComponent(<TrackIndex />);
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
    test("fetchTracks is called", () => {
        expect(useFetchTracks).toHaveBeenCalled();
    });
    describe("track item", () => {
        test("contains track items", () => {
            const trackItems = screen.queryAllByTestId("track-item");
            expect(trackItems).toBeDefined();
            const trackIndexItem = trackItems;
            expect(trackIndexItem.length).toBeGreaterThan(0);
        });
        test("displays the artist and title for each track item", () => {
            const trackIndexData: { [key:number]: IndexTrack } = testIndexStore.entities.indexTracks;
            const trackItems = screen.queryAllByTestId("track-item");
            trackItems.forEach((trackIndexItem, idx) => {
                expect(trackIndexItem).toHaveTextContent(trackIndexData[idx+1].artist);
                expect(trackIndexItem).toHaveTextContent(trackIndexData[idx+1].title);
            });
        });
    });
    test("starts with five tracks and then shows the rest when the 'LOAD MORE' button is clicked", () => {
        const extendListButton = screen.queryByTestId("track-index__load-more");
        let trackItems = screen.queryAllByTestId("track-item");
        expect(trackItems.length).toBeLessThan(6);

        userEvent.click(extendListButton);
        trackItems = screen.queryAllByTestId("track-item");
        expect(trackItems.length).toBeGreaterThan(5);
    });
    test("proceeds to correct url depending on which track is clicked", () => {
        const firstTrackIndexItem = screen.queryAllByTestId("track-item")[0];
        userEvent.click(firstTrackIndexItem);
        const pathName = global.window.location.pathname;
        expect(pathName).toEqual("/tracks/niki__selene");
    });
});