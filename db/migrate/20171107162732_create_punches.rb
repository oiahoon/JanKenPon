class CreatePunches < ActiveRecord::Migration[5.1]
  def change
    create_table :punches do |t|
      t.integer :pattern, null: false
      t.integer :wager, null: false, default: 1
      t.integer :user_id, null: false
      t.integer :score_snapshoot, null: false
      t.integer :rival_id, null: false, default: 0
      t.integer :rival_record_id, null: false, default: 0
      t.string :result, null: false, default: ''

      t.timestamps
    end

    add_index :punches, :user_id
  end
end
