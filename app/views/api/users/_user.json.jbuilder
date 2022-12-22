json.extract! user, :id, :username

annotation_alerts = user.annotation_alerts.map do |notification|
    temp = notification.slice(:created_at, :id, :read)
    temp[:body] = notification.annotation.body
    temp[:commenter] = notification.commenter.username
    temp[:track] = notification.annotation.track.slice(:artist, :title)
    temp[:type] = "AnnotationAlert"
    temp
end
mentions = user.mentions.map do |notification|
    temp = notification.slice(:created_at, :id, :read)
    temp[:body] = notification.mentionable_type == "Annotation" ? notification.mentionable.body : ""
    temp[:mentionable_type] = notification.mentionable_type
    temp[:mentioner] = notification.mentioner.username
    temp[:track] = notification.mentionable_type == "Track" ? notification.mentionable.slice(:artist, :title) : notification.mentionable.track.slice(:artist, :title)
    temp[:type] = "Mention"
    temp
end
json.notifications annotation_alerts.concat(mentions)
# json.avatar_url url_for(user.avatar)