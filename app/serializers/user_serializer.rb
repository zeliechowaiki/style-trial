class UserSerializer < ActiveModel::Serializer
  attributes :id, :avatar, :name, :username, :email, :brands, :styles, :sizes, :fashion
  has_many :clothing_sets

  def avatar
    object.avatar.service_url
  end

end
