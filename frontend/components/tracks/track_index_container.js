import { connect } from 'react-redux';
import { fetchTrack, fetchTracks } from '../../actions/track_actions';
import TrackIndex from './track_index';

const mSTP = (state, ownProps) => {
    return ({
        tracks: Object.values(state.entities.tracks),
    })
}

const mDTP = (dispatch, ownProps) => {
    return ({   
        fetchTracks: tracks => dispatch(fetchTracks(tracks)),
    })
}

export default connect(mSTP, mDTP)(TrackIndex);