import { connect } from "react-redux";
import { Annotation, CreatedAnnotation, State } from "../../my_types";
import { createAnnotation } from "../../actions/annotation_actions";
import { closeAnnotationModal } from "../../actions/annotation_modal_actions";
import { fetchTrack } from "../../actions/track_actions";
import AnnotationShow from "./annotation_show";

type ownProps = {
    annotationId: number
}

const mSTP = (state: State, ownProps: ownProps) => {
    const annotation: Annotation | null = ownProps.annotationId === -1 
        ? null
        : state.entities.annotations[ownProps.annotationId]
    return ({
        annotation: annotation,
        annotationModal: state.modal.annotationModal
    });
};

const mDTP = (dispatch: Function) => {
    return ({
        createAnnotation: (annotation: CreatedAnnotation) => dispatch(createAnnotation(annotation)),
        closeAnnotationModal: () => dispatch(closeAnnotationModal()),
        fetchTrack: (trackId: string) => dispatch(fetchTrack(trackId))
    });
};

export default connect(mSTP, mDTP)(AnnotationShow);