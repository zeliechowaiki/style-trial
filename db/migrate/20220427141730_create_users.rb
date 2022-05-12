class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :username
      t.string :password_digest
      t.string :bio
      t.string :sizes, array: true
      t.string :brands, array: true
      t.string :styles, array: true
      t.string :fashion, array: true

      t.timestamps
    end
  end
end
