import { connect } from "react-redux";
import { fetchTracks } from "../../actions/track_actions";
import TrackIndex from "./track_index";

type State = {
    entities: Entities;
}
interface Entities {
    tracks: TrackKey
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

export default connect(mSTP, mDTP)(TrackIndex);