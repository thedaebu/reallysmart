require 'rails_helper'

RSpec.describe Vote, type: :model do
    describe "validations" do
        it "validates the presence of voteable_id, voteable_type, voter_id" do
            should validate_presence_of(:voteable_id)
            should validate_presence_of(:voteable_type)
            should validate_presence_of(:voter_id)
        end
        it { should validate_inclusion_of(:voteable_type).in_array(["Annotation", "Comment"]) }
    end
    describe "associations" do
        it { should belong_to(:voteable) }
    end
end
