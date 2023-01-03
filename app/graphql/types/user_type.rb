# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    field :annotation_alerts, [Types::AnnotationAlertType], null: false
    field :id, ID, null: false
    field :mentions, [Types::MentionType], null: false
    field :username, String, null: false
    field :vote_ids, [Integer], null: false
    
    def vote_ids
      object.votes.map{|vote| vote.id}
    end
  end
end
