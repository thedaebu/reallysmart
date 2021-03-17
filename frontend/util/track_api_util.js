export const fetchTracks = (tracks) => (
    $.ajax({
        method: 'GET',
        url: `api/tracks`,
        data: tracks
    })
)

export const fetchTrack = (trackId) => (
    $.ajax({
        method: 'GET',
        url: `api/tracks/${trackId}`
    })
)