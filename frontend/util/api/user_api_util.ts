import $ from "jquery";
import { UpdatedUser } from "../../my_types";

export const updateUser: Function = (updatedUser: UpdatedUser) => (
    $.ajax({
        data: {
            updatedUser,
            authenticity_token: $('[name="csrf-token"]').attr("content")
        },
        method: "PUT",
        url: `api/users`
    })
);