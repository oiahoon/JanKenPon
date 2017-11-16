class CreatePunches < ActiveRecord::Migration[5.1]
  def change
    create_table :punches do |t|
      t.integer :pattern, null: false
      t.integer :wager, null: false, default: 1
      t.integer :user_id, null: false
      t.integer :score_snapshoot, null: false
      t.integer :punch_record_id, null: true, default: nil

      t.timestamps
    end

    add_index :punches, :user_id
    add_index :punches, :punch_record_id
  end
end
