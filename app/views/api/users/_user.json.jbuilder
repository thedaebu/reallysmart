json.extract! user, :id, :username

annotation_alerts = user.annotation_alerts.map do |annotation_alert|
    temp_annotation_alert = annotation_alert.slice(:created_at, :id, :read)
    temp_annotation_alert[:body] = annotation_alert.annotation.body
    temp_annotation_alert[:commenter] = annotation_alert.commenter.username
    temp_annotation_alert[:track] = annotation_alert.annotation.track.slice(:artist, :title)
    temp_annotation_alert[:type] = "AnnotationAlert"
    temp_annotation_alert
end
mentions = user.mentions.map do |mention|
    temp_mention = mention.slice(:created_at, :id, :read)
    temp_mention[:body] = mention.mentionable_type == "Annotation" ? mention.mentionable.body : ""
    temp_mention[:mentionable_type] = mention.mentionable_type
    temp_mention[:mentioner] = mention.mentioner.username
    temp_mention[:track] = mention.mentionable_type == "Track" ? mention.mentionable.slice(:artist, :title) : mention.mentionable.track.slice(:artist, :title)
    temp_mention[:type] = "Mention"
    temp_mention
end
json.notifications annotation_alerts.concat(mentions)
# json.avatar_url url_for(user.avatar)