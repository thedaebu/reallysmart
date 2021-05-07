import { connect } from "react-redux";
import SearchbarItems from "./searchbar_items";

const mSTP = ( state, ownProps) => {
    return ({
        searches: Object.values(state.entities.searches)
    });
};

const mDTP = (dispatch, ownProps) => {
    return ({

    });
};

export default connect(mSTP, mDTP)(SearchbarItems);