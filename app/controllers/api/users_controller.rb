class Api::UsersController < ApplicationController
    def show
        user = User.find(params[:id])
        if user
            @user = user.slice(:id, :username).as_json
            annotation_notifications = user.annotation_notifications
            annotation_notifications.map! do |notification|
                temp = notification.slice(:created_at, :read).as_json
                temp[:body] = notification.annotation.body
                temp[:commenter] = notification.commenter.username
                temp[:track] = notification.annotation.track
                temp
            end
            @user[:notifications] = annotation_notifications
            # avatar_url = url_for(user.avatar)
            
            result = {:user => @user}
            render json: result
        else
            render json: user.errors.full_messages, status: 422
        end
    end

    def create
        created_user = User.new(user_params)
        if created_user.save
            login!(created_user)
            @user = created_user.slice(:id, :username)
            @user[:notifications] = []
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