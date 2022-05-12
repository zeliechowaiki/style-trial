class ItemsController < ApplicationController

  def create
    item = Item.create!(item_params)
    render json: item, status: :created
  end

  def index
    render json: Item.all
  end

  private
  
      def item_params
          params.permit(:clothing_set_id, :photo, :item_type, :description, :color, :brand, :size, :condition, :value)
      end

end
