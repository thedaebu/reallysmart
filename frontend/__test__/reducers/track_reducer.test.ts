import { createStore } from "redux";
import { Track } from "../../my_types";
import rootReducer from "../../reducers/root_reducer";
import trackReducer from "../../reducers/track_reducer";
import { testTrackData1, testTrackData2 } from "../test_store_data";

describe("track reducer", () => {
    const testTrack1: Track = testTrackData1;
    const testTrack2: Track = testTrackData2;

    test("exports a function", () => {
        expect(typeof trackReducer).toEqual("function");
    });
    describe("track actions", () => {
        describe("RECEIVE_TRACKS action", () => {
            test("removes all track data", () => {
                const state: Track | {} = trackReducer(testTrack1, {type: "RECEIVE_TRACKS"});
                expect(state).not.toEqual(testTrack1);
                expect(state).toEqual({});
            });
            test("does not modify the previous state", () => {
                const state: Track | {} = trackReducer(testTrack1, {type: "RECEIVE_TRACKS"});
                expect(testTrack1).toEqual(testTrackData1);
            });
        });
        describe("RECEIVE_TRACK action", () => {
            test("returns all track data", () => {
                const state: Track | {} = trackReducer(testTrack1, {type: "RECEIVE_TRACK", track: testTrack1});
                expect(state).toEqual(testTrackData1);
            });
            test("removes data for all other tracks except the current track", () => {
                const state: Track | {} = trackReducer(testTrack1, {type: "RECEIVE_TRACK", track: testTrack2});
                expect(state).not.toEqual(testTrackData1);
                expect(state).toEqual(testTrackData2);
            });
            test("does not modify the previous state", () => {
                const state: Track = trackReducer(testTrack1, {type: "RECEIVE_TRACK", track: testTrack2});
                expect(testTrack1).toEqual(testTrackData1);
            });
        });
    });
    describe("dispatch to store", () => {
        let testStore: any;
        beforeAll(() => {
            testStore = createStore(rootReducer);
        });
        test("contains the correct data for RECEIVE_TRACK action", () => {
            testStore.dispatch({type: "RECEIVE_TRACK", track: testTrack1, annotations: {}, comments: {}, indexTracks: {}, searches: {}});
            expect(testStore.getState().entities.track).toEqual(testTrack1);
            testStore.dispatch({type: "RECEIVE_TRACK", track: testTrack2, annotations: {}, comments: {}, indexTracks: {}, searches: {}});
            expect(testStore.getState().entities.track).toEqual(testTrack2);
        });
    });
});