class CreateVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :votes do |t|
      t.integer :voter_id, null: false
      t.references :voteable, polymorphic: true, null: false

      t.timestamps
    end
    add_index :votes, :voter_id
    add_index :comments, :commenter_id
  end
end
