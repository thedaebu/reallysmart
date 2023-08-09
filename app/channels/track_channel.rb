class TrackChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    if params[:commentable_type] == "Track"
        @track = Track.find_by(id: params[:parent_id])
        stream_for @track
    end
  end

  # def received(data)
  #   # TrackChannel.broadcast_to(@track, {notifications: @track.annotation_notifications})
  # end

  def unsubscribed
    stop_all_streams
  end
end