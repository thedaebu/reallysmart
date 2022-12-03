class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.text :body, null: false
      t.references :commentable, polymorphic: true, null: false
      t.bigint :commenter_id, null: false
      t.string :commenter_name, null: false
      t.timestamps
    end
    add_index :comments, :commenter_id
  end
end
