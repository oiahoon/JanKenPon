class CreateUserScores < ActiveRecord::Migration[5.1]
  def change
    create_table :user_scores do |t|
      t.integer :user_id, null: false
      t.integer :total_score, null: false, default: 100
      t.integer :freeze_score, null: false, default: 0
      t.datetime :happened_date

      t.timestamps
    end

    add_index :user_scores, :happened_date
  end
end
