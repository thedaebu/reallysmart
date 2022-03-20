// const $ = require("jquery");

export const fetchTracks = () => {
    return (
        $.ajax({
            method: "GET",
            url: `api/tracks`
        })
    );
};
export const fetchTrack = (trackId: string) => {
    return (
        $.ajax({
            method: "GET",
            url: `api/tracks/${trackId}`
        })
    );
};