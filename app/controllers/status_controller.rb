class StatusController < ApplicationController
    def index
        render json: "Server is running.", status: 200
    end
end