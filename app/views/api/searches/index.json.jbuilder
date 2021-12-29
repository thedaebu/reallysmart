@searches.each do |search|
    json.set! search.track.id do
        json.partial! 'api/searches/search', search: search
    end
end