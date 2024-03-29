class CreateTracks < ActiveRecord::Migration[5.2]
  def change
    create_table :tracks do |t|
      t.string :artist, null: false
      t.string :artwork_path, null: false
      t.text :lyrics, null: false
      t.string :spotify_path, null: false
      t.string :title, null: false
      t.timestamps
    end
  end
end
