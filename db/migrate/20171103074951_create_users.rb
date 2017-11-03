class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :encrypted_password
      t.string :salt
      t.string :email
      t.integer :qq
      t.boolean :in_group

      t.timestamps
    end
  end
end
