import * as AnnotationApiUtil from './../util/annotation_api_util'

export const RECEIVE_ANNOTATION = 'RECEIVE_ANNOTATION';
export const RECEIVE_ANNOTATION_ERRORS = 'RECEIVE_ANNOTATION_ERRORS';

const receiveAnnotation = ({annotation, comments}) => {
    return({
        type: RECEIVE_ANNOTATION,
        annotation,
        comments
        
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
    debugger
    return (
        AnnotationApiUtil.createAnnotation(annotation).then(annotation => dispatch(receiveAnnotation(annotation)), errors => (dispatch(receiveAnnotationErrors(errors.responseJSON))))
    )
}