import { connect } from "react-redux";
import { State } from "../../my_types";
import { fetchAnnotation } from "../../actions/annotation_actions";
import { closeAnnotationModal, openAnnotationModal } from "../../actions/annotation_modal_actions";
import LyricsShow from "./lyrics_show";

const mSTP = (state: State) => {
    return ({
        annotations: state.entities.annotations,
        currentUser: state.entities.users[state.session.id]
    });
};

const mDTP = (dispatch: Function) => {
    return ({
        closeAnnotationModal: () => dispatch(closeAnnotationModal()),
        fetchAnnotation: (annotationId: number) => dispatch(fetchAnnotation(annotationId)),
        openAnnotationModal: () => dispatch(openAnnotationModal())
    });
};

export default connect(mSTP, mDTP)(LyricsShow);