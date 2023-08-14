import { RECEIVE_ANNOTATION, REMOVE_ANNOTATION } from "../actions/annotation_actions";
import { RECEIVE_TRACK, RECEIVE_TRACKS } from "../actions/track_actions";
import { AnyAction } from "@reduxjs/toolkit";
import { Annotation } from "../my_types";

const annotationsReducer = (state: { [key: number]: Annotation; } = {}, action: AnyAction) => {
    Object.freeze(state);
    const newState: { [key: number]: Annotation; } = {...state};

    switch (action.type) {
        case RECEIVE_ANNOTATION:
            return {...newState, [action.annotation.id]: action.annotation};
        case RECEIVE_TRACK:
            return action.annotations;
        case RECEIVE_TRACKS:
            return {};
        case REMOVE_ANNOTATION:
            delete newState[action.annotationId];
            return newState;
        default:
            return state;
    }
};

export default annotationsReducer;