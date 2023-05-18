class User < ApplicationRecord
  validates_presence_of :password_digest, :session_token, :username
  validates :password, allow_nil: true, length: { in: 6..20 }, format: { with: /\A[a-z0-9A-Z ]+\z/ }
  validates :username, format: { with: /\A[a-z0-9A-Z ]+\z/ }, length: { in: 6..20 }, uniqueness: true

  attr_reader :password

  after_initialize :ensure_session_token

  has_many :annotations, foreign_key: :annotator_id, class_name: "Annotation"
  has_many :annotation_alerts, through: :annotations, source: :alerts
  has_many :comments, foreign_key: :commenter_id, class_name: "Comment"
  has_many :mentions, foreign_key: :mentionee_id, class_name: "Mention"
  has_many :mentioneds, foreign_key: :mentioner_id, class_name: "Mention"
  has_many :votes, foreign_key: :voter_id, class_name: "Vote"

  def self.add_notifications(user)
    user_with_notifications = user.slice(:id, :username)
    annotation_alerts = user.annotation_alerts.map do |annotation_alert|
      annotation = annotation_alert.annotation
      temp_annotation_alert = annotation_alert.slice(:created_at, :id, :read)

      temp_annotation_alert[:body] = annotation.body
      temp_annotation_alert[:commenter_name] = annotation_alert.commenter.username
      temp_annotation_alert[:track] = annotation.track.slice(:artist, :title)
      temp_annotation_alert[:type] = 'AnnotationAlert'

      temp_annotation_alert
    end
    mentions = user.mentions.map do |mention|
      comment = mention.comment
      commentable_type = comment.commentable_type
      temp_mention = mention.slice(:created_at, :id, :read)

      temp_mention[:body] = commentable_type == 'Track' ? '' : comment.commentable.body
      temp_mention[:mentioner_name] = mention.mentioner.username
      temp_mention[:track] = commentable_type == 'Track' ? comment.commentable.slice(:artist, :title) : comment.commentable.track.slice(:artist, :title)
      temp_mention[:type] = 'Mention'

      temp_mention
    end
    user_with_notifications[:annotation_alerts] = annotation_alerts
    user_with_notifications[:mentions] = mentions

    user_with_notifications
  end

  def self.add_account_info(user)
    user_with_account_info = user.slice(:id, :username)
    annotations = user.annotations.map do |annotation|
      temp_annotation = annotation.as_json

      temp_annotation[:body] = annotation.body
      temp_annotation[:track] = annotation.track.slice(:artist, :title)

      temp_annotation
    end
    comments = user.comments.map do |comment|
      commentable_type = comment.commentable_type
      temp_comment = comment.as_json

      temp_comment[:body] = comment.body
      temp_comment[:commentable_body] = commentable_type == "Track" ? "" : comment.commentable.body
      temp_comment[:commentable_type] = comment.commentable_type
      temp_comment[:track] = commentable_type == "Track" ? comment.commentable.slice(:artist, :title) : comment.commentable.track.slice(:artist, :title)

      temp_comment
    end
    user_with_account_info[:annotations] = annotations
    user_with_account_info[:comments] = comments

    user_with_account_info
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end