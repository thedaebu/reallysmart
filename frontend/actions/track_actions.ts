import { AnyAction, Dispatch } from "redux";
import * as TrackApiUtil from "./../util/track_api_util";

export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const RECEIVE_TRACK = "RECEIVE_TRACK";

type ReceivedTracks = {
    tracks: Track
}
type ReceivedTrack = {
    track: Track,
    annotations: ReceivedAnnotations,
    comments: ReceivedComments
}
type ReceivedAnnotations = {
    annotations: AnnotationKey
}
interface AnnotationKey {
    [key: number]: Annotation
}
type ReceivedComments = {
    comments: CommentKey
}
interface CommentKey {
    [key: number]: Comment
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
const receiveTrack = ({ annotations, comments, track }: { annotations: ReceivedAnnotations, comments: ReceivedComments, track: Track }) => {
    return ({
        type: RECEIVE_TRACK,
        annotations,
        comments,
        track
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