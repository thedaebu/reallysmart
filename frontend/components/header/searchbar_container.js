import { connect } from "react-redux";
import { fetchTracks } from "../../actions/track_actions";
import Searchbar from "./searchbar";

const mSTP = ( state, ownProps ) => {
    return ({

    });
};

const mDTP = ( dispatch, ownProps ) => {
    return ({
        fetchTracks: tracks => dispatch(fetchTracks(tracks))
    });
};

export default connect(mSTP, mDTP)(Searchbar);