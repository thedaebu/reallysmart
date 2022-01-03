import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { State } from "../../my_types";
import { fetchTrack } from "../../actions/track_actions";
import TrackShow from "./track_show";

type OwnProps = RouteComponentProps<GivenProps>
type GivenProps = {
    trackId: string
}

const mSTP = (state: State, ownProps: OwnProps) => {
    const track = state.entities.tracks[parseInt(ownProps.match.params.trackId)] 

    return ({
        track: track,
        trackId: ownProps.match.params.trackId
    });
};

const mDTP = (dispatch: Function) => {
    return ({
        fetchTrack: (trackId: string) => dispatch(fetchTrack(trackId))  
    });
};

export default connect(mSTP, mDTP)(TrackShow);