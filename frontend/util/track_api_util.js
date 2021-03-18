export const fetchTracks = () => (
    $.ajax({
        method: 'GET',
        url: `api/tracks`,
        
    })
)

export const fetchTrack = (trackId) => (
    $.ajax({
        method: 'GET',
        url: `api/tracks/${trackId}`
    })
)