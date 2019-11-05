class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token, if: :json_request?

    def index
        render :json => User.all
    end

    def show
        @user = User.find(params[:id])
        render :json => @user
    end

    def login
        # params[:username] = 'eve'
        @username = params[:username].downcase
        @user = User.where('lower(username) = ?', @username).first
        render json: @user
    end

    def create
        @user = User.new(user_params)
        if @user.valid?
            @user.username = @user.username.downcase.capitalize
            @user.save
            render :json => @user
        else
            render :json => {alert: "Username already exists. Please choose another."}
        end
    end

    def search
        # byebug
        @users = User.searchByName(params[:search])
        render json: {users: @users}
    end

    private
    
    def user_params
        params.require(:user).permit(:username)
    end

    protected

    def json_request? 
        return request.format.json?
    end
end

