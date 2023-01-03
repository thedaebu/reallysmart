# frozen_string_literal: true

module Types
  class TrackType < Types::BaseObject
    field :artist, String, null: false
    field :artwork_path, String, null: false
    field :id, ID, null: false
    field :lyrics, String, null: false
    field :spotify_path, String, null: false
    field :title, String, null: false
    field :annotations, [Types::AnnotationType], null: false
    field :comments, [Types::CommentType], null: false
    field :votes, [Types::VoteType], null: false

    def annotations
      object.annotations
    end
    def comments
      object.comments + object.annotation_comments
    end
    def votes
      object.annotation_votes + object.annotation_comment_votes + object.comment_votes
    end
  end
end
