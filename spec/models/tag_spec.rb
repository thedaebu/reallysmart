require 'rails_helper'

RSpec.describe Tag, type: :model do
    describe "validations" do
        it "validates the presence of name, track_id" do
            should validate_presence_of(:name)
            should validate_presence_of(:track_id)   
        end
    end
    describe "associations" do
        it { should belong_to(:track) }
    end
end
