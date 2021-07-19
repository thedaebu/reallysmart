import { connect } from "react-redux";
import { fetchComment, createComment } from "../../actions/comment_actions";
import { fetchAnnotation } from "../../actions/annotation_actions";
import { fetchTrack } from "../../actions/track_actions";
import CommentShow from "./comment_show";

const mSTP = (state, ownProps) => {
    const comments = ownProps.parent.comment_ids.map(id => state.entities.comments[id]);
    const commentMessage = ownProps.commentableType === "Track" ? "Add a comment" : "You think you're really smarter?";
    return ({
        comments: comments,
        commentMessage: commentMessage
    });
};

const mDTP = (dispatch, ownProps) => {
    const fetchAction = ownProps.commentableType === "Track" ? trackId => dispatch(fetchTrack(trackId)) : annotationId => dispatch(fetchAnnotation(annotationId));
    return ({
        fetchComment: commentId => dispatch(fetchComment(commentId)),
        createComment: comment => dispatch(createComment(comment)),
        fetchAction: fetchAction
    });
};

export default connect(mSTP, mDTP)(CommentShow);