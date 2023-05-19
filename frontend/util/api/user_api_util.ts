import $ from "jquery";
import { UpdatedUser } from "../../my_types";

export const fetchUser: Function = (sessionToken: string) => (
    $.ajax({
        data: { sessionToken },
        method: "GET",
        url: `api/users`
    })
);
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