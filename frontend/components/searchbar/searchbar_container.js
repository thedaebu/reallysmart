import { connect } from "react-redux";
import { fetchSearches } from "../../actions/search_actions";
import Searchbar from "./searchbar";

const mSTP = ( state, ownProps ) => {
    return ({
        searches: Object.values(state.entities.searches)
    });
};

const mDTP = ( dispatch, ownProps ) => {
    return ({
        fetchSearches: search => dispatch(fetchSearches(search))
    });
};

export default connect(mSTP, mDTP)(Searchbar);