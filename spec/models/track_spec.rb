require 'rails_helper'

RSpec.describe Track, :type => :model do
    describe "validations" do
        it "validates the presence of artist, artwork_path, lyrics, spotify_path, title" do 
            should validate_presence_of(:artist)
            should validate_presence_of(:artwork_path)
            should validate_presence_of(:lyrics)
            should validate_presence_of(:spotify_path)
            should validate_presence_of(:title)
        end
    end
    describe "associations" do
        it { should have_many(:annotations) }
        it { should have_many(:annotation_votes).through(:annotations).class_name("Vote") }
        it { should have_many(:annotation_comments).through(:annotations).class_name("Comment") }
        it { should have_many(:annotation_comment_votes).through(:annotation_comments).class_name("Vote") }
        it { should have_many(:comments) }
        it { should have_many(:comment_votes).through(:comments).class_name("Vote") }
    end
end
