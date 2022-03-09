class Api::TracksController < ApplicationController
    def index
        tracks = Track.select("artist, artwork_path, id, title").all

        result = {:tracks => tracks}
        render json: result
    end

    def show
        @track = Track.select("artist, artwork_path, id, lyrics, title").find(params[:id])

        queried_annotations = @track.annotations.select("annotator_id, annotator_name, body, end_index, id, start_index, track_id")
        @annotations = {}
        queried_annotations.each {|annotation| @annotations[annotation.id] = annotation}
        
        queried_comments = @track.comments + @track.annotation_comments
        @comments = {}
        queried_comments.each {|comment| @comments[comment.id] = comment.slice(:body, :commentable_id, :commentable_type, :commenter_id, :commenter_name, :id, :updated_at)}
        
        queried_votes = @track.annotation_votes + @track.annotation_comment_votes + @track.comment_votes
        @votes = {}
        queried_votes.each {|vote| @votes[vote.id] = vote.slice(:id, :voteable_id, :voteable_type, :voter_id)} 

        result = {
            :track => @track,
            :annotations => @annotations,
            :comments => @comments,
            :votes => @votes
        }
        render json: result
    end
end