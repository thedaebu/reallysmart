class Api::SessionsController < ApplicationController
  def create
    user_info = params[:user]
    user = User.find_by_credentials(user_info[:username], user_info[:password])
    if user
      login!(user)
      @user = User.add_notifications(user)

      result = {:user => @user}
      render json: result
    else
      render json: ['Invalid credentials'], status: 401
    end
  end

  def destroy
    if !!current_user
      logout!
      render json: {}
    else
      render json: ['You are not logged in.'], status: 404
    end
  end
end