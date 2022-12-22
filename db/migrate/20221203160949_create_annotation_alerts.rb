class CreateAnnotationAlerts < ActiveRecord::Migration[5.2]
  def change
    create_table :annotation_alerts do |t|
      t.bigint :commenter_id, null: false
      t.boolean :read, null: false
      t.timestamps
    end
    add_index :annotation_alerts, :commenter_id
    add_reference :annotation_alerts, :annotation, index: true
    add_reference :annotation_alerts, :comment, index: true
  end
end
