class CreateClothingSetLikes < ActiveRecord::Migration[6.1]
  def change
    create_table :clothing_set_likes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :clothing_set, null: false, foreign_key: true

      t.timestamps
    end
  end
end
