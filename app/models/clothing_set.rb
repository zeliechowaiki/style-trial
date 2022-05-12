class ClothingSet < ApplicationRecord
  belongs_to :user
  has_many :items, dependent: :destroy
  has_many :clothing_set_likes
  has_many :users, through: :clothing_set_likes
  has_one_attached :photo, dependent: :destroy

  # validates :photo, presence: true
  # validates :description, presence: true
  # validates :fashion, length: {greater_than: 0}
  # validates :styles, length: {greater_than: 0}

  def self.sort
    user = user.find(session[:user_id])
  end

  def set_attributes(attribute_type)
    ClothingSet.find(self.id).items.map{|item| item[attribute_type]}.uniq
  end

  def self.custom_filter(attribute_type, attribute)
    ClothingSet.all.filter{|set| set.set_attributes(attribute_type).include?(attribute)}
  end

  def list_attributes
    items = self.items.map{|item| item.item_attributes}.join(" ")
    "#{self.description} #{self.styles.map{|style| style}.join(" ")} #{self.fashion.map{|style| style}.join(" ")} #{items}"
  end

  def self.search(search)
     ClothingSet.all.filter{|set| set.list_attributes.downcase.include?(search)}
  end

end
