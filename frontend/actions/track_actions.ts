import { Dispatch } from "redux";
import { IndexTrack, ReceivedTrack, ReceivedTracks, TrackAction, TracksAction } from "../my_types";
import * as TrackAPIUtil from "./../util/api/track_api_util";

export const RECEIVE_TRACKS: string = "RECEIVE_TRACKS";
export const RECEIVE_TRACK: string = "RECEIVE_TRACK";

const receiveTracks: Function = ({ tracks }: {tracks: {[key: number]: IndexTrack}}) => ({
    tracks,
    type: RECEIVE_TRACKS
});
const receiveTrack: Function = (receivedTrack: ReceivedTrack) => ({
    annotations: receivedTrack.annotations,
    comments: receivedTrack.comments,
    track: receivedTrack.track,
    type: RECEIVE_TRACK
});

export const fetchTracks: Function = () => (dispatch: Dispatch<TracksAction>) => (
    TrackAPIUtil.fetchTracks()
        .then((receivedTracks: ReceivedTracks) => dispatch(receiveTracks(receivedTracks)))
);
export const fetchTrack: Function = (trackInfo: Array<string>) => (dispatch: Dispatch<TrackAction>) => (
    TrackAPIUtil.fetchTrack(trackInfo)
        .then((receivedTrack: ReceivedTrack) => dispatch(receiveTrack(receivedTrack)))
);