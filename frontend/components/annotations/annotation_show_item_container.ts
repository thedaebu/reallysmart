import { connect } from "react-redux";
import { deleteAnnotation, fetchAnnotation, updateAnnotation } from "../../actions/annotation_actions";
import { fetchTrack } from "../../actions/track_actions";
import { Annotation, State } from "../../my_types";
import AnnotationShowItem from "./annotation_show_item";

const mSTP = (state: State) => {
    return ({
        currentUser: state.entities.user[state.session.id]
    })
};

const mDTP = (dispatch: Function) => {
    return ({
        deleteAnnotation: (annotationId: number) => dispatch(deleteAnnotation(annotationId)),
        fetchAnnotation: (annotationId: number) => dispatch(fetchAnnotation(annotationId)),
        fetchTrack: (trackId: string) => dispatch(fetchTrack(trackId)),
        updateAnnotation: (annotation: Annotation) => dispatch(updateAnnotation(annotation))
    })
};

export const AnnotationShowItemContainer = connect(mSTP, mDTP)(AnnotationShowItem);