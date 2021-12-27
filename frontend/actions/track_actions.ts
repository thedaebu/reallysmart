import { AnyAction, Dispatch } from "redux";
import { ReceivedTrack, ReceivedTracks } from "../my_types";
import * as TrackApiUtil from "./../util/track_api_util";

export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const RECEIVE_TRACK = "RECEIVE_TRACK";

const receiveTracks = (tracks: ReceivedTracks) => {
    return ({
        type: RECEIVE_TRACKS,
        tracks
    });
};
const receiveTrack = (receivedTrack: ReceivedTrack) => {
    return ({
        type: RECEIVE_TRACK,
        comments: receivedTrack.comments,
        track: receivedTrack.track
    });
};

export const fetchTracks = () => (dispatch: Dispatch<AnyAction>) => {  
    return (
        TrackApiUtil.fetchTracks()
            .then((tracks: ReceivedTracks) => dispatch(receiveTracks(tracks)))
    );
};
export const fetchTrack = (trackId: string) => (dispatch: Dispatch<AnyAction>) => {
    return (
        TrackApiUtil.fetchTrack(trackId)
            .then((track: ReceivedTrack) => dispatch(receiveTrack(track)))
    );
};