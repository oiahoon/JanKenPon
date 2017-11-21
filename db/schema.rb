# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171121055336) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "punch_records", force: :cascade do |t|
    t.integer "winner_punch_id", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "punches", force: :cascade do |t|
    t.integer "pattern", null: false
    t.integer "wager", default: 1, null: false
    t.integer "user_id", null: false
    t.integer "score_snapshoot", null: false
    t.integer "punch_record_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["punch_record_id"], name: "index_punches_on_punch_record_id"
    t.index ["user_id"], name: "index_punches_on_user_id"
  end

  create_table "ranks", force: :cascade do |t|
    t.string "user_id", null: false
    t.string "username", null: false
    t.integer "score", default: 0, null: false
    t.integer "win_times", default: 0, null: false
    t.integer "lose_times", default: 0, null: false
    t.integer "dog_times", default: 0, null: false
    t.integer "total_times", default: 0, null: false
    t.date "punch_date", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["punch_date", "score", "user_id"], name: "index_ranks_on_punch_date_and_score_and_user_id"
  end

  create_table "user_scores", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "total_score", default: 100, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["total_score"], name: "index_user_scores_on_total_score"
    t.index ["user_id"], name: "index_user_scores_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "qq", default: "0", null: false
    t.string "crypted_password"
    t.string "password_salt"
    t.string "persistence_token"
    t.string "perishable_token"
    t.integer "login_count", default: 0, null: false
    t.integer "failed_login_count", default: 0, null: false
    t.datetime "last_request_at"
    t.datetime "current_login_at"
    t.datetime "last_login_at"
    t.string "current_login_ip"
    t.string "last_login_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["perishable_token"], name: "index_users_on_perishable_token", unique: true
    t.index ["persistence_token"], name: "index_users_on_persistence_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
