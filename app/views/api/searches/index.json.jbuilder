@searches.each do |search|
    json.set! search.track.id do
        json.partial! 'api/tracks/track', track: search.track
    end
end