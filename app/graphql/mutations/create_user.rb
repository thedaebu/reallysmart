class Mutations::CreateUser < Mutations::BaseMutation
    argument :password, String, required: true
    argument :username, String, required: true

    field :user, Types::UserType, null: false
    field :errors, [String], null: false

    def resolve(password:, username:)
        user = User.new(password: password, username: username)
        if user.save()
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