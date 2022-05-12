class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :item_type
      t.string :description
      t.string :size
      t.string :brand
      t.string :condition
      t.integer :value
      t.string :color
      t.references :clothing_set, null: false, foreign_key: true

      t.timestamps
    end
  end
end
