import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { fetchTrack } from "../../actions/track_actions";
import TrackShow from "./track_show";

type State = {
    entities: Entities;
}
interface Entities {
    tracks: TrackKey,
}
interface TrackKey {
    [key: number]: Track
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
type OwnProps = RouteComponentProps<RouterProps> & {
}
interface RouterProps {
    trackId: string
}

const mSTP = (state: State, ownProps: OwnProps) => {
    const track = state.entities.tracks[parseInt(ownProps.match.params.trackId)] 

    return ({
        track: track,
        trackId: parseInt(ownProps.match.params.trackId)
    });
};

const mDTP = (dispatch: Function) => {
    return ({   
        fetchTrack: (trackId: string) => dispatch(fetchTrack(trackId))  
    });
};

export default connect(mSTP, mDTP)(TrackShow);