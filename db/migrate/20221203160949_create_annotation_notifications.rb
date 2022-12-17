class CreateAnnotationNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :annotation_notifications do |t|
      t.bigint :commenter_id, null: false
      t.boolean :read, null: false
      t.timestamps
    end
    add_index :annotation_notifications, :commenter_id
    add_reference :annotation_notifications, :annotation, index: true
    add_reference :annotation_notifications, :comment, index: true
  end
end
