class Api::AnnotationsController < ApplicationController
  def show
    user = User.find_by_session_token(params[:sessionToken])
    if user
      @account = User.add_account_info(user)

      result = {:account => @account}
      render json: result
    else
      render json: user.errors.full_messages, status: 422
    end
  end
end