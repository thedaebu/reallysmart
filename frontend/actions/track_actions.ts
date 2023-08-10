import { Dispatch } from "redux";
import * as TrackAPIUtil from "./../util/api/track_api_util";
import { IndexTrack, ReceivedTrack, ReceivedTracks, TrackAction, TracksAction } from "../my_types";

export const RECEIVE_TRACK: string = "RECEIVE_TRACK";
export const RECEIVE_TRACKS: string = "RECEIVE_TRACKS";

const receiveTrack: Function = (receivedTrack: ReceivedTrack) => ({
    annotations: receivedTrack.annotations,
    comments: receivedTrack.comments,
    track: receivedTrack.track,
    type: RECEIVE_TRACK
});
const receiveTracks: Function = ({ tracks }: { tracks: {[key: number]: IndexTrack}; }) => ({
    tracks,
    type: RECEIVE_TRACKS
});

export const fetchTrack: Function = (trackInfo: Array<string>) => (dispatch: Dispatch<TrackAction>) => (
    TrackAPIUtil.fetchTrack(trackInfo)
        .then((receivedTrack: ReceivedTrack) => dispatch(receiveTrack(receivedTrack)))
);
export const fetchTracks: Function = () => (dispatch: Dispatch<TracksAction>) => (
    TrackAPIUtil.fetchTracks()
        .then((receivedTracks: ReceivedTracks) => dispatch(receiveTracks(receivedTracks)))
);