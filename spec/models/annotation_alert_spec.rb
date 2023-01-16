require 'rails_helper'

RSpec.describe AnnotationAlert, type: :model do
    describe "validations" do
        it "validates the presence of annotation_id, comment_id, read" do
            should validate_presence_of(:annotation_id)
            should validate_presence_of(:comment_id)
            should validate_presence_of(:read)
        end
        it { should allow_value(%w(true false)).for(:read) }
    end
    describe "associations" do
        it { should belong_to(:annotation) }
        it { should belong_to(:comment) }
        it { should have_one(:commenter).through(:comment).class_name("User") }
    end
end
