import { connect } from 'react-redux';
import { createAnnotation, fetchAnnotation } from '../../actions/annotation_actions';
import Annotation from './annotation_show';

const mSTP = ( state, ownProps ) => {
    return ({
        annotation: state.entities.annotations[ownProps.annotationId],
    })
}
const mDTP = ( dispatch, ownProps ) => {
    return ({
        createAnnotation: (annotation) => dispatch(createAnnotation(annotation)),
        fetchAnnotation: (annotationId) => dispatch(fetchAnnotation(annotationId))
    })
}

export default connect(mSTP, mDTP)(Annotation)