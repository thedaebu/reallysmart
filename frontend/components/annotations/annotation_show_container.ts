import { connect } from "react-redux";
import { CreatedAnnotation, State } from "../../my_types";
import { createAnnotation } from "../../actions/annotation_actions";
import { closeAnnotationModal } from "../../actions/annotation_modal_actions";
import { fetchComment } from "../../actions/comment_actions";
import { fetchTrack } from "../../actions/track_actions";
import AnnotationShow from "./annotation_show";

const mSTP = (state: State) => {
    return ({
        annotationModal: state.modal.annotationModal,
        currentUser: state.entities.user[state.session.id]
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

const AnnotationShowContainer = connect(mSTP, mDTP)(AnnotationShow);
export default AnnotationShowContainer;