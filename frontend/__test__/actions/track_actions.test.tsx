import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as TrackActions from "../../actions/track_actions";
import * as TrackAPIUtil from "../../util/api/track_api_util";
import { testAnnotationsData, testCommentsData, testTrackData1, testIndexTracksData } from "../test_store_data";
import { Middleware } from "redux";
import { ReceivedTrack } from "../../my_types";

const middlewares: Array<Middleware> = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe("track actions", () => {
    describe("constants", () => {
        test("exports a RECEIVE_TRACKS constant", () => {
            expect(TrackActions.RECEIVE_TRACKS).toEqual("RECEIVE_TRACKS");
        });
        test("exports a RECEIVE_TRACK constant", () => {
            expect(TrackActions.RECEIVE_TRACK).toEqual("RECEIVE_TRACK");
        });
    });
    describe("functions", () => {
        const tracks = testIndexTracksData;
        let store: any;
        beforeEach(() => {
            store = mockStore({ tracks: {} });
        });
        afterEach(() => {
            store.clearActions();
        });
        describe("fetchTracks", () => {
            test("is exported", () => {
                expect(typeof TrackAPIUtil.fetchTracks).toEqual("function");
            });
            test("dispatches RECEIVE_TRACKS when fetchTracks is called", () => {
                const data = { tracks: testIndexTracksData };
                TrackAPIUtil.fetchTracks = jest.fn(() => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "RECEIVE_TRACKS", tracks: tracks }];
                return store.dispatch(TrackActions.fetchTracks()).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
        describe("fetchTrack", () => {
            test("is exported", () => {
                expect(typeof TrackAPIUtil.fetchTrack).toEqual("function");
            });
            test("dispatches RECEIVE_TRACK when fetchTrack is called", () => {
                const data: ReceivedTrack = { 
                    annotations: testAnnotationsData,
                    comments: testCommentsData,
                    track: testTrackData1
                };
                TrackAPIUtil.fetchTrack = jest.fn(() => (
                    Promise.resolve(data)
                ));
                const actions = [{type: "RECEIVE_TRACK", annotations: data.annotations, comments: data.comments, track: data.track}];
                return store.dispatch(TrackActions.fetchTrack(["niki", "selene"])).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
    });
});