class User < ApplicationRecord
    has_many :likes
    has_many :contents, through: :likes
    has_many :invites
    has_many :groups, through: :invites
    validates :username, presence: true, uniqueness: true
    #give method to return sample so dont hit same thing multiple times. 

    def User.searchByName(string)
        # byebug
        string = string.downcase
        users = User.all
        return users.select do |user|
            user.username.downcase.include? (string)
        end
    end

    def generateSample(types)
        revisedTypes = []
        if (types[0] == 'all')
            revisedTypes = ['movie','music','game','show','book','author']
        else
            revisedTypes = types.map do |plural|
                if (plural[plural.length-1] == 's')
                    plural[0..plural.length-2]
                else
                    plural
                end
            end
        end

        revisedTypes << '' 
        media = self.contents

        media = media.select do |content|
            revisedTypes.include?(content.category)
        end

        # media = media.map do |content|
        #     string = ''
        #     if content.category != ''
        #         string += "#{content.category}:"
        #     end
        #     string += content.title
        # end

        send = media.sample(3)
        # byebug
        send = send.map do |content|
            string = ''
            if content.category != ''
                string += "#{content.category}:"
            end
            string += content.title

            {id: content.id, user:self, title:string}
        end
        

        return send
    end

end