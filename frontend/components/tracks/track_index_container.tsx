import { Dispatch } from "react";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { fetchTracks } from "../../actions/track_actions";
import TrackIndex from "./track_index";

interface State {
    entities: Entities;
}
interface Entities {
    tracks: Array<object>
}

const mSTP = (state: State) => {
    debugger
    return ({
        tracks: Object.values(state.entities.tracks)
    });
};

const mDTP = (dispatch: Dispatch<AnyAction>) => {
    return ({   
        fetchTracks: (tracks: Array<object>) => dispatch(fetchTracks(tracks))
    });
};

export default connect(mSTP, mDTP)(TrackIndex);