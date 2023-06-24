import $ from "jquery";

export const fetchAccount: Function = (userId: number) => (
    $.ajax({
        method: "GET",
        url: `/api/accounts/${userId.toString()}`
    })
);