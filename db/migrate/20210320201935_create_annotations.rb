class CreateAnnotations < ActiveRecord::Migration[5.2]
  def change
    create_table :annotations do |t|
      t.text :body, null: false
      t.bigint :annotator_id, null: false
      t.string :annotator_name, null: false
      t.integer :end_index, null: false
      t.integer :start_index, null: false
      t.timestamps
    end
    add_index :annotations, :annotator_id
    add_reference :annotations, :track, index: true
  end
end
