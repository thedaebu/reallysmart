import { createStore } from "redux";
import { IndexTrack, Track } from "../../my_types";
import rootReducer from "../../reducers/root_reducer";
import tracksReducer from "../../reducers/tracks_reducer";
import { Store } from "../../store/store";
import { testTrackData1, testTrackData2, testTracksData } from "../test_store_data";

describe("tracks reducer", () => {
    const track1: { [key:number]: Track } = testTrackData1;
    const track2: { [key:number]: Track } = testTrackData2;
    const tracks: { [key:number]: IndexTrack }= testTracksData;

    test("exports a function", () => {
        expect(typeof tracksReducer).toEqual("function");
    });
    describe("track actions", () => {
        test("initializes with an empty object as the default state", () => {
            expect(tracksReducer(undefined, {})).toEqual({});
        });
        test("returns the previous state if an action is not matched", () => {
            const state = tracksReducer(track1, { type: "NONTRACK_ACTION"});
            expect(state).toEqual(track1);
        });
        describe("RECEIVE_TRACKS action", () => {
            test("returns track index data", () => {
                const state: { [key:number]: Track | IndexTrack } = tracksReducer(track1, { type: "RECEIVE_TRACKS", tracks });
                expect(state).not.toEqual(track1);
                expect(state).toEqual(tracks);
            });
            test("does not modify the previous state", () => {
                const state: { [key:number]: Track | IndexTrack } = tracksReducer(track1, { type: "RECEIVE_TRACKS", tracks });
                expect(track1).toEqual(testTrackData1);
            });
        });
        describe("RECEIVE_TRACK action", () => {
            test("returns track show data", () => {
                const state: { [key:number]: Track | IndexTrack } = tracksReducer(tracks, { type: "RECEIVE_TRACK", track: track1[1]});
                expect(state).not.toEqual(tracks);
                expect(state).toEqual(track1);
            });
            test("removes data for all other tracks except the current track", () => {
                const state: { [key:number]: Track | IndexTrack } = tracksReducer(track1, { type: "RECEIVE_TRACK", track: track2[2]});
                expect(state[1]).not.toBeDefined();
                expect(state[2]).toBeDefined();
            });
            test("does not modify the previous state", () => {
                const state: { [key:number]: Track | IndexTrack } = tracksReducer(track1, { type: "RECEIVE_TRACK", track: track2[2]});
                expect(track1).toEqual(testTrackData1);
            });
        });
    });
    describe("dispatches to store", () => {
        let testStore: Store;
        beforeAll(() => {
            testStore = createStore(rootReducer);
        });
        test("contains the correct data for RECEIVE_TRACKS action", () => {
            testStore.dispatch({ type: "RECEIVE_TRACKS", tracks} );
            expect(testStore.getState().entities.tracks).toEqual(tracks);
        });
        test("contains the correct data for RECEIVE_TRACK action", () => {
            testStore.dispatch({ type: "RECEIVE_TRACK", track: track1[1]} );
            expect(testStore.getState().entities.tracks).toEqual(track1);
            testStore.dispatch({ type: "RECEIVE_TRACK", track: track2[2]} );
            expect(testStore.getState().entities.tracks).toEqual(track2);
        });
    });
});