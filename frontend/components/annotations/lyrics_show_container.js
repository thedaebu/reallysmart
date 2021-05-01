import { connect } from "react-redux";
import { fetchAnnotation } from "../../actions/annotation_actions";
import { closeModal, openModal } from "../../actions/modal_action";
import LyricsShow from "./lyrics_show";

const mSTP = (state, ownProps) => {
    let annotations = ownProps.track.annotation_ids.map(id => {
        return state.entities.annotations[id];
    });
    
    return ({
        currentUser: state.entities.users[state.session.id],
        annotations: annotations
    });
};
const mDTP = (dispatch, ownProps) => {
    return ({
        fetchAnnotation: annotationId => dispatch(fetchAnnotation(annotationId)),
        openModal: data => dispatch(openModal(data)),
        closeModal: () => dispatch(closeModal())
    });
};

export default connect(mSTP, mDTP)(LyricsShow);