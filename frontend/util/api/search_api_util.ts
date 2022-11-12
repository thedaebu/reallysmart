import $ from "jquery";

export const fetchSearches: Function = (search: string) => (
    $.ajax({
        data: { search },
        method: "GET",
        url: `api/searches`
    })
);