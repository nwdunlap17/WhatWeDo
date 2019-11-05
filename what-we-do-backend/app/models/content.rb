class Content < ApplicationRecord
    has_many :likes
    has_many :users, through: :likes

    def self.addContent(user, title, category)
        contentMatches = Content.where("TITLE = '#{title}'")
        chosenContent = nil

        #Unrecognized Title
        if (contentMatches.length == 0)
            chosenContent = Content.create({title:title, category:category})
            user.contents << chosenContent
            return
        end

        if (category != '')
            #Title & category match
            contentMatches.length.times do |i|
                if (contentMatches[i].category == category)
                    chosenContent = contentMatches[i]
                    user.contents << chosenContent
                    return
                end
            end

            #Title match, but no category match
            chosenContent = Content.create({title:title, category:category})
            user.contents << chosenContent
            return
        else

            #Title match, auto category
            chosenContent = contentMatches[0]
            user.contents << chosenContent
            return
        end    

        #Should never hit here
        byebug
        return
    end

    def self.removeContent(userID, contentID)
        contentID = contentID.to_i

        chosenContent = Content.find(contentID)
        user = User.find(userID)

        usersLike = user.likes.find do |like|
            like.content_id == contentID
        end

        Like.destroy(usersLike.id)

        if(chosenContent.users.length == 0)
            Content.destroy(contentID)
        end
    end

    def verifyThis(result)
        # byebug
        self.verified = true
        if (result['Type'] == 'unknown')
            self.problem = true
            self.save
            return
        end
        
        if (self.category == '')
            self.category = result["Type"]
        end

        self.save
            #Check for Title Correctness

        if (self.title != result["Name"])
            preexistingContent = Content.where("TITLE = '#{result['Name']}'")
            if (preexistingContent.length > 0) 
                sameCategoryMatch = false

                preexistingContent.each do |content|
                    if (content.category == self.category)
                        self.users.each do |user|
                            content.users << user
                        end
                        content.users = content.users.uniq
                        self.destroy
                        return
                    end
                end

                if (!sameCategoryMatch)
                    reviseIntoNewContent(result)
                    return
                end
            else
                reviseIntoNewContent(result)
                return
            end
        end
    end

    def reviseIntoNewContent(result)
                newContent = Content.create({title: result['Name'], category: self.category})
                newContent.users = self.users
                self.destroy
    end
end
