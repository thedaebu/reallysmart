import { connect } from "react-redux";
import { Annotation, State } from "../../my_types";
import { deleteAnnotation, updateAnnotation } from "../../actions/annotation_actions";
import AnnotationShowItem from "./annotation_show_item";
import { fetchTrack } from "../../util/track_api_util";
import { fetchAnnotation } from "../../util/annotation_api_util";

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