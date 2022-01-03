import { connect } from "react-redux";
import { CreatedAnnotation, State } from "../../my_types";
import { createAnnotation } from "../../actions/annotation_actions";
import { closeAnnotationModal } from "../../actions/annotation_modal_actions";
import { fetchTrack } from "../../actions/track_actions";
import AnnotationShow from "./annotation_show";
import { fetchComment } from "../../actions/comment_actions";

const mSTP = (state: State) => {
    return ({
        annotationModal: state.modal.annotationModal
    });
};

const mDTP = (dispatch: Function) => {
    return ({
        createAnnotation: (annotation: CreatedAnnotation) => dispatch(createAnnotation(annotation)),
        closeAnnotationModal: () => dispatch(closeAnnotationModal()),
        fetchComment: (commentId: number) => dispatch(fetchComment(commentId)),
        fetchTrack: (trackId: string) => dispatch(fetchTrack(trackId))
    });
};

export default connect(mSTP, mDTP)(AnnotationShow);