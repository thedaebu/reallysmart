import $ from "jquery";

export const fetchTracks: Function = () => (
    $.ajax({
        method: "GET",
        url: `api/tracks`
    })
);
export const fetchTrack: Function = (trackInfo: Array<string>) => (
    $.ajax({
        data: { trackInfo },
        method: "GET",
        url: `api/tracks/:id`
    })
);