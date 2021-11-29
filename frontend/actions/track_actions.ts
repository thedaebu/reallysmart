import { AnyAction, Dispatch } from "redux";
import * as TrackApiUtil from "./../util/track_api_util";

export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const RECEIVE_TRACK = "RECEIVE_TRACK";

type ReceivedTracks = {
    tracks: Track
}
type ReceivedTrack = {
    track: Track,
    annotations: Annotation,
    comments: Comment
}
interface Track {
    annotation_ids: Array<number>,
    artist: string,
    artwork_path: string,
    comment_ids: Array<number>,
    id: number,
    lyrics: string,
    title: string
}
interface Annotation {
    annotator: string,
    annotator_id: number,
    body: string,
    comment_ids: Array<number>,
    end_index: number,
    id: number,
    start_index: number,
    track_id: number,
    votes: number
}
interface Comment {
    body: string,
    commentable_id: number,
    commenter: string,
    commenter_id: number,
    id: number,
    updated_at: string,
    votes: number
}

const receiveTracks = (tracks: ReceivedTracks) => {
    return ({
        type: RECEIVE_TRACKS,
        tracks
    });
};
const receiveTrack = ({track, annotations, comments}: {track: Track, annotations: Annotation, comments: Comment}) => {
    return ({
        type: RECEIVE_TRACK,
        track,
        annotations,
        comments   
    });
};

export const fetchTracks = () => (dispatch: Dispatch<AnyAction>) => {  
    return (
        TrackApiUtil.fetchTracks().then((tracks: any) => dispatch(receiveTracks(tracks)))
    );
};

export const fetchTrack = (trackId: number) => (dispatch: Dispatch<any>) => {
    return (
        TrackApiUtil.fetchTrack(trackId).then((track: ReceivedTrack) => dispatch(receiveTrack(track)))
    );
};