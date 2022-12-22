class Api::SessionsController < ApplicationController
    def create
        user = User.find_by_credentials(params[:user][:username], params[:user][:password])
        if user
            login!(user)
            @user = user.slice(:id, :username)
            annotation_notifications = user.annotation_notifications.map do |notification|
                temp = notification.slice(:created_at, :id, :read)
                temp[:body] = notification.annotation.body
                temp[:commenter] = notification.commenter.username
                temp[:track] = notification.annotation.track.slice(:artist, :title)
                temp[:type] = "AnnotationNotification"
                temp
            end
            mentions = user.mentions.map do |notification|
                temp = notification.slice(:created_at, :id, :read)
                temp[:body] = notification.mentionable_type == "Annotation" ?
                    notification.mentionable.body
                    : ""
                temp[:mentionable_type] = notification.mentionable_type
                temp[:mentioner] = notification.mentioner.username
                temp[:track] = notification.mentionable_type == "Track" ?
                    notification.mentionable.slice(:artist, :title)
                    :notification.mentionable.track.slice(:artist, :title)
                temp[:type] = "Mention"
            end
            @user[:notifications] = annotation_notifications.concat(mentions)
            # avatar_url = url_for(user.avatar)

            result = {:user => @user}
            render json: result
        else
            render json: ["Invalid credentials"], status: 401
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