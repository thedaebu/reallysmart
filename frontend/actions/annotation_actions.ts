import { Dispatch } from "react";
import { AnyAction } from "redux";
import { Annotation, CreatedAnnotation, ReceivedAnnotation, UpdatedAnnotation } from "../my_types";
import * as AnnotationAPIUtil from "../util/api/annotation_api_util";

export const RECEIVE_ANNOTATION: string = "RECEIVE_ANNOTATION";
export const REMOVE_ANNOTATION: string = "REMOVE_ANNOTATION";
export const RECEIVE_ANNOTATION_ERRORS: string = "RECEIVE_ANNOTATION_ERRORS";

const receiveAnnotation: Function = ({ annotation }: {annotation: Annotation}) => ({
    annotation,
    type: RECEIVE_ANNOTATION
});
const removeAnnotation: Function = (annotationId: number) => ({
    annotationId,
    type: REMOVE_ANNOTATION
});
const receiveAnnotationErrors: Function = (errors: Array<string>) => ({
    errors,
    type: RECEIVE_ANNOTATION_ERRORS
});

export const fetchAnnotation: Function = (annotationId: number) => (dispatch: Dispatch<AnyAction>) => (
    AnnotationAPIUtil.fetchAnnotation(annotationId)
        .then((receivedAnnotation: ReceivedAnnotation) => dispatch(receiveAnnotation(receivedAnnotation)))
);
export const createAnnotation: Function = (createdAnnotation: CreatedAnnotation) => (dispatch: Dispatch<AnyAction>) => (
    AnnotationAPIUtil.createAnnotation(createdAnnotation)
        .then((receivedAnnotation: ReceivedAnnotation) => dispatch(receiveAnnotation(receivedAnnotation)), (errors: JQuery.jqXHR) => receiveAnnotationErrors(errors.responseJSON))
);
export const updateAnnotation: Function = (updatedAnnotation: UpdatedAnnotation) => (dispatch: Dispatch<AnyAction>) => (
    AnnotationAPIUtil.updateAnnotation(updatedAnnotation)
        .then((receivedAnnotation: ReceivedAnnotation) => dispatch(receiveAnnotation(receivedAnnotation)), (errors: JQuery.jqXHR) => receiveAnnotationErrors(errors.responseJSON))
);
export const deleteAnnotation: Function = (annotationId: number) => (dispatch: Dispatch<AnyAction>) => (
    AnnotationAPIUtil.deleteAnnotation(annotationId)
        .then(() => dispatch(removeAnnotation(annotationId)), (errors: JQuery.jqXHR) => receiveAnnotationErrors(errors.responseJSON))
);