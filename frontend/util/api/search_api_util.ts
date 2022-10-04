import $ from "jquery";

export const fetchSearches = (search: string) => {
    return (
        $.ajax({
            data: { search },
            method: "GET",
            url: `api/searches`
        })
    );
};