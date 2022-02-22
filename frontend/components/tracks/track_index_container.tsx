import { connect } from "react-redux";
import { State } from "../../my_types";
import { fetchTracks } from "../../actions/track_actions";
import TrackIndex from "./track_index";

const mSTP = (state: State) => {
    return ({
        tracks: Object.values(state.entities.tracks)
    });
};

const mDTP = (dispatch: Function) => {
    return ({   
        fetchTracks: () => dispatch(fetchTracks())
    });
};

const TrackIndexContainer = connect(mSTP, mDTP)(TrackIndex);
export default TrackIndexContainer;