import { connect } from 'react-redux';
import { fetchComment, createComment } from '../../actions/comment_actions';
import { fetchAnnotation } from '../../actions/annotation_actions';
import CommentShow from './comment_show';
import { fetchTrack } from '../../actions/track_actions';


const mSTP = (state, ownProps) => {
    let comments;
    if (state.entities.comments) {
        comments = ownProps.parent.comment_ids.map(id => {
                return state.entities.comments[id]
        })
    }
    
    if (ownProps.commentableType === "Track") {
        return ({
            comments: comments,
            commentMessage: "Add a comment",
        })
    } else {
        return({
            comments: comments,
            commentMessage: "You think you're smarter?",
        })
    }
}

const mDTP = (dispatch, ownProps) => {

    if (ownProps.commentableType === "Track") {
        return ({
            fetchComment: commentId => dispatch(fetchComment(commentId)),
            createComment: comment => dispatch(createComment(comment)),
            fetchAction: trackId => dispatch(fetchTrack(trackId))    
        })
    } else {
        return ({
            fetchComment: commentId => dispatch(fetchComment(commentId)),
            createComment: comment => dispatch(createComment(comment)),
            fetchAction: annotationId => dispatch(fetchAnnotation(annotationId)),
        })
    }

}

export default connect(mSTP, mDTP)(CommentShow);


