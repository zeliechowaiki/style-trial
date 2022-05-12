class CreateClothingSets < ActiveRecord::Migration[6.1]
  def change
    create_table :clothing_sets do |t|
      t.references :user, null: false, foreign_key: true
      t.string :description
      t.string :styles, array: true
      t.string :fashion, array: true

      t.timestamps
    end
  end
end
