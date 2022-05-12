class Item < ApplicationRecord
  has_one_attached :photo
  belongs_to :clothing_set

  def item_attributes
    "#{self.description} #{self.color} #{self.size} #{self.brand} #{self.item_type}"
  end

end
