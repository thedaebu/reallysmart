import { connect } from "react-redux";
import { Comment, CreatedComment, State } from "../../my_types";
import { fetchAnnotation } from "../../actions/annotation_actions";
import { fetchComment, createComment } from "../../actions/comment_actions";
import { fetchTrack } from "../../actions/track_actions";
import CommentShow from "./comment_show";

type OwnProps = {
    commentableType: string,
    parent: Parent
}
type Parent = {
    comment_ids: Array<number>
}

const mSTP = (state: State, ownProps: OwnProps) => {
    const comments: Array<Comment> = ownProps.parent.comment_ids.map((id: number) => state.entities.comments[id]);

    return ({
        comments: comments
    });
};

const mDTP = (dispatch: Function, ownProps: OwnProps) => {
    const fetchAction: Function = ownProps.commentableType === "Track"
        ? (trackId: string) => dispatch(fetchTrack(trackId))
        : (annotationId: number) => dispatch(fetchAnnotation(annotationId));

    return ({
        createComment: (comment: CreatedComment) => dispatch(createComment(comment)),
        fetchAction: fetchAction,
        fetchComment: (commentId: number) => dispatch(fetchComment(commentId))
    });
};

export default connect(mSTP, mDTP)(CommentShow);