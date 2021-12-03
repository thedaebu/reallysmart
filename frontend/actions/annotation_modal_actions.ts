export const OPEN_ANNOTATION_MODAL = "OPEN_ANNOTATION_MODAL";
export const CLOSE_ANNOTATION_MODAL = "CLOSE_ANNOTATION_MODAL";

export const openAnnotationModal = () => {
    return ({
        type: OPEN_ANNOTATION_MODAL,
    });
};

export const closeAnnotationModal = () => {
    return ({
        type: CLOSE_ANNOTATION_MODAL    
    });
};