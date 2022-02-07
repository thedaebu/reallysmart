import { connect } from "react-redux";
import { Annotation, State } from "../../my_types";
import { deleteAnnotation, updateAnnotation } from "../../actions/annotation_actions";
import AnnotationShowItem from "./annotation_show_item";

const mSTP = (state: State) => {
    return ({
        currentUser: state.entities.user[state.session.id]
    })
};

const mDTP = (dispatch: Function) => {
    return ({
        updateAnnotation: (annotation: Annotation) => dispatch(updateAnnotation(annotation)),
        deleteAnnotation: (annotationId: number) => dispatch(deleteAnnotation(annotationId))
    })
};

export const AnnotationShowItemContainer = connect(mSTP, mDTP)(AnnotationShowItem);