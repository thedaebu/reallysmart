import * as TrackApiUtil from './../util/track_api_util';

export const RECEIVE_TRACKS = 'RECEIVE_TRACKS';
export const RECEIVE_TRACK = 'RECEIVE_TRACK';

const receiveTracks = tracks => {
    return ({
        type: RECEIVE_TRACKS,
        tracks,
    })
}
const receiveTrack = ({track, annotations, annotators, comments}) => {
    return ({
        type: RECEIVE_TRACK,
        track,
        annotations,
        annotators,
        comments
        
    })
}

export const fetchTracks = () => dispatch => {  
    return (
        TrackApiUtil.fetchTracks().then(tracks => dispatch(receiveTracks(tracks)))
    )
};

export const fetchTrack = trackId => dispatch => {
    return (
        TrackApiUtil.fetchTrack(trackId).then(track => dispatch(receiveTrack(track)))
    )
};