import { Dispatch } from "react";
import { AnyAction } from "redux";
import * as AnnotationApiUtil from "./../util/annotation_api_util";

export const RECEIVE_ANNOTATION = "RECEIVE_ANNOTATION";
export const RECEIVE_ANNOTATION_ERRORS = "RECEIVE_ANNOTATION_ERRORS";

type ReceivedAnnotation = {
    annotation: Annotation,
    comments: ReceivedComments
}
type ReceivedComments = {
    comments: CommentKey
}
interface CommentKey {
    [key: number]: Comment
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
interface Comment {
    body: string,
    commentable_id: number,
    commenter: string,
    commenter_id: number,
    id: number,
    updated_at: string,
    votes: number
}

const receiveAnnotation = ({ annotation, comments }: { annotation: Annotation, comments: ReceivedComments }) => {
    return({
        type: RECEIVE_ANNOTATION,
        annotation,
        comments       
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
export const createAnnotation = (annotation: Annotation) => (dispatch: Dispatch<AnyAction>) => {
    return (
        AnnotationApiUtil.createAnnotation(annotation)
        .then(annotation => dispatch(receiveAnnotation(annotation)), errors => dispatch(receiveAnnotationErrors(errors.responseJSON)))
    );
};