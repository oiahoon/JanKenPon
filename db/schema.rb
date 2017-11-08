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

ActiveRecord::Schema.define(version: 20171107165407) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "punches", force: :cascade do |t|
    t.integer "pattern", null: false
    t.integer "wager", default: 1, null: false
    t.integer "user_id", null: false
    t.integer "rival_id", default: 0, null: false
    t.string "result", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_punches_on_user_id"
  end

  create_table "user_scores", force: :cascade do |t|
    t.integer "total_score", default: 100, null: false
    t.integer "freeze_score", default: 0, null: false
    t.datetime "happened_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["happened_date"], name: "index_user_scores_on_happened_date"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "encrypted_password"
    t.string "salt"
    t.string "email"
    t.integer "qq"
    t.boolean "in_group"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end