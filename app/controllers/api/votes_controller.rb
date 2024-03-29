class Api::VotesController < ApplicationController
    def create
        created_vote = Vote.new(vote_params)
        if created_vote.save
            @vote = created_vote.slice(:id, :voteable_id, :voteable_type, :voter_id)

            result = {:vote => @vote}
            render json: result
        else
            render json: created_vote.errors.full_messages, status: 422
        end
    end

    def destroy
        vote = Vote.find(params[:id])
        if vote
            vote.destroy
        else
            render json: ['The vote does not exist.']
        end
    end

    private
    def vote_params
        params.require(:vote).permit(:voteable_id, :voteable_type, :voter_id)
    end
end