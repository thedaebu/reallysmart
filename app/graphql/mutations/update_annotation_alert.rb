class Mutations::UpdateAnnotationAlert < Mutations::BaseMutation
    argument :id, ID, required: true

    field :annotation_alert, Types::AnnotationAlertType, null: false
    field :errors, [String], null: false

    def resolve(id:)
        annotation_alert = AnnotationAlert.find(id)
        annotation_alert[:read] = true
        if annotation_alert.save
            {
                annotation_alert: annotation_alert,
                errors: []
            }
        else
            {
                annotation_alert: nil,
                errors: annotation_alert.errors.full_messages
            }
        end
    end
end