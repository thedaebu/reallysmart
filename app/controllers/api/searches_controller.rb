class Api::SearchesController < ApplicationController

    def index
        
        if params[:search]
            name_search = params[:search]
            @searches = Track.where("lower(title) LIKE ?", "#{name_search}")
        end

        render :index

    end

end
