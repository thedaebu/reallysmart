class Api::AccountsController < ApplicationController
  def show
    user = User.find(params[:id])
    if user
      @account = add_account_info(user)

      result = {:account => @account}
      render json: result
    else
      render json: user.errors.full_messages, status: 422
    end
  end
end