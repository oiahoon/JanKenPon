class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :qq, null: false, default: 0

      t.string :crypted_password
      t.string :password_salt

      t.string :persistence_token
      t.index  :persistence_token, unique: true

      t.string :perishable_token
      t.index  :perishable_token, unique: true


      t.integer  :login_count, default: 0, null: false
      t.integer  :failed_login_count, default: 0, null: false
      t.datetime :last_request_at
      t.datetime :current_login_at
      t.datetime :last_login_at
      t.string   :current_login_ip
      t.string   :last_login_ip

      t.timestamps
    end

    add_index :users, :username, unique: true
  end
end
