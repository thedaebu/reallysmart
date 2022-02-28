class ApplicationController < ActionController::Base
    helper_method :current_user, :logged_in?

    private
    def current_user
        return nil unless session[:session_token]
        @current_user ||= User.find_by_session_token(session[:session_token])
    end

    def logged_in?
        !!current_user
    end

    def login!(user)
        user.reset_session_token!
        session[:session_token] = user[:session_token]
        @current_user = user
    end

    def logout!
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
    end

    def ensure_logged_in
        unless logged_in?
            render json: ["Invalid Credentials"], :status => 422
        end
    end
end