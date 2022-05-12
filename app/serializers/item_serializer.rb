class ItemSerializer < ActiveModel::Serializer
  attributes :id, :clothing_set_id, :photo, :item_type, :description, :size, :brand, :condition, :color, :value

  def photo
    object.photo.service_url
  end
end
