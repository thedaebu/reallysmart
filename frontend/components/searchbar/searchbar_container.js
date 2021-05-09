import { connect } from "react-redux";
import { closeSearchbarModal, openSearchbarModal } from "../../actions/searchbar_modal_actions";
import { clearSearches, fetchSearches } from "../../actions/search_actions";
import Searchbar from "./searchbar";

const mSTP = ( state, ownProps ) => {
    return ({
        
    });
};

const mDTP = ( dispatch, ownProps ) => {
    return ({
        fetchSearches: search => dispatch(fetchSearches(search)),
        openSearchbarModal: data => dispatch(openSearchbarModal(data)),
        closeSearchbarModal: () => dispatch(closeSearchbarModal())
    });
};

export default connect(mSTP, mDTP)(Searchbar);