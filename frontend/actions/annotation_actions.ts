import { Dispatch } from "react";
import { AnyAction } from "redux";
import { CreatedAnnotation, ReceivedAnnotation } from "../types_and_interfaces";
import * as AnnotationApiUtil from "./../util/annotation_api_util";

export const RECEIVE_ANNOTATION = "RECEIVE_ANNOTATION";
export const RECEIVE_ANNOTATION_ERRORS = "RECEIVE_ANNOTATION_ERRORS";

const receiveAnnotation = (receivedAnnotation: ReceivedAnnotation) => {
    return({
        type: RECEIVE_ANNOTATION,
        annotation: receivedAnnotation.annotation,
        comments: receivedAnnotation.comments      
    });
};
const receiveAnnotationErrors = (errors: Array<string>) => {
    return ({
        type: RECEIVE_ANNOTATION_ERRORS,
        errors
    });
};

export const fetchAnnotation = (annotationId: number) => (dispatch: Dispatch<AnyAction>) => {
    return (
        AnnotationApiUtil.fetchAnnotation(annotationId)
            .then((annotation: ReceivedAnnotation) => dispatch(receiveAnnotation(annotation)))
    );
};
export const createAnnotation = (annotation: CreatedAnnotation) => (dispatch: Dispatch<AnyAction>) => {
    return (
        AnnotationApiUtil.createAnnotation(annotation)
            .then((annotation: ReceivedAnnotation) => dispatch(receiveAnnotation(annotation)), errors => dispatch(receiveAnnotationErrors(errors.responseJSON)))
    );
};