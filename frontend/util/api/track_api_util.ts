import $ from "jquery";

export const fetchTracks = () => {
    return (
        $.ajax({
            method: "GET",
            url: `api/tracks`
        })
    );
};
export const fetchTrack = (trackInfo: Array<string>) => {
    return (
        $.ajax({
            method: "GET",
            url: `api/tracks/:id`,
            data: { trackInfo }
        })
    );
};