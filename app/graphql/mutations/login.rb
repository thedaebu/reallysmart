class Mutations::Login < Mutations::BaseMutation
    argument :password, String, required: true
    argument :username, String, required: true

    field :user, Types::UserType, null: false
    field :errors, [String], null: false

    def resolve(username:, password:)
        user = User.find_by_credentials(username, password)
        if user
            login!(user)
            {
                user: user,
                errors: []
            }
        else
            {
                user: nil,
                errors: user.errors.full_messages
            }
        end
    end
end