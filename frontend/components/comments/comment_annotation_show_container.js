import { connect } from 'react-redux';
import { fetchAnnotation } from '../../actions/annotation_actions';
import { fetchComment, createComment } from '../../actions/comment_actions';
import CommentShow from './comment_show';


const mSTP = (state, ownProps) => {
    
    return ({
        comments: state.entities.comments[ownProps.commentableId],
    })
}

const mDTP = (dispatch, ownProps) => {
    return ({
        fetchComment: commentId => dispatch(fetchComment(commentId)),
        createComment: comment => dispatch(createComment(comment)),
        fetchParent: annotationId => dispatch(fetchAnnotation(annotationId)),
    })
}

export default connect(mSTP, mDTP)(CommentShow)