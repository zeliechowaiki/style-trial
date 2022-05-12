class ClothingSetSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :photo, :description, :fashion, :styles, :sizes, :colors, :total_price, :avatar, :username
  has_many :items
  has_many :clothing_set_likes

  def photo
    object.photo.service_url
  end

  def avatar
    object.user.avatar.service_url
  end

  def username
    object.user.username
  end

  def total_price
    object.items.sum(&:value)
  end

  def sizes
    object.items.map{|item| item.size}.uniq
  end

  def colors
    object.items.map{|item| item.color}.uniq
  end

end
