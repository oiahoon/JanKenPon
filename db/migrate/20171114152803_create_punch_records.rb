class CreatePunchRecords < ActiveRecord::Migration[5.1]
  def change
    create_table :punch_records do |t|
      t.integer :punch_id, null: false
      t.integer :rival_punch_id, null: false
      t.string :result, null: false, default: ''

      t.timestamps
    end

    add_index :punch_records, :punch_id
    add_index :punch_records, :rival_punch_id
  end
end
