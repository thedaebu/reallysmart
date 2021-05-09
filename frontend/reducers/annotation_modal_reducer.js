import { CLOSE_ANNOTATION_MODAL, OPEN_ANNOTATION_MODAL } from "../actions/annotation_modal_action";

const annotationModalReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case OPEN_ANNOTATION_MODAL:
            return Object.assign({}, action.data);
        case CLOSE_ANNOTATION_MODAL:
            return null;
        default:
            return state;
    }
};

export default annotationModalReducer;