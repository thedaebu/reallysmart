import { connect } from "react-redux";
import { fetchTrack } from "../../actions/track_actions";
import TrackShow from "./track_show";

const mSTP = (state, ownProps) => {
    let track;
    if (state.entities.tracks) {
        track = state.entities.tracks[ownProps.match.params.trackId];
    }
    
    return ({
        track: track,
        annotations: state.entities.annotations
    });
};

const mDTP = (dispatch, ownProps) => {
    return ({   
        fetchTrack: trackId => dispatch(fetchTrack(trackId))  
    });
};

export default connect(mSTP, mDTP)(TrackShow);