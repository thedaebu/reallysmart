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
        describe "password encryption" do
            it "does not save passwords to the database" do
                User.create!(username: "sunnyd", password: "password")
                sunny = User.find_by(username: "sunnyd")
                expect(sunny.password).to be(nil)
            end
            describe "it saves passwords properly" do 
                it "encrypts the password using BCrypt" do
                    expect(BCrypt::Password).to receive(:create)
                    User.new(username: "jackbruce", password: "abcdef")
                end
                it "properly sets the password reader" do
                    user = User.new(username: "jackbruce", password: "abcdef")
                    expect(user.password).to eq("abcdef")
                end
            end
        end
        describe "session token" do
            subject { User.create!(username: "lillyllama", password: "password") }
            it "assigns a session_token if one is not given" do
                expect(subject.session_token).not_to be_nil
            end
            it "resets a session token on a user" do
                old_session_token = subject.session_token
                new_session_token = subject.reset_session_token!
                expect(old_session_token).not_to eq(new_session_token)
            end
        end
        describe "finds users by credentials" do
            describe "with a valid username and password" do
                it "should return the proper user" do
                    sally = User.create(username: "sallylee", password: "password")
                    user = User.find_by_credentials("sallylee","password")
                    expect(sally.username).to eq(user.username)
                    expect(sally.password_digest).to eq(user.password_digest)
                end
            end
            describe "with an invalid username and password" do
                it "should return nil" do
                    jack = User.create(username: "jackbruce", password: "abcdef")
                    user = User.find_by_credentials("jackbruce","notthepassword")
                    expect(user).to be_nil
                end
            end
        end
    end
end
