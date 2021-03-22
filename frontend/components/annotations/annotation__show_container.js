import { connect } from 'react-redux';
import AnnotationShow from './annotation_show';

const mSTP = ( state, ownProps ) => {
    return ({
        annotation: state.entities.annotations[ownProps.annotationId]
    })
}
const mDTP = ( dispatch, ownProps ) => {
    return ({
        
    })
}

export default connect(mSTP, mDTP)(AnnotationShow)