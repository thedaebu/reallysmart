class Api::UsersController < ApplicationController
  def create
    created_user = User.new(user_params)
    if created_user.save
      login!(created_user)
      @user = add_notifications(created_user)

      result = {:user => @user}
      render json: result
    else
      render json: created_user.errors.full_messages, status: 422
    end
  end

  def update
    user_info = params[:updatedUser]
    updated_user = User.find_by_credentials(user_info[:username], user_info[:password])
    if updated_user
      if user_info[:updateType] == 'updateUsername'
        if updated_user.update(username: user_info[:updateInfo])
          @user = add_notifications(updated_user)

          result = {:user => @user}
          render json: result
        else
          render json: updated_user.errors.full_messages, status: 422
        end
      else
        if updated_user.update(password: user_info[:updateInfo])
          @user = add_notifications(updated_user)

          result = {:user => @user}
          render json: result
        else
          render json: updated_user.errors.full_messages, status: 422
        end
      end
    else
      render json: updated_user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:password, :username)
  end
end