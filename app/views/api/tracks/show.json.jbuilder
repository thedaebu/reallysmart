json.track do
    json.partial! '/api/tracks/track', track: @track
end

json.annotations Hash.new()
json.annotations do
    @annotations.each do |annotation|
        json.set! annotation.id do
            json.partial! 'api/annotations/annotation', annotation: annotation
        end
    end
end

json.comments Hash.new()
json.comments do
    @comments.each do |comment|
        json.set! comment.id do
            json.partial! 'api/comments/comment', comment: comment
        end
    end
end

json.votes Hash.new()
json.votes do
    @track.annotation_votes.each do |vote|
        json.set! vote.id do
            json.partial! 'api/votes/vote', vote: vote
        end
    end
end