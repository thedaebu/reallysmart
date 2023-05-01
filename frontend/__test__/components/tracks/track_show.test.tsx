import React from "react";
import { screen } from "@testing-library/react";
import * as reactRedux from "react-redux";
import * as trackActions from "../../../actions/track_actions";
import { renderShowComponentWithoutUser, testShowStoreWithoutUser } from "../../test_store_data";
import TrackShow from "../../../components/tracks/track_show";

const useMockDispatch = jest.spyOn(reactRedux, "useDispatch");
const useMockEffect = jest.spyOn(React, "useEffect");
const useMockSelector = jest.spyOn(reactRedux, "useSelector");
const useFetchTrack = jest.spyOn(trackActions, "fetchTrack");

describe("track show", () => {
    renderShowComponentWithoutUser(<TrackShow />);

    test("useEffect is called", () => {
        expect(useMockEffect).toHaveBeenCalled();
    });
    test("useSelector is called", () => {
        expect(useMockSelector).toHaveBeenCalled();
    })
    test("useDispatch is called", () => {
        expect(useMockDispatch).toHaveBeenCalled();
    });
    test("fetchTrack is called", () => {
        expect(useFetchTrack).toHaveBeenCalled();
    });
    describe("track show header", () => {
        const track = testShowStoreWithoutUser.entities.track;
        const header = screen.queryByTestId("track-show-header");
        test("contains the artist and title of the track", () => {
            expect(header).toHaveTextContent(track.artist);
            expect(header).toHaveTextContent(track.title);
        });
    });
});