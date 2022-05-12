class ClothingSetLikeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :clothing_set_id, :user_name, :user_username, :set_name, :avatar

  def user_name
    object.user.name
  end

  def user_username
    object.user.username
  end

  def set_name
    object.clothing_set.description
  end

  def avatar
    object.user.avatar.service_url
  end

end
