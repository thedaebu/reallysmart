import { createStore } from "redux";
import { IndexTrack, Track } from "../../my_types";
import { Store } from "../../store/store";
import rootReducer from "../../reducers/root_reducer";
import tracksReducer from "../../reducers/tracks_reducer";
import { testTrackData1, testTrackData2, testTracksData } from "../test_store_data";

describe("tracks reducer", () => {
    const testTrack1: { [key:number]: Track } = testTrackData1;
    const testTrack2: { [key:number]: Track } = testTrackData2;
    const testTracks: { [key:number]: IndexTrack }= testTracksData;

    test("exports a function", () => {
        expect(typeof tracksReducer).toEqual("function");
    });
    describe("track actions", () => {
        test("initializes with an empty object as the default state", () => {
            expect(tracksReducer(undefined, {})).toEqual({});
        });
        test("returns the previous state if an action is not matched", () => {
            const state = tracksReducer(testTrack1, { type: "NONTRACK_ACTION"});
            expect(state).toEqual(testTrack1);
        });
        describe("RECEIVE_TRACKS action", () => {
            test("returns track index data", () => {
                const state: { [key:number]: Track | IndexTrack } = tracksReducer(testTrack1, { type: "RECEIVE_TRACKS", tracks: testTracks });
                expect(state).not.toEqual(testTrack1);
                expect(state).toEqual(testTracks);
            });
            test("does not modify the previous state", () => {
                const state: { [key:number]: Track | IndexTrack } = tracksReducer(testTrack1, { type: "RECEIVE_TRACKS", tracks: testTracks });
                expect(testTrack1).toEqual(testTrackData1);
            });
        });
        describe("RECEIVE_TRACK action", () => {
            test("returns track show data", () => {
                const state: { [key:number]: Track | IndexTrack } = tracksReducer(testTracks, { type: "RECEIVE_TRACK", track: testTrack1[1]});
                expect(state).not.toEqual(testTracks);
                expect(state).toEqual(testTrack1);
            });
            test("removes data for all other tracks except the current track", () => {
                const state: { [key:number]: Track | IndexTrack } = tracksReducer(testTrack1, { type: "RECEIVE_TRACK", track: testTrack2[2]});
                expect(state[1]).not.toBeDefined();
                expect(state[2]).toBeDefined();
            });
            test("does not modify the previous state", () => {
                const state: { [key:number]: Track | IndexTrack } = tracksReducer(testTrack1, { type: "RECEIVE_TRACK", track: testTrack2[2]});
                expect(testTrack1).toEqual(testTrackData1);
            });
        });
    });
    describe("dispatch to store", () => {
        let testStore: any;
        beforeAll(() => {
            testStore = createStore(rootReducer);
        });
        test("contains the correct data for RECEIVE_TRACKS action", () => {
            testStore.dispatch({ type: "RECEIVE_TRACKS", tracks: testTracks });
            expect(testStore.getState().entities.tracks).toEqual(testTracks);
        });
        test("contains the correct data for RECEIVE_TRACK action", () => {
            testStore.dispatch({ type: "RECEIVE_TRACK", track: testTrack1[1], annotations: {}, comments: {}, votes: {} });
            expect(testStore.getState().entities.tracks).toEqual(testTrack1);
            testStore.dispatch({ type: "RECEIVE_TRACK", track: testTrack2[2], annotations: {}, comments: {}, votes: {} });
            expect(testStore.getState().entities.tracks).toEqual(testTrack2);
        });
    });
});