class Mutations::Logout < Mutations::BaseMutation
    field :errors, [String], null: false

    def resolve
        if !!current_user
            logout!
            {
                user: nil.
                errors: []
            }
        else
            {
                user: nil,
                errors: ['You are not logged in.']
            }

        end
    end

end