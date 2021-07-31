export const fetchTracks = () => {
    return (
        $.ajax({
            method: "GET",
            url: `api/tracks`
        })
    );
};

export const fetchTrack = (trackId) => {
    return (
        $.ajax({
            method: "GET",
            url: `api/tracks/${trackId}`
        })
    );
};