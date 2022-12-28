class NotificationChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    @user = User.find_by(id: params[:user_id])
    stream_for @user
  end

  # def received(data)
  #   # NotificationChannel.broadcast_to(@user, {notifications: @user.annotation_notifications})
  # end

  def unsubscribed
    stop_all_streams
  end
end