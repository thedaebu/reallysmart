class Api::VotesController < ApplicationController

    def show
        @vote = Vote.find(params[:id])
        render :show
    end

    def create 
        @vote = Vote.new(vote_params)
        if @vote.save
            render :show
        else
            render json: @vote.errors.full_messages, status: 422
        end
    end

    def destroy
        @vote = Vote.find(params[:id])
        if @vote
            @vote.destroy
        else
            render json: ['The vote does not exist.']
        end
    end

    private

    def vote_params
        params.require(:vote).permit(:voter_id, :voteable_type, :voteable_id)
    end

end
