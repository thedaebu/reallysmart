module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # UserType
    field :users, [Types::UserType], null: false
    def users
      User.all
    end
    field :user, Types::UserType, null: false do
      argument :id, ID, required: true
    end
    def user(id:)
      User.find(id)
    end

    # TrackType
    field :tracks, [Types::TrackType], null: false
    def tracks
      Track.all
    end
    field :track, Types::TrackType, null: false do
      argument :id, ID, required: true
    end
    def track(id:)
      Track.find(id)
    end

    # AnnotationType
    field :annotation, Types::AnnotationType, null: false do
      argument :id, ID, required: true
    end
    def annotation(id:)
      Annotation.find(id)
    end

    # CommentType
    field :comment, Types::CommentType, null: false do
      argument :id, ID, required: true
    end
    def comment(id:)
      Comment.find(id)
    end

    # VoteType
    field :vote, Types::VoteType, null: false do 
      argument :id, ID, required: true
    end
    def vote(id:)
      Vote.find(id)
    end

    # TagType
    
  end
end
