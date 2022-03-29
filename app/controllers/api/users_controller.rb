class Api::UsersController < ApplicationController
    def create 
        user = User.new(user_params)
        if user.save
            login!(user)
            @user = user.slice(:id, :username)
            @user[:votes_ids] = []
            # avatar_url = url_for(user.avatar)

            result = {:user => @user}
            render json: result
        else
            render json: user.errors.full_messages, status: 422
        end
    end

    private 
    # add avatar params when doing AWS
    def user_params
        params.require(:user).permit(:password, :username)
    end
end