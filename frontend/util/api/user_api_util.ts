import $ from "jquery";

export const fetchUser: Function = (sessionToken: string) => (
    $.ajax({
        data: { sessionToken },
        method: "GET",
        url: `api/users`
    })
);