class Mutations::DeleteAnnotation < Mutations::BaseMutation
    argument :id, ID, required: true

    field :annotation, Types::AnnotationType, null: false
    field :errors, [String], null: false

    def resolve(id:)
        annotation = Annotation.find(id)
        if annotation.destroy
            {
                annotation: annotation,
                errors: []
            }
        else
            {
                annotation: nil,
                errors: annotation.errors.full_messages
            }
        end
    end
end