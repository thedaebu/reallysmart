import { connect } from 'react-redux';
import { createAnnotation, fetchAnnotation } from '../../actions/annotation_actions';
import { closeModal, openModal } from '../../actions/modal_action';
import { fetchTrack } from '../../actions/track_actions';
import Annotation from './annotation_show';

const mSTP = ( state, ownProps ) => {
    let annotators = state.entities.annotators;
    return ({
        annotation: state.entities.annotations[ownProps.annotationId],
        modal: state.modal,
        annotators: annotators,
    })
}
const mDTP = ( dispatch, ownProps ) => {
    return ({
        createAnnotation: (annotation) => dispatch(createAnnotation(annotation)),
        fetchAnnotation: (annotationId) => dispatch(fetchAnnotation(annotationId)),
        fetchTrack: (trackId) => dispatch(fetchTrack(trackId)),
        openModal: data => dispatch(openModal(data)),
        closeModal: () => dispatch(closeModal())
    })
}

export default connect(mSTP, mDTP)(Annotation)