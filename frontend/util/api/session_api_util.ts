import $ from "jquery";
import { SessionUser } from "../../my_types";

export const login = (user: SessionUser) => {
    return (
        $.ajax({
            data: { 
                user,
                authenticity_token: $('[name="csrf-token"]').attr("content")
            },
            method: "POST",
            url: "/api/session"
        })
    );
};
export const signup = (user: SessionUser) => {
    return (
        $.ajax({
            data: { 
                user,
                authenticity_token: $('[name="csrf-token"]').attr("content")
            },
            method: "POST",
            url: "/api/users"
        })
    );
};
export const logout = () => {
    return (
        $.ajax({
            method: "DELETE",
            url: "/api/session",
            data: { authenticity_token: $('[name="csrf-token"]').attr("content") }
        })
    );
};
