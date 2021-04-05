import { CLOSE_MODAL, OPEN_MODAL } from "../actions/modal_action";


const modalReducer = (state = null, action) => {
    Object.freeze(state);

    switch (action.type) {
        case OPEN_MODAL:
            return action.data;
        case CLOSE_MODAL:
            return null;
        default:
            return state;
    }
};

export default modalReducer;