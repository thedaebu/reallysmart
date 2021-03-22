import * as AnnotationApiUtil from './../util/annotation_util'

export const RECEIVE_ANNOTATION = 'RECEIVE_ANNOTATION';
export const CREATE_ANNOTATION = 'CREATE_ANNOTATION';
export const RECEIVE_ANNOTATION_ERRORS = 'RECEIVE_ANNOTATION_ERRORS';

const receiveAnnotation = (annotation) => {
    return({
        type: RECEIVE_ANNOTATION,
        annotation
    })
};

const receiveAnnotationErrors = (errors) => {
    return ({
        type: RECEIVE_ANNOTATION_ERRORS,
        errors
    })
}

export const fetchAnnotation = annotationId => dispatch => {
    return (
        AnnotationApiUtil.fetchAnnotation(annotationId).then(annotation => dispatch(receiveAnnotation(annotation)))
    )
}

export const createAnnotation = annotation => dispatch => {
    return (
        AnnotationApiUtil.fetchAnnotation(annotation).then(annotation => dispatch(receiveAnnotation(annotation)), errors => (dispatch(receiveAnnotationErrors(errors.responseJSON))))
    )
}