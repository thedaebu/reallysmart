class Api::SearchesController < ApplicationController
    def index
        if params[:search]
            tag_search = params[:search]
            tags = Tag.where("lower(name) LIKE ?", "%#{tag_search}%")
            @searches = tags
        end
        render :index
    end
end