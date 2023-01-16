require 'rails_helper'

RSpec.describe Comment, type: :model do
    describe "validations" do
        it "validates the presence of body, commentable_id, commentable_type, commenter_id" do
            should validate_presence_of(:body)
            should validate_presence_of(:commentable_id)
            should validate_presence_of(:commentable_type)
            should validate_presence_of(:commenter_id)
        end
        it { should validate_inclusion_of(:commentable_type).in_array(["Track", "Annotation"]) }

    end
    describe "associations" do
        it { should have_one(:annotation_alert).dependent("destroy") }
        it { should belong_to(:commentable) }
        it { should belong_to(:commenter) }
        it { should have_many(:mentions).dependent("destroy") }
        it { should have_many(:votes).dependent("destroy") }
    end
end
