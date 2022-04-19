import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as TrackActions from "../../actions/track_actions";
import { ReceivedTrack } from "../../my_types";
import * as TrackAPIUtil from "../../util/api/track_api_util";
import { testTracks, testTrackShowStore } from "../test_store_data";

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe("track actions", () => {
    describe("action constants", () => {
        test("exports a RECEIVE_TRACKS constant", () => {
            expect(TrackActions.RECEIVE_TRACKS).toEqual("RECEIVE_TRACKS");
        });
        test("exports a RECEIVE_TRACK constant", () => {
            expect(TrackActions.RECEIVE_TRACK).toEqual("RECEIVE_TRACK");
        });
    });
    describe("functions", () => {
        let store: any;
        beforeEach(() => {
            store = mockStore({tracks: {}});
        });
        afterEach(() => {
            store.clearActions();
        });
        describe("fetchTracks", () => {
            test("is exported", () => {
                expect(typeof TrackAPIUtil.fetchTracks).toEqual("function");
            });
            test("dispatches RECEIVE_TRACKS when fetchTracks is called", () => {
                const tracks = { tracks: testTracks };
                TrackAPIUtil.fetchTracks = jest.fn(() => (
                    Promise.resolve(tracks)
                ));
                const actions = [{ type: "RECEIVE_TRACKS", tracks: tracks.tracks }];
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
                const track: ReceivedTrack = { 
                    annotations: testTrackShowStore.entities.annotations,
                    comments: testTrackShowStore.entities.comments,
                    track: testTrackShowStore.entities.tracks[1],
                    votes: testTrackShowStore.entities.votes
                };
                TrackAPIUtil.fetchTrack = jest.fn(() => (
                    Promise.resolve(track)
                ));
                const actions = [{type: "RECEIVE_TRACK", annotations: track.annotations, comments: track.comments, track: track.track, votes: track.votes}];
                return store.dispatch(TrackActions.fetchTrack("1")).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
    });
});