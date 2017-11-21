class CreateRanks < ActiveRecord::Migration[5.1]
  def change
    create_table :ranks do |t|
      t.string :user_id, null: false
      t.string :username, null: false
      t.integer :score, null: false, default: 0
      t.integer :win_times, null: false, default: 0
      t.integer :lose_times, null: false, default: 0
      t.integer :dog_times, null: false, default: 0
      t.integer :total_times, null: false, default: 0
      t.date :punch_date, null: false

      t.timestamps
    end

    add_index :ranks, [:punch_date, :score, :user_id]
  end
end
