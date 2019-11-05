class ContentsController < ApplicationController
    skip_before_action :verify_authenticity_token, if: :json_request?

    def index
        
    end

    def create
        @title = params[:content][:title]
        @content = Content.find_or_create_by(title: @title)

        if(!!params[:content][:users][0])
            @user = params[:content][:users][0]
            # VERY BAD PRACTICE, FIX LATER
            @content.users << @user
            @content.users = @content.users.uniq
            @content.save
        end
    end


    def getContent
        @user = User.find(params[:userID])        
        @contents = @user.contents
        render json: @contents
    end

    def add
        @user = User.find(params[:userID])
        Content.addContent(@user,params[:title],params[:category])
        @user.contents = @user.contents.uniq
    end

    def remove
        Content.removeContent(params[:userID],params[:contentID])
    end

    protected

    def json_request? 
        return request.format.json?
    end
end