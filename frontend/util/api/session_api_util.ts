import $ from "jquery";
import { SessionUser } from "../../my_types";

export const login: Function = (user: SessionUser) => (
    $.ajax({
        data: {
            user,
            authenticity_token: $('[name="csrf-token"]').attr("content")
        },
        method: "POST",
        url: "/api/session"
    })
);
export const signup: Function = (user: SessionUser) => (
    $.ajax({
        data: { 
            user,
            authenticity_token: $('[name="csrf-token"]').attr("content")
        },
        method: "POST",
        url: "/api/users"
    })
);
export const logout: Function = () => (
    $.ajax({
        data: {authenticity_token: $('[name="csrf-token"]').attr("content")},
        method: "DELETE",
        url: "/api/session"
    })
);