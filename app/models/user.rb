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

    # has_one_attached :avatar

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