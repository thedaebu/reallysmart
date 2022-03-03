class Api::TracksController < ApplicationController
    def index
        @tracks = Track.all
        render :index
    end

    def show
        @track = Track.find(params[:id])
        @annotations = @track.annotations
        @comments = @track.comments + @track.annotation_comments
        @votes = @track.annotation_votes + @track.annotation_comment_votes + @track.comment_votes
        render :show
    end
end