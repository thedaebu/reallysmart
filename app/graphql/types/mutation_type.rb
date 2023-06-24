module Types
  class MutationType < Types::BaseObject
    field :create_annotation, mutation: Mutations::CreateAnnotation
    field :create_comment, mutation: Mutations::CreateComment
    field :create_user, mutation: Mutations::CreateUser
    field :create_vote, mutation: Mutations::CreateVote
    field :delete_annotation, mutation: Mutations::DeleteAnnotation
    field :delete_comment, mutation: Mutations::DeleteComment
    field :delete_vote, mutation: Mutations::DeleteVote
    field :update_annotation, mutation: Mutations::UpdateAnnotation
    field :update_annotation_alert, mutation: Mutations::UpdateAnnotationAlert
    field :update_comment, mutation: Mutations::UpdateComment
    field :update_mention, mutation: Mutations::UpdateMention
    field :update_user, mutation: Mutations::UpdateUser
  end
end
