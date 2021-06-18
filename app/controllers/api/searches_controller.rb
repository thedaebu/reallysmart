class Api::SearchesController < ApplicationController
    def index
        if params[:search]
            name_search = params[:search]
            titles = Track.where("lower(title) LIKE ?", "%#{name_search}%")
            artists = Track.where("lower(artist) LIKE ?", "%#{name_search}%")
            @searches = titles + artists
        end
        render :index
    end
end