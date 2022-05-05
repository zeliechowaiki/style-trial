class ClothingSet < ApplicationRecord
  belongs_to :user
  has_many :items
  has_one_attached :image
end
