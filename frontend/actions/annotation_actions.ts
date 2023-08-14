import { Dispatch } from "react";
import * as AnnotationAPIUtil from "../util/api/annotation_api_util";
import { Annotation, AnnotationAction, CreatedAnnotation, ReceivedAnnotation, UpdatedAnnotation } from "../my_types";

export const RECEIVE_ANNOTATION: string = "RECEIVE_ANNOTATION";
export const RECEIVE_ANNOTATION_ERRORS: string = "RECEIVE_ANNOTATION_ERRORS";
export const REMOVE_ANNOTATION: string = "REMOVE_ANNOTATION";

export const receiveAnnotation: Function = ({ annotation }: { annotation: Annotation; }, flashMessage: string = "") => ({
    annotation,
    flashMessage,
    type: RECEIVE_ANNOTATION
});
const receiveAnnotationErrors: Function = (errors: Array<string>) => ({
    errors,
    type: RECEIVE_ANNOTATION_ERRORS
});
export const removeAnnotation: Function = (annotationId: number, flashMessage = "") => ({
    annotationId,
    flashMessage,
    type: REMOVE_ANNOTATION
});

export const createAnnotation: Function = (createdAnnotation: CreatedAnnotation) => (dispatch: Dispatch<AnnotationAction>) => (
    AnnotationAPIUtil.createAnnotation(createdAnnotation)
        .then((receivedAnnotation: ReceivedAnnotation) => dispatch(receiveAnnotation(receivedAnnotation, "Annotation Creation Successful.")), (errors: JQuery.jqXHR) => receiveAnnotationErrors(errors.responseJSON))
);
export const deleteAnnotation: Function = (annotationId: number) => (dispatch: Dispatch<AnnotationAction>) => (
    AnnotationAPIUtil.deleteAnnotation(annotationId)
        .then(() => dispatch(removeAnnotation(annotationId, "Annotation Deletion Successful.")), (errors: JQuery.jqXHR) => receiveAnnotationErrors(errors.responseJSON))
);
export const fetchAnnotation: Function = (annotationId: number) => (dispatch: Dispatch<AnnotationAction>) => (
    AnnotationAPIUtil.fetchAnnotation(annotationId)
        .then((receivedAnnotation: ReceivedAnnotation) => dispatch(receiveAnnotation(receivedAnnotation)))
);
export const updateAnnotation: Function = (updatedAnnotation: UpdatedAnnotation) => (dispatch: Dispatch<AnnotationAction>) => (
    AnnotationAPIUtil.updateAnnotation(updatedAnnotation)
        .then((receivedAnnotation: ReceivedAnnotation) => dispatch(receiveAnnotation(receivedAnnotation, "Annotation Update Successful.")), (errors: JQuery.jqXHR) => receiveAnnotationErrors(errors.responseJSON))
);