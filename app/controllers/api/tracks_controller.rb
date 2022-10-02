class Api::TracksController < ApplicationController
    def index
        queried_tracks = Track.select("artist, artwork_path, id, spotify_path, title").all
        @tracks = {}
        queried_tracks.each {|track| @tracks[track.id] = track}

        result = {:tracks => @tracks}
        render json: result
    end

    def show
        search = params[:trackInfo]
        artist = search[0];
        title = search[1];
        @track = Track.select("artist, artwork_path, id, lyrics, spotify_path, title").where("lower(artist) LIKE ? AND lower(title) LIKE ?", artist, title)[0]
        # @track = Track.select("artist, artwork_path, id, lyrics, spotify_path, title").find(params[:id])

        queried_annotations = @track.annotations
        @annotations = {}
        queried_annotations.each do |annotation|
            temp_annotation = annotation.slice(:annotator_id, :annotator_name, :body, :end_index, :id, :start_index, :track_id)
            temp_annotation[:votes] = {}
            @annotations[annotation.id] = temp_annotation
        end

        queried_comments = @track.comments + @track.annotation_comments
        @comments = {}
        queried_comments.each do |comment|
            temp_comment = comment.slice(:body, :commentable_id, :commentable_type, :commenter_id, :commenter_name, :id, :updated_at)
            temp_comment[:votes] = {}
            @comments[comment.id] = temp_comment
        end

        queried_votes = @track.annotation_votes + @track.annotation_comment_votes + @track.comment_votes
        @votes = {}
        queried_votes.each do |vote|
            @votes[vote.id] = vote.slice(:id, :voteable_id, :voteable_type, :voter_id)
            if vote[:voteable_type] == "Annotation"
                @annotations[vote[:voteable_id]][:votes][vote.id] = vote
            else
                @comments[vote[:voteable_id]][:votes][vote.id] = vote
            end
        end

        result = {
            :track => @track,
            :annotations => @annotations,
            :comments => @comments
        }

        render json: result
    end
end