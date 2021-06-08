import { connect } from "react-redux";
import { fetchComment, createComment } from "../../actions/comment_actions";
import { fetchAnnotation } from "../../actions/annotation_actions";
import { fetchTrack } from "../../actions/track_actions";
import CommentShow from "./comment_show";


const mSTP = (state, ownProps) => {
    let comments;
    if (Object.keys(state.entities.comments).length !== 0) {
        debugger
        comments = ownProps.parent.comment_ids.map(id => {
            return state.entities.comments[id];
        })
    } else (
        comments = []
    )

    let commentMessage;
    if (ownProps.commentableType === "Track") {
        commentMessage = "Add a comment";
    } else {
        commentMessage = "You think you're really smarter?";
    }

    return ({
        comments: comments,
        commentMessage: commentMessage
    });
};

const mDTP = (dispatch, ownProps) => {
    let fetchAction;
    if (ownProps.commentableType === "Track") {
        fetchAction = trackId => dispatch(fetchTrack(trackId))
    } else {
        fetchAction = annotationId => dispatch(fetchAnnotation(annotationId))
    }

    return ({
        fetchComment: commentId => dispatch(fetchComment(commentId)),
        createComment: comment => dispatch(createComment(comment)),
        fetchAction: fetchAction
    });
};

export default connect(mSTP, mDTP)(CommentShow);