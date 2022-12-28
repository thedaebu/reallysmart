class CreateAnnotationAlerts < ActiveRecord::Migration[5.2]
  def change
    create_table :annotation_alerts do |t|
      t.boolean :read, null: false
      t.timestamps
    end
    add_reference :annotation_alerts, :annotation, index: true
    add_reference :annotation_alerts, :comment, index: true
  end
end
