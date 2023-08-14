class TrackChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    @track = Track.find(params[:track_id])
    stream_for @track
  end

  # def received(data)
  #   # TrackChannel.broadcast_to(@track, {notifications: @track.annotation_notifications})
  # end

  def unsubscribed
    stop_all_streams
  end
end