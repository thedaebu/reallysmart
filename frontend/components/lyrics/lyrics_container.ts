import { connect } from "react-redux";
import { State } from "../../my_types";
import { fetchAnnotation } from "../../actions/annotation_actions";
import { closeAnnotationModal, openAnnotationModal } from "../../actions/annotation_modal_actions";
import LyricsShow from "./lyrics";
import { fetchComment } from "../../actions/comment_actions";

const mSTP = (state: State) => {
    return ({
        annotations: state.entities.annotations,
        currentUser: state.entities.user[state.session.id]
    });
};
const mDTP = (dispatch: Function) => {
    return ({
        closeAnnotationModal: () => dispatch(closeAnnotationModal()),
        fetchAnnotation: (annotationId: number) => dispatch(fetchAnnotation(annotationId)),
        fetchComment: (commentId: number) => dispatch(fetchComment(commentId)),
        openAnnotationModal: () => dispatch(openAnnotationModal())
    });
};

export default connect(mSTP, mDTP)(LyricsShow);