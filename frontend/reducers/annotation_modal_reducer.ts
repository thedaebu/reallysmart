import { CLOSE_ANNOTATION_MODAL, OPEN_ANNOTATION_MODAL } from "../actions/annotation_modal_actions";
import { Action } from "../my_types";

const annotationModalReducer = (state: boolean = false, action: Action) => {
    Object.freeze(state);

    switch (action.type) {
        case OPEN_ANNOTATION_MODAL:
            return true;
        case CLOSE_ANNOTATION_MODAL:
            return false;
        default:
            return false;
    }
};

export default annotationModalReducer;