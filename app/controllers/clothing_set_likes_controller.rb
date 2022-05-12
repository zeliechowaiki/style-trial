class ClothingSetLikesController < ApplicationController

  def index
    render json: ClothingSetLike.all
  end

  def create
    like = ClothingSetLike.create!(like_params)
    render json: like, status: :created
  end

  def destroy
    like = ClothingSetLike.find(params[:id])
    like.destroy
    head :no_content
  end

  def notifications
    sets = User.find(session[:user_id]).clothing_sets
    likes = sets.map{|set| set.clothing_set_likes}.flatten
    render json: likes
  end

  private

  def like_params
    params.permit(:id, :clothing_set_id, :user_id)
  end

end
