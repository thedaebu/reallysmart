import { connect } from 'react-redux';
import { createAnnotation } from '../../actions/annotation_actions';
import Annotation from './annotation_show';

const mSTP = ( state, ownProps ) => {
    return ({
        annotation: state.entities.annotations[ownProps.annotationId],
    })
}
const mDTP = ( dispatch, ownProps ) => {
    return ({
        createAnnotation: (annotation) => dispatch(createAnnotation(annotation)),
    })
}

export default connect(mSTP, mDTP)(Annotation)