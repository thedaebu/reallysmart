json.annotation do
    json.partial! '/api/annotations/annotation', annotation: @annotation
end

json.votes Hash.new()
json.votes do
    @annotation.votes.each do |vote|
        json.set! vote.id do
            json.partial! 'api/votes/vote', vote: vote
        end
    end
end