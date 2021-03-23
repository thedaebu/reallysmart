json.track do
    json.partial! '/api/tracks/track', track: @track
end

json.annotations @track.annotations

json.comments @track.comments