export const fetchSearches = (search) => {
    return (
        $.ajax({
            method: 'GET',
            url: `api/searches`,
            data: { search }
        })
    );
};