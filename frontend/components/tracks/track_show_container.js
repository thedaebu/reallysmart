import { connect } from "react-redux";
import { fetchTrack } from "../../actions/track_actions";
import TrackShow from "./track_show";

const mSTP = (state, ownProps) => {
    const track = state.entities.tracks !== undefined 
    ? state.entities.tracks[ownProps.match.params.trackId] 
    : undefined;
    
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