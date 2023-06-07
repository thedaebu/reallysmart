module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :account, Types::AccountType, null: false do
      argument :sessionToken, String, require: true
    end
    field :annotation, Types::AnnotationType, null: false do
      argument :id, ID, required: true
    end
    field :comment, Types::CommentType, null: false do
      argument :id, ID, required: true
    end
    field :searches, [Types::TrackType], null: false do
      argument :search, String, required: true
    end
    field :track, Types::TrackType, null: false do
      argument :id, ID, required: true
    end
    field :tracks, [Types::TrackType], null: false

    def account(sessionToken:)
      User.find_by_session_token(sessionToken)
    end
    def annotation(id:)
      Annotation.find(id)
    end
    def comment(id:)
      Comment.find(id)
    end
    def searches(search:)
      tags = Tag.where("lower(name) LIKE ?", "%#{search.downcase}%")
      result = {}
      tags.each{|tag| result[tag.track.id] = tag.track}
      result.values
    end
    def track(id:)
      Track.find(id)
    end
    def tracks
      Track.all
    end
  end
end
