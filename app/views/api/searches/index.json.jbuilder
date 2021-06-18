@searches.each do |search|
    json.set! search.track.id do
        json.partial! 'search', search: search
    end
end