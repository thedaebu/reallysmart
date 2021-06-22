class Api::SearchesController < ApplicationController
    def index
        if params[:search]
            # name_search = params[:search]
            # if name_search.include?(" ")
            #     tags = []
            #     tag_searches = name_search.split(" ")
            #     tag_searches.each do |tag_search|
            #         tag = Tag.where("lower(name) LIKE ?", "%#{tag_search}%")
            #         tags.push(tag)
            #     end
            #     cond_text   = name_search.split.map{|w| "lower(name) LIKE ? "}.join(" OR ")
            #     cond_values = name_search.split.map{|w| "%#{w}%"}
            #     all(:conditions =>  (name_search ? [cond_text, *cond_values] : []))
            # else
            #     tags = Tag.where("lower(name) LIKE ?", "%#{name_search}%")
            # end
            
            name_search = params[:search]
            tags = Tag.where("lower(name) LIKE ?", "%#{name_search}%")
            @searches = tags
        end
        render :index
    end
end