import { RECEIVE_TRACK } from "../actions/track_actions"
import { RECEIVE_ANNOTATION } from "../actions/annotation_actions";
import { RECEIVE_COMMENT } from "../actions/comment_actions";

const commentsReducer = (state = {}, action) => {
    Object.freeze(state);
    let comments = {}

    switch (action.type) {
        case RECEIVE_TRACK:
            action.comments.forEach((comment)=>{
                comments[comment.id] = comment
            })  

            return Object.assign({}, state, comments)
           
        case RECEIVE_ANNOTATION:
            action.comments.forEach((comment)=>{
                comments[comment.id] = comment
            })  

            return Object.assign({}, state, comments)

        case RECEIVE_COMMENT:
            return Object.assign({}, state, {[action.comment.id]: action.comment})
        default:
            return state;
    }
}

export default commentsReducer;