import { connect } from "react-redux";
import { createAnnotation, fetchAnnotation } from "../../actions/annotation_actions";
import { closeAnnotationModal, openAnnotationModal } from "../../actions/annotation_modal_actions";
import { fetchTrack } from "../../actions/track_actions";
import Annotation from "./annotation_show";

const mSTP = ( state, ownProps ) => {
    return ({
        annotation: state.entities.annotations[ownProps.annotationId],
        annotationModal: state.modal.annotationModal
    });
};

const mDTP = ( dispatch, ownProps ) => {
    return ({
        createAnnotation: (annotation) => dispatch(createAnnotation(annotation)),
        fetchAnnotation: (annotationId) => dispatch(fetchAnnotation(annotationId)),
        fetchTrack: (trackId) => dispatch(fetchTrack(trackId)),
        closeAnnotationModal: () => dispatch(closeAnnotationModal())
    });
};

export default connect(mSTP, mDTP)(Annotation);