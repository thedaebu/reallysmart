class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :username, null: false
      t.timestamps
    end
    add_index :users, :session_token, unique: true
    add_index :users, :username, unique: true
  end
end
