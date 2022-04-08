class Api::UsersController < ApplicationController
    def create
        created_user = User.new(user_params)
        if created_user.save
            login!(created_user)
            @user = created_user.slice(:id, :username)
            @user[:vote_ids] = []
            # avatar_url = url_for(user.avatar)

            result = {:user => @user}
            render json: result
        else
            render json: created_user.errors.full_messages, status: 422
        end
    end

    private
    # add avatar params when doing AWS
    def user_params
        params.require(:user).permit(:password, :username)
    end
end