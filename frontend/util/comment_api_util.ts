import { CreatedComment } from "../my_types";

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