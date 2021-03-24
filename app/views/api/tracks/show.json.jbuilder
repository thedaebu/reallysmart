json.track do
    json.partial! '/api/tracks/track', track: @track
end

# json.annotations @track.annotations

# json.annotations track.annotations.map{|annotation| annotation }

json.annotations Hash.new()
json.annotations do
  @track.annotations.each do |annotation|
    json.set! annotation.id do
      json.extract! annotation, :id, :body, :annotator_id, :track_id, :start_index, :end_index
      json.annotator annotation.annotator.username
    end
  end  
end




json.comments @track.comments

json.annotators Hash.new()
json.annotators do
  @track.annotations.each do |annotation|
    json.set! annotation.annotator.id do
      json.extract! annotation.annotator, :id, :username
    end
  end
end