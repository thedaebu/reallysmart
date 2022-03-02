class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
        if @user.nil?
            render json: ["Invalid credentials"], status: 401
        else
            login!(@user)
            @votes = @user.votes
            render 'api/users/show';
        end
    end

    def destroy
        if !!current_user
            logout!
            return render json: {}
        end
        render json: ['You are not logged in.'], status: 404
    end
end