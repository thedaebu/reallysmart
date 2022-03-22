// const $ = require("jquery");

export const fetchSearches = (search: string) => {
    return (
        $.ajax({
            method: "GET",
            url: `api/searches`,
            data: { search }
        })
    );
};