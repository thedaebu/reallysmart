class Api::SearchesController < ApplicationController
    def index
        if params[:search]
            tag_search = params[:search]
            tags = Tag.where("lower(name) LIKE ?", "%#{tag_search}%")
            @searches = {}
            tags.each{|tag| @searches[tag.track.id] = tag.track.slice(:artist, :artwork_path, :id, :title)}
            
            result = {:searches => @searches}
            render json: result
        end
    end
end