import { connect } from "react-redux";
import { fetchComment, createComment } from "../../actions/comment_actions";
import { fetchAnnotation } from "../../actions/annotation_actions";
import { fetchTrack } from "../../actions/track_actions";
import CommentShow from "./comment_show";

type State = {
    entities: Entities
}
interface Entities {
    comments: CommentKey
}
interface CommentKey {
    [key: number]: Comment
}
interface Comment {
    body: string,
    commentable_id: number,
    commenter: string,
    commenter_id: number,
    id: number,
    updated_at: string,
    votes: number
}
type OwnProps = {
    commentableType: string,
    parent: Parent
}
interface Parent {
    comment_ids: Array<number>
}

const mSTP = (state: State, ownProps: OwnProps) => {
    const comments = ownProps.parent.comment_ids.map((id: number) => state.entities.comments[id]);
    const commentMessage = ownProps.commentableType === "Track"
        ? "Add a comment"
        : "You think you're really smarter?";

    return ({
        comments: comments,
        commentMessage: commentMessage
    });
};

const mDTP = (dispatch: Function, ownProps: OwnProps) => {
    const fetchAction = ownProps.commentableType === "Track"
        ? (trackId: string) => dispatch(fetchTrack(trackId))
        : (annotationId: number) => dispatch(fetchAnnotation(annotationId));

    return ({
        fetchComment: (commentId: number) => dispatch(fetchComment(commentId)),
        createComment: (comment: Comment) => dispatch(createComment(comment)),
        fetchAction: fetchAction
    });
};

export default connect(mSTP, mDTP)(CommentShow);