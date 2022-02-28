import { connect } from "react-redux";
import { State } from "../../my_types";
import { closeAnnotationModal, openAnnotationModal } from "../../actions/annotation_modal_actions";
import LyricsShow from "./lyrics";

const mSTP = (state: State) => {
    return ({
        annotations: state.entities.annotations
    });
};

const mDTP = (dispatch: Function) => {
    return ({
        closeAnnotationModal: () => dispatch(closeAnnotationModal()),
        openAnnotationModal: () => dispatch(openAnnotationModal())
    });
};

const LyricsContainer = connect(mSTP, mDTP)(LyricsShow);
export default LyricsContainer;