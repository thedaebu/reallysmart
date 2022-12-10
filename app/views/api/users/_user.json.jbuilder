json.extract! user, :id, :username
json.notifications user.annotation_notifications
# json.avatar_url url_for(user.avatar)