class Mutations::DeleteAnnotation < Mutations::BaseMutation
    argument :id, Integer, required: true

    field :errors, [String], null: false

    def resolve(id:)
        annotation = Annotation.find(id)
        if annotation
            annotation.destroy
            {
                errors: []
            }
        else
            {
                errors: ['The annotation does not exist.']
            }
        end
    end
end