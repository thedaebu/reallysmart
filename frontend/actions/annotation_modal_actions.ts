export const OPEN_ANNOTATION_MODAL: string = "OPEN_ANNOTATION_MODAL";
export const CLOSE_ANNOTATION_MODAL: string = "CLOSE_ANNOTATION_MODAL";

export const openAnnotationModal: Function = () => ({
    type: OPEN_ANNOTATION_MODAL
});
export const closeAnnotationModal: Function = () => ({
    type: CLOSE_ANNOTATION_MODAL
});