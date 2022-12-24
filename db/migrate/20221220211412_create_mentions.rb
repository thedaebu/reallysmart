class CreateMentions < ActiveRecord::Migration[5.2]
  def change
    create_table :mentions do |t|
      t.bigint :mentionee_id, null: false
      t.bigint :mentioner_id, null: false
      t.boolean :read, null: false
      t.timestamps
    end
    add_index :mentions, :mentionee_id
    add_index :mentions, :mentioner_id
    add_reference :mentions, :comment, index: true
  end
end
