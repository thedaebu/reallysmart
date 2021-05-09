import { CLOSE_SEARCHBAR_MODAL, OPEN_SEARCHBAR_MODAL } from "../actions/searchbar_modal_actions";

const searchbarModalReducer = (state = {}, action) => {
    Object.freeze(state);

    switch(action.type) {
        case OPEN_SEARCHBAR_MODAL:
            return action.data;
        case CLOSE_SEARCHBAR_MODAL:
            return null;
        default:
            return state;
    }
};

export default searchbarModalReducer;