class Api::TracksController < ApplicationController
    def index
        tracks = Track.select("artist, artwork_path, id, title, spotify_path").all
        @tracks = {}
        tracks.each {|track| @tracks[track.id] = track}

        result = {:tracks => @tracks}
        render json: result
    end

    def show
        @track = Track.select("artist, artwork_path, id, lyrics, title, spotify_path").find(params[:id])

        annotations = @track.annotations.select("annotator_id, annotator_name, body, end_index, id, start_index, track_id")
        @annotations = {}
        annotations.each {|annotation| @annotations[annotation.id] = annotation}

        comments = @track.comments + @track.annotation_comments
        @comments = {}
        comments.each {|comment| @comments[comment.id] = comment.slice(:body, :commentable_id, :commentable_type, :commenter_id, :commenter_name, :id, :updated_at)}
        
        votes = @track.annotation_votes + @track.annotation_comment_votes + @track.comment_votes
        @votes = {}
        votes.each {|vote| @votes[vote.id] = vote.slice(:id, :voteable_id, :voteable_type, :voter_id)} 

        result = {
            :track => @track,
            :annotations => @annotations,
            :comments => @comments,
            :votes => @votes
        }
        render json: result
    end
end