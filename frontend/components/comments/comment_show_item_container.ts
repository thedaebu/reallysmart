import { connect } from "react-redux";
import { fetchAnnotation } from "../../actions/annotation_actions";
import { deleteComment, updateComment } from "../../actions/comment_actions";
import { fetchTrack } from "../../actions/track_actions";
import { State, UpdatedComment } from "../../my_types";
import CommentShowItem from "./comment_show_item";

const mSTP = (state: State) => {
    return({
        currentUser: state.entities.user[state.session.id]
    })
};

const mDTP = (dispatch: Function) => {
    return ({
        deleteComment: (commentId: number) => dispatch(deleteComment(commentId)),
        fetchAnnotation: (annotationId: number) => dispatch(fetchAnnotation(annotationId)),
        fetchTrack: (trackId: string) => dispatch(fetchTrack(trackId)),
        updateComment: (comment: UpdatedComment) => dispatch(updateComment(comment))
    })
};


const CommentShowItemContainer = connect(mSTP, mDTP)(CommentShowItem);
export default CommentShowItemContainer