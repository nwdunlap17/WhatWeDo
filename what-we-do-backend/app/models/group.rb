# require 'rest-client'
require 'net/http'
require 'uri'
class Group < ApplicationRecord
    has_many :invites
    has_many :users, through: :invites

    def getSuggestions(type=['all'])
        if (type.class == String)
            type = [type]
        end
        if (type == nil || type == ['null'])
            type = ['all']
        end
        # byebug
        #sample content from each user and throw it into function
        #run fetch and return output of fetch statement
        sampledContent = []

        self.users.each do |user|
            sampledContent << user.generateSample(type)
        end
        sampledContent = sampledContent.flatten
        # byebug

        query = sampledContent.map do |element|
            element[:title]
        end

        fetchResults = fetch(query,type)
        contentVerification(sampledContent,fetchResults['Similar']['Info'])
        return fetchResults
    end

    def contentVerification (sampledContent,fetchResults)
        # byebug
        sampledContent.length.times do |i|
            content = Content.find(sampledContent[i][:id])
            result = fetchResults[i]
            # byebug
            if (!content.verified)
                content.verifyThis(result)
            end
        end
    end
    # https://tastedive.com/api/similar?q=eminem%2C+pulp+fiction

    # https://tastedive.com/api/similar?k=346710-BrittanF-PHC42GKW&q=dark+crystal%2C+labyrinth&type=movies%2C+shows&verbose=1&limit=20
    def fetch(query, type)
        url = makeUrl(query, type)
        # byebug
        # response = RestClient.get(url)
        uri = URI(url)
        response = Net::HTTP.get_response(uri)
        # byebug
        @parsed_response = JSON.parse(response.body)
        return @parsed_response
    end

    def makeUrl(query, type)
        key = '346710-BrittanF-PHC42GKW'
        url = "https://tastedive.com/api/similar?k=#{key}&q="+translator(query)+"&type="+translator(type)+"&verbose=1"
        return url
    end

    # def fetch(url)
    #     response = RestClient.get(url)
    #     $parsed_response = JSON.parse(response)
    # end

    def translator(array)  
        array.map! do |string| 
            if  string != array[-1] then
                string = string.split(" ")
                string.map! do |word|
                    word != string[-1] ? word+"+" : word+"%2C+"
                end
            else
                string = string.split(" ")
                string.map! do |word|
                    word!= string[-1] ? word+"+" : word
                end
            end
        end
        array = array.flatten.join('')
        return array
    end


end
# query = ['red hot chili peppers','pulp fiction','burger king', "dark crystal","labyrinth"]
# type = ['movies','shows']
# makeUrl(query,type)  
