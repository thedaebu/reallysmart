class Api::SearchesController < ApplicationController
    def index
        if params[:search]
            # if params[:search].includes?(" ")
            #     tags = []
            #     new_search = params[:search].split(" ")
            #     new_search.each do |name_search|
            #         tag = Tag.where("lower(name) LIKE ?", "%#{name_search}%")
            #         tags.push(tag)
            #     end
            # else
            #     name_search = params[:search]
            #     tags = Tag.where("lower(name) LIKE ?", "%#{name_search}%")
            # end
            
            name_search = params[:search]
            tags = Tag.where("lower(name) LIKE ?", "%#{name_search}%")
            @searches = tags
        end
        render :index
    end
end