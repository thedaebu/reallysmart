class CreateAnnotations < ActiveRecord::Migration[5.2]
  def change
    create_table :annotations do |t|
      t.text :body, null: false
      t.integer :annotator_id, null: false
      t.string :annotator_name, null: false
      t.integer :end_index, null: false
      t.integer :start_index, null: false
      t.integer :track_id, null: false
      t.timestamps
    end
    add_index :annotations, :annotator_id
    add_index :annotations, :track_id
  end
end
