// const $ = require("jquery");
import { SessionUser } from "../my_types";

export const login = (user: SessionUser) => {
    return (
        $.ajax({
            method: "POST",
            url: "/api/session",
            data: { user }
        })
    );
};
export const signup = (user: SessionUser) => {
    return (
        $.ajax({
            method: "POST",
            url: "/api/users",
            data: { user }
        })
    );
};
export const logout = () => {
    return (
        $.ajax({
            method: "DELETE",
            url: "/api/session"
        })
    );
};
