import $ from "jquery";
import { CreatedComment, UpdatedComment } from "../../my_types";

export const fetchComment: Function = (commentId: number) => (
    $.ajax({
        method: "GET",
        url: `api/comments/${commentId.toString()}`
    })
);
export const createComment: Function = (comment: CreatedComment) => (
    $.ajax({
        data: {
            comment,
            authenticity_token: $('[name="csrf-token"]').attr("content")
        },
        method: "POST",
        url: `api/comments`
    })
);
export const updateComment: Function = (comment: UpdatedComment) => (
    $.ajax({
        data: {
            comment,
            authenticity_token: $('[name="csrf-token"]').attr("content")
        },
        method: "PUT",
        url: `api/comments/${comment.id.toString()}`
    })
);
export const deleteComment: Function = (commentId: number) => (
    $.ajax({
        data: {authenticity_token: $('[name="csrf-token"]').attr("content")},
        method: "DELETE",
        url: `api/comments/${commentId.toString()}`
    })
);