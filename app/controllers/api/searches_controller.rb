class Api::SearchesController < ApplicationController
    def index
        if params[:search]
            name_search = params[:search]
            tags = Tag.where("lower(name) LIKE ?", "%#{name_search}%")
            @searches = tags
        end
        render :index
    end
end