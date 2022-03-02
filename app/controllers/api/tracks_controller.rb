class Api::TracksController < ApplicationController
    def index
        @tracks = Track.all
        render :index
    end

    def show
        @track = Track.find(params[:id])
        @annotations = @track.annotations
        comments = @track.comments
        annotation_comments = @track.annotation_comments
        annotation_votes = @track.annotation_votes
        annotation_comment_votes = @track.annotation_comment_votes
        comment_votes = @track.comment_votes
        @comments = comments + annotation_comments
        @votes = annotation_votes + annotation_comment_votes + comment_votes

        render :show
    end
end