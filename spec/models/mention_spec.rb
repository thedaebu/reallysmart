require 'rails_helper'

RSpec.describe Mention, type: :model do
    describe "validations" do
        it "validates the presence comment_id, mentionee_id, mentioner_id, read" do
            should validate_presence_of(:comment_id)
            should validate_presence_of(:mentionee_id)
            should validate_presence_of(:mentioner_id)
            should validate_presence_of(:read)
        end
        it { should allow_value(%w(true false)).for(:read) }
    end
    describe "associations" do
        it { should belong_to(:comment) }
        it { should belong_to(:mentionee) }
        it { should belong_to(:mentioner) }
    end
end
