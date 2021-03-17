class Api::TracksController < ApplicationController
    
    def index 
        @tracks = Track.all
    end

    def show
        @tracks = Track.find(params[:id])
    end

end
