import { connect } from "react-redux";
import { createAnnotation, fetchAnnotation } from "../../actions/annotation_actions";
import { closeAnnotationModal } from "../../actions/annotation_modal_actions";
import { fetchTrack } from "../../actions/track_actions";
import AnnotationShow from "./annotation_show";

type State = {
    entities: Entities,
    modal: Modal
}
interface Entities {
    annotations: AnnotationKey,
}
interface AnnotationKey {
    [key: number]: Annotation
}
interface Annotation {
    annotator: string,
    annotator_id: number,
    body: string,
    comment_ids: Array<number>,
    end_index: number,
    id: number,
    start_index: number,
    track_id: number,
    votes: number
}
interface Modal {
    annotationModal: boolean
}
type ownProps = {
    annotationId: number | null
}

const mSTP = (state: State, ownProps: ownProps) => {
    return ({
        annotation: ownProps.annotationId === null 
            ? null
            : state.entities.annotations[ownProps.annotationId],
        annotationModal: state.modal.annotationModal
    });
};

const mDTP = (dispatch: Function) => {
    return ({
        createAnnotation: (annotation: Annotation) => dispatch(createAnnotation(annotation)),
        fetchAnnotation: (annotationId: number) => dispatch(fetchAnnotation(annotationId)),
        fetchTrack: (trackId: string) => dispatch(fetchTrack(trackId)),
        closeAnnotationModal: () => dispatch(closeAnnotationModal())
    });
};

export default connect(mSTP, mDTP)(AnnotationShow);