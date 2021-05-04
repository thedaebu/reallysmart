@searches.each do |search|
    json.set! search.id do
        json.partial! 'search', search: search
    end
end