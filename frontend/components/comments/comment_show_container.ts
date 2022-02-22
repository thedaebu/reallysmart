import { connect } from "react-redux";
import { CreatedComment, State } from "../../my_types";
import { fetchAnnotation } from "../../actions/annotation_actions";
import { createComment } from "../../actions/comment_actions";
import { fetchTrack } from "../../actions/track_actions";
import CommentShow from "./comment_show";

const mSTP = (state: State) => {
    return ({
        comments: state.entities.comments,
        currentUser: state.entities.user[state.session.id]
    });
};

const mDTP = (dispatch: Function) => {
    return ({
        createComment: (comment: CreatedComment) => dispatch(createComment(comment)),
        fetchAnnotation: (annotationId: number) => dispatch(fetchAnnotation(annotationId)),
        fetchTrack: (trackId: string) => dispatch(fetchTrack(trackId)),
    });
};

const CommentShowContainer = connect(mSTP, mDTP)(CommentShow);
export default CommentShowContainer;