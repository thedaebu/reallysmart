import { connect } from 'react-redux';
import { fetchTrack, fetchTracks } from '../../actions/track_actions';
import TrackShow from './track_show';

const mSTP = (state, ownProps) => {
    return ({
        track: state.entities.tracks[ownProps.match.params.trackId],
    })
}

const mDTP = (dispatch, ownProps) => {
    return ({   
        fetchTrack: trackId => dispatch(fetchTrack(trackId)),
        
    })
}

export default connect(mSTP, mDTP)(TrackShow);