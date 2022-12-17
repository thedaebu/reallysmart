json.extract! user, :id, :username
json.notifications (user.annotation_notifications) do |notification|
    json.body notification.annotation.body
    json.commenter notification.commenter.username
    json.created_at notification.created_at
    json.read notification.read
    json.track notification.annotation.track.slice(:artist, :title)
end
# json.avatar_url url_for(user.avatar)