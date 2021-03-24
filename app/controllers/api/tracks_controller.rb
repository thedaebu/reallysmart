class Api::TracksController < ApplicationController
    
    def index 
        @tracks = Track.all
    end

    def show
        @track = Track.includes(annotations: :annotator).find(params[:id])
    end

end
