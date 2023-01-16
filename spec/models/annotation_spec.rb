require 'rails_helper'

RSpec.describe Annotation, :type => :model do
    describe "validations" do
        it "validates the presence of annotator_id, body, end_index, start_index, track_id" do 
            should validate_presence_of(:annotator_id)
            should validate_presence_of(:body)
            should validate_presence_of(:end_index)
            should validate_presence_of(:start_index)
            should validate_presence_of(:track_id)
        end
    end
    describe "associations" do
        it { should have_many(:alerts).dependent("destroy") }
        it { should belong_to(:annotator) }
        it { should have_many(:comments).dependent("destroy") }
        it { should belong_to(:track) }
        it { should have_many(:votes) }
    end
end