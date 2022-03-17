const $ = require("jquery");
import { CreatedComment, UpdatedComment } from "../my_types";

export const fetchComment = (commentId: number) => {
    return (
        $.ajax({
            method: "GET",
            url: `api/comments/${commentId.toString()}`
        })
    );
};
export const createComment = (comment: CreatedComment) => {
    return (
        $.ajax({
            method: "POST",
            url: `api/comments`,
            data: { comment }
        })
    );
};
export const updateComment = (comment: UpdatedComment) => {
    return (
        $.ajax({
            method: "PUT",
            url: `api/comments/${comment.id.toString()}`,
            data: { comment }
        })
    );
}
export const deleteComment = (commentId: number) => {
    return (
        $.ajax({
            method: "DELETE",
            url: `api/comments/${commentId.toString()}`
        })
    );
}