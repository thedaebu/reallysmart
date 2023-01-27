# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_01_27_024605) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "annotation_alerts", force: :cascade do |t|
    t.boolean "read", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "annotation_id"
    t.bigint "comment_id"
    t.index ["annotation_id"], name: "index_annotation_alerts_on_annotation_id"
    t.index ["comment_id"], name: "index_annotation_alerts_on_comment_id"
  end

  create_table "annotations", force: :cascade do |t|
    t.text "body", null: false
    t.bigint "annotator_id", null: false
    t.integer "end_index", null: false
    t.integer "start_index", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "track_id"
    t.index ["annotator_id"], name: "index_annotations_on_annotator_id"
    t.index ["track_id"], name: "index_annotations_on_track_id"
  end

  create_table "comments", force: :cascade do |t|
    t.text "body", null: false
    t.string "commentable_type", null: false
    t.bigint "commentable_id", null: false
    t.bigint "commenter_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["commentable_type", "commentable_id"], name: "index_comments_on_commentable_type_and_commentable_id"
    t.index ["commenter_id"], name: "index_comments_on_commenter_id"
  end

  create_table "mentions", force: :cascade do |t|
    t.bigint "mentionee_id", null: false
    t.bigint "mentioner_id", null: false
    t.boolean "read", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "comment_id"
    t.index ["comment_id"], name: "index_mentions_on_comment_id"
    t.index ["mentionee_id"], name: "index_mentions_on_mentionee_id"
    t.index ["mentioner_id"], name: "index_mentions_on_mentioner_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "track_id"
    t.index ["track_id"], name: "index_tags_on_track_id"
  end

  create_table "tracks", force: :cascade do |t|
    t.string "artist", null: false
    t.string "artwork_path", null: false
    t.text "lyrics", null: false
    t.string "spotify_path", null: false
    t.string "title", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "username", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "votes", force: :cascade do |t|
    t.string "voteable_type", null: false
    t.bigint "voteable_id", null: false
    t.bigint "voter_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["voteable_type", "voteable_id"], name: "index_votes_on_voteable_type_and_voteable_id"
    t.index ["voter_id"], name: "index_votes_on_voter_id"
  end

end
