class CreateVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :votes do |t|
      t.references :voteable, polymorphic: true, null: false
      t.bigint :voter_id, null: false
      t.timestamps
    end
    add_index :votes, :voter_id
  end
end
