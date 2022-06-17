import { Dispatch } from "react";
import { AnyAction } from "redux";
import { Annotation, CreatedAnnotation, ReceivedAnnotation, UpdatedAnnotation } from "../my_types";
import * as AnnotationAPIUtil from "../util/api/annotation_api_util";

export const RECEIVE_ANNOTATION = "RECEIVE_ANNOTATION";
export const RECEIVE_ANNOTATION_ERRORS = "RECEIVE_ANNOTATION_ERRORS";
export const REMOVE_ANNOTATION = "REMOVE_ANNOTATION";

const receiveAnnotation = ({ annotation }: {annotation: Annotation}) => {
    return({
        type: RECEIVE_ANNOTATION,
        annotation
    });
};
const receiveAnnotationErrors = (errors: Array<string>) => {
    return ({
        type: RECEIVE_ANNOTATION_ERRORS,
        errors
    });
};
const removeAnnotation = (annotationId: number) => {
    return ({
        type: REMOVE_ANNOTATION,
        annotationId
    });
};

export const fetchAnnotation = (annotationId: number) => (dispatch: Dispatch<AnyAction>) => {
    return (
        AnnotationAPIUtil.fetchAnnotation(annotationId)
            .then((receivedAnnotation: ReceivedAnnotation) => dispatch(receiveAnnotation(receivedAnnotation)))
    );
};
export const createAnnotation = (createdAnnotation: CreatedAnnotation) => (dispatch: Dispatch<AnyAction>) => {
    return (
        AnnotationAPIUtil.createAnnotation(createdAnnotation)
            .then((receivedAnnotation: ReceivedAnnotation) => dispatch(receiveAnnotation(receivedAnnotation)), errors => dispatch(receiveAnnotationErrors(errors.responseJSON)))
    );
};
export const updateAnnotation = (updatedAnnotation: UpdatedAnnotation) => (dispatch: Dispatch<AnyAction>) => {
    return (
        AnnotationAPIUtil.updateAnnotation(updatedAnnotation)
            .then((receivedAnnotation: ReceivedAnnotation) => dispatch(receiveAnnotation(receivedAnnotation)))
    );
};
export const deleteAnnotation = (annotationId: number) => (dispatch: Dispatch<AnyAction>) => {
    return (
        AnnotationAPIUtil.deleteAnnotation(annotationId)
            .then(() => dispatch(removeAnnotation(annotationId)))
    );
};