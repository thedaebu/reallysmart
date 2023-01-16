require 'rails_helper'

RSpec.describe User, type: :model do
    subject {
        User.new(
            password: "reallysmart",
            username: "reallysmart"
        )
    }

    describe "validations" do
        it "validates the presence of password_digest, session_token, username" do
            should validate_presence_of(:password_digest)
            should validate_presence_of(:session_token)
            should validate_presence_of(:username)
        end
        it "allows nil, requires length to be 6 to 20, is formatted with only number and letters" do
            should allow_value(nil).for(:password)
            should validate_length_of(:password).is_at_least(6).is_at_most(20)
            should allow_value("Aa1Aa1").for(:password)
        end
        it "requires length to be 6 to 20, is formatted with only number and letters, requires uniqueness for username" do
            should validate_length_of(:username).is_at_least(6).is_at_most(20)
            should allow_value("Aa1Aa1").for(:username)
            should validate_uniqueness_of(:username)
        end
    end
    describe "associations" do
        it { should have_many(:annotations) }
        it { should have_many(:annotation_alerts).through(:annotations).class_name("AnnotationAlert") }
        it { should have_many(:comments) }
        it { should have_many(:mentions) }
        it { should have_many(:mentioneds) }
        it { should have_many(:votes) }
    end
    describe "methods" do
        
    end
end
