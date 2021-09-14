import { connect } from "react-redux";
import { fetchAnnotation } from "../../actions/annotation_actions";
import { closeAnnotationModal, openAnnotationModal } from "../../actions/annotation_modal_actions";
import LyricsShow from "./lyrics_show";

const mSTP = (state, ownProps) => {
    const annotations = ownProps.track.annotation_ids.map(id => {
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
        openAnnotationModal: data => dispatch(openAnnotationModal(data)),
        closeAnnotationModal: () => dispatch(closeAnnotationModal())
    });
};

export default connect(mSTP, mDTP)(LyricsShow);