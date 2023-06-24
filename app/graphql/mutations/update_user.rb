class Mutations::UpdateUser < Mutations::BaseMutation
  argument :password, String, required: true
  argument :update_info, String, required: true
  argument :update_type, String, required: true
  argument :username, String, required: true

  field :user, Types::UserType, null: false
  field :errors, [String], null: false

  def resolve(password:, update_info:, update_type:, username:)
    user = User.find_by_credentials(username, password)
    if update_type == 'username'
      if user.update(username: username)
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
    else
      if user.password=(password)
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
end