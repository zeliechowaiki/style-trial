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

  def use_serialize
    # :id, :user_id, :photo, :description, :fashion, :styles, :sizes, :colors, :total_price, :avatar, :username
    {
      id: self.id, 
      user_id: self.user_id, 
      photo: self.photo.service_url,
      total_price: self.items.sum(&:value),
      name: self.user.name,
      username: self.user.username,
      email: self.user.email
    }
  end

  def matching_set
    me = self.user
    value = self.items.sum(&:value)
    users_liked_me = self.clothing_set_likes.map{|like| like.user}.flatten.uniq
    my_liked_sets = me.clothing_set_likes.map{|like| like.clothing_set}
    all_matches = my_liked_sets.filter{|set| users_liked_me.include?(set.user)}
    best_match = all_matches.sort_by{|match|( match.items.sum(&:value) - value).abs}.first
    if all_matches.length == 0
      nil
    else
      {my_set: self.use_serialize, their_set: best_match.use_serialize}
    end
  end

end
