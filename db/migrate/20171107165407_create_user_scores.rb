class CreateUserScores < ActiveRecord::Migration[5.1]
  def change
    create_table :user_scores do |t|
      t.integer :user_id, null: false
      t.integer :total_score, null: false, default: 100

      t.timestamps
    end

    add_index :user_scores, :user_id
    add_index :user_scores, :total_score
  end
end
