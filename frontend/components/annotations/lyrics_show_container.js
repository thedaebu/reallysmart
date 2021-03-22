import { connect } from 'react-redux';
import { fetchAnnotation } from '../../actions/annotation_actions';
import LyricsShow from './lyrics_show';

const mSTP = (state, ownProps) => {

    let annotations = ownProps.track.annotation_ids.map(id => {
        return state.entities.annotations[id]
    })

    return ({
        annotations: annotations

    })
};
const mDTP = (dispatch, ownProps) => {
    return ({
        fetchAnnotation: annotationId => dispatch(fetchAnnotation(annotationId)),
    })
};

export default connect(mSTP, mDTP)(LyricsShow);
