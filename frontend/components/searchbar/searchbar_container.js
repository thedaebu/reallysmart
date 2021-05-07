import { connect } from "react-redux";
import { clearSearches, fetchSearches } from "../../actions/search_actions";
import Searchbar from "./searchbar";

const mSTP = ( state, ownProps ) => {
    return ({
        
    });
};

const mDTP = ( dispatch, ownProps ) => {
    return ({
        fetchSearches: search => dispatch(fetchSearches(search)),
        clearSearches: () => dispatch(clearSearches())
    });
};

export default connect(mSTP, mDTP)(Searchbar);