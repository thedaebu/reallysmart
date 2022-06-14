import { createStore } from "redux";
import { IndexTrack } from "../../my_types";
import { Store } from "../../store/store";
import rootReducer from "../../reducers/root_reducer";
import indexTracksReducer from "../../reducers/index_tracks_reducer";
import { testIndexTracksData } from "../test_store_data";

describe("index tracks reducer", () => {
    const testTracks: {[key:number]: IndexTrack}= testIndexTracksData;

    test("exports a function", () => {
        expect(typeof indexTracksReducer).toEqual("function");
    });
    describe("track actions", () => {
        test("initializes with an empty object as the default state", () => {
            expect(indexTracksReducer(undefined, {})).toEqual({});
        });
        test("returns the previous state if an action is not matched", () => {
            const state = indexTracksReducer(testTracks, {type: "NONINDEXTRACKS_ACTION"});
            expect(state).toEqual(testTracks);
        });
        describe("RECEIVE_TRACKS action", () => {
            test("returns index tracks data", () => {
                const state: {[key:number]: IndexTrack} = indexTracksReducer({}, {type: "RECEIVE_TRACKS", tracks: testTracks});
                expect(state).toEqual(testTracks);
            });
            test("does not modify the previous state", () => {
                const state: {[key:number]: IndexTrack} = indexTracksReducer(testTracks, {type: "RECEIVE_TRACKS", indexTracks: testTracks});
                expect(testTracks).toEqual(testIndexTracksData);
            });
        });
        describe("RECEIVE_TRACK action", () => {
            test("removes all index tracks data", () => {
                const state: {[key:number]: IndexTrack} = indexTracksReducer(testTracks, {type: "RECEIVE_TRACK"});
                expect(state).not.toEqual(testTracks);
            });
            test("does not modify the previous state", () => {
                const state: {[key:number]: IndexTrack} = indexTracksReducer(testTracks, {type: "RECEIVE_TRACK"});
                expect(testTracks).toEqual(testIndexTracksData);
            });
        });
    });
    describe("dispatch to store", () => {
        let testStore: any;
        beforeAll(() => {
            testStore = createStore(rootReducer);
        });
        test("contains the correct data for RECEIVE_TRACKS action", () => {
            testStore.dispatch({type: "RECEIVE_TRACKS", tracks: testTracks });
            expect(testStore.getState().entities.indexTracks).toEqual(testTracks);
        });
    });
});