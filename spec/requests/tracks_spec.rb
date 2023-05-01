require 'rails_helper'

RSpec.describe 'Api::TracksController', type: :request do
    before(:all) do 
        @track = Track.create!(artist: 'testartist', title: 'testtitle', lyrics: 'testlyrics', artwork_path: 'testartwork_path', spotify_path: 'testspotify_path')
    end
    after(:all) do
        @track.destroy
    end
    describe 'Get /api/tracks' do
        before(:all) do
            get '/api/tracks'
            @response = response
            @json = JSON.parse(response.body)['tracks']["#{@track.id}"]
        end
        it 'can reach the url' do
            expect(@response.status).to eq(200)
        end
        it 'returns something' do
            expect(@json['title']).to eq(@track[:title])
        end
    end
    # describe 'Get /api/tracks/:id' do
        # before(:all) do
        #     print("/api/tracks/#{@track.id.to_s}")
        #     get "/api/tracks/#{@track.id.to_s}"
        #     @response = response
            # @json = JSON.parse(response.body)
        # end
        # it 'can reach the url' do
        #     expect(@response.status).to eq(200)
            # print("/api/tracks/#{@track.id}")
        # end
    #     if 'returns somethingg' do
    #         expect(@json['title']).to eq('something')
    #     end
    # end
end