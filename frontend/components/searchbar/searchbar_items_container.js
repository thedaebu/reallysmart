import { connect } from "react-redux";
import { closeSearchbarModal } from "../../actions/searchbar_modal_actions";
import SearchbarItems from "./searchbar_items";

const mSTP = ( state, ownProps) => {
    return ({
        searches: Object.values(state.entities.searches),
        searchbarModal: state.modal.searchbarModal
    });
};

const mDTP = (dispatch, ownProps) => {
    return ({
        closeSearchbarModal: () => dispatch(closeSearchbarModal())
    });
};

export default connect(mSTP, mDTP)(SearchbarItems);