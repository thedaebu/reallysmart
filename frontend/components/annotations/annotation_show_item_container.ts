import { connect } from "react-redux";
import { deleteAnnotation, updateAnnotation } from "../../actions/annotation_actions";
import { fetchTrack } from "../../actions/track_actions";
import { State, UpdatedAnnotation } from "../../my_types";
import AnnotationShowItem from "./annotation_show_item";

const mSTP = (state: State) => {
    return ({
        currentUser: state.entities.user[state.session.id]
    })
};

const mDTP = (dispatch: Function) => {
    return ({
        deleteAnnotation: (annotationId: number) => dispatch(deleteAnnotation(annotationId)),
        fetchTrack: (trackId: string) => dispatch(fetchTrack(trackId)),
        updateAnnotation: (annotation: UpdatedAnnotation) => dispatch(updateAnnotation(annotation))
    })
};

export const AnnotationShowItemContainer = connect(mSTP, mDTP)(AnnotationShowItem);