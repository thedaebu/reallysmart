import $ from "jquery";
import { CreatedComment, UpdatedComment } from "../../my_types";

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
            data: {
                comment,
                authenticity_token: $('[name="csrf-token"]').attr("content")
            },
            method: "POST",
            url: `api/comments`
        })
    );
};
export const updateComment = (comment: UpdatedComment) => {
    return (
        $.ajax({
            data: {
                comment,
                authenticity_token: $('[name="csrf-token"]').attr("content")
            },
            method: "PUT",
            url: `api/comments/${comment.id.toString()}`
        })
    );
};
export const deleteComment = (commentId: number) => {
    return (
        $.ajax({
            data: {authenticity_token: $('[name="csrf-token"]').attr("content")},
            method: "DELETE",
            url: `api/comments/${commentId.toString()}`
        })
    );
};