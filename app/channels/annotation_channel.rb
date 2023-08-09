class AnnotationChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    if params[:commentable_type] == "Annotation"
        @annotation = Annotation.find_by(id: params[:parent_id])
        stream_for @annotation
    end
  end

  # def received(data)
  #   # AnnotationChannel.broadcast_to(@annotation, {notifications: @annotation.annotation_notifications})
  # end

  def unsubscribed
    stop_all_streams
  end
end