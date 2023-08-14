class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?

  private
  def current_user
    return nil unless session[:session_token]
    if user = User.find_by_session_token(session[:session_token])
      cookies['user_id'] = user.id
    end
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def login!(user)
    user.reset_session_token!
    session[:session_token] = user[:session_token]
    @current_user = user
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def ensure_logged_in
    unless logged_in?
      render json: ["Invalid Credentials"], :status => 422
    end
  end

  def create_notifications(comment)
    if comment.commentable_type === "Annotation"
      annotation_alert = AnnotationAlert.new(
        annotation_id: comment.commentable.id,
        comment_id: comment.id,
        read: false
      )
      if annotation_alert.annotation.annotator.id != annotation_alert.commenter.id && annotation_alert.save
        user = annotation_alert.annotation.annotator
        broadcast_annotation_alert(user, annotation_alert)
      end
    end
    mentionees = check_for_mentions(comment.body)
    if mentionees.length > 0
      mentionees.each do |mentionee|
        mention = Mention.new(
          comment_id: comment.id,
          mentionee_id: User.find_by_username(mentionee).id,
          mentioner_id: comment.commenter.id,
          read: false
        )
        if mentionee != comment.commenter.username && mention.save
          user = mention.mentionee
          broadcast_mention(user, mention)
        end
      end
    end
  end

  def check_for_mentions(body)
      mentionees = []
      alphanumeric = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      index = 0
      while index < body.length
        if body[index] == "@"
          index += add_mention(alphanumeric, mentionees, index + 1, body)
        end
        index += 1
      end

      mentionees
  end

  def add_mention(alphanumeric, mentionees, start_index, body)
    index = start_index + 1
    while index < body.length
      if alphanumeric.include?(body[index])
        index += 1
      else
        break
      end
    end
    username = body.slice(start_index..index-1)
    if username.length > 5 && User.find_by_username(username)
      mentionees << username
    end

    username.length
  end

  def broadcast_annotation_alert(user, annotation_alert)
    annotation = annotation_alert.annotation

    temp_annotation_alert = annotation_alert.slice(:created_at, :id, :read)
    temp_annotation_alert[:body] = annotation.body
    temp_annotation_alert[:commenter_name] = annotation_alert.commenter.username
    temp_annotation_alert[:track] = annotation.track.slice(:artist, :title)
    temp_annotation_alert[:type] = "AnnotationAlert"

    NotificationChannel.broadcast_to(user, {notification: temp_annotation_alert})
  end

  def broadcast_mention(user, mention)
    comment = mention.comment
    commentable_type = comment.commentable_type

    temp_mention = mention.slice(:created_at, :id, :read)
    temp_mention[:body] = commentable_type == "Track" ? "" : comment.commentable.body
    temp_mention[:commentable_type] = commentable_type
    temp_mention[:mentioner_name] = mention.mentioner.username
    temp_mention[:track] = commentable_type == "Track" ? comment.commentable.slice(:artist, :title) : comment.commentable.track.slice(:artist, :title)
    temp_mention[:type] = "Mention"

    NotificationChannel.broadcast_to(user, {notification: temp_mention})
  end

  def broadcast_annotation(annotation, operation)
    broadcast_data = {}
    temp_annotation = annotation.as_json
    temp_annotation[:annotator_name] = annotation.annotator.username
    temp_annotation[:votes] = {}
    annotation.votes.each do |vote|
      temp_annotation[:votes][vote.id] = vote.slice(:id, :voteable_id, :voteable_type, :voter_id)
    end
    broadcast_data[:annotation_data] = temp_annotation
    broadcast_data[:comment_data] = {}
    broadcast_data[:model] = "Annotation"
    broadcast_data[:operation] = operation

    TrackChannel.broadcast_to(annotation.track, broadcast_data)
  end

  def broadcast_comment(comment, operation)
    broadcast_data = {}
    temp_comment = comment.as_json
    temp_comment[:commenter_name] = comment.commenter.username
    temp_comment[:votes] = {}
    comment.votes.each do |vote|
      temp_comment[:votes][vote.id] = vote.slice(:id, :voteable_id, :voteable_type, :voter_id)
    end
    broadcast_data[:annotation_data] = {}
    broadcast_data[:comment_data] = temp_comment
    broadcast_data[:model] = "Comment"
    broadcast_data[:operation] = operation

    commentable = comment.commentable_type == "Track" ? comment.commentable : comment.commentable.track

    TrackChannel.broadcast_to(commentable, broadcast_data)
  end
end