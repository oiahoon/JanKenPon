class CreatePunchRecords < ActiveRecord::Migration[5.1]
  def change
    create_table :punch_records do |t|
      t.integer :winner_punch_id, null: false, default: 0

      t.timestamps
    end
  end
end
