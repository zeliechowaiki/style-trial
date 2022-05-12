class ClothingSetsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response
  wrap_parameters format: []
  
  def index
    if !params[:q]
      all_sets = ClothingSet.all.filter{|set| set.user_id != session[:user_id]}
    else
      all_sets = ClothingSet.search(params[:q])
    end
    if !params[:fashion] || params[:fashion].length == 0
      fashion_sets = ClothingSet.all
    else
        fashion_sets = params[:fashion].map{|f| ClothingSet.all.filter{|set| set.fashion.include?(f)}}.flatten.uniq
    end
    if !params[:sizes] || params[:sizes].length == 0
        size_sets = ClothingSet.all
    else
        size_sets = params[:sizes].map{|size| ClothingSet.custom_filter('size',size)}.flatten.uniq
    end
    if !params[:colors] || params[:colors].length == 0
      color_sets = ClothingSet.all
  else
      color_sets = params[:colors].map{|color| ClothingSet.custom_filter('color',color)}.flatten.uniq
  end
    filtered_sets = (size_sets & all_sets & fashion_sets & color_sets)
    if !params[:sort] || params[:sort] == "recent"
      render json: filtered_sets.sort_by(&:created_at).reverse
    elsif params[:sort] == "all-popular"
      render json: filtered_sets.sort_by{|set| -set.clothing_set_likes.length}
    elsif params[:sort] == "low-price"
      render json: filtered_sets.sort_by{|set| set.items.sum(&:value)}
    elsif params[:sort] == "high-price"
      render json: filtered_sets.sort_by{|set| -set.items.sum(&:value)}
    end
  end
  
  def show
    set = ClothingSet.find(params[:id])
    render json: set, status: :created, include: [:clothing_set_likes, :items]
  end

  def create
    set = ClothingSet.create!(set_params)
    render json: set, status: :created
  end

  def update
    user = User.find(session[:user_id])
    user.update!(user_params)
    render json: user
  end

  def destroy
    set = ClothingSet.find(params[:id])
    set.destroy
    head :no_content
  end

  def popular
    render json: ClothingSet.all.sort_by{|set| -set.clothing_set_likes.length}[0..3]
  end

  def likes
    likes = ClothingSetLike.all.filter{|like| like.user_id == Integer(params[:user_id])}
    sets = likes.map {|like| like.clothing_set}
    render json: sets
  end

  def matches
    liked_accounts = User.find(session[:user_id]).liked_accounts
    liked_me = User.find(session[:user_id]).liked_me
    account_matches = (liked_accounts & liked_me)
    if account_matches.length == 0
      render json: []
    else
      account_match = account_matches.first
      set_for_me = User.find(session[:user_id]).liked_sets.find{|set| set.user_id == account_match.id}
      set_for_you = account_match.liked_sets.find{|set| set.user_id == session[:user_id]}
      render json: [set_for_me, set_for_you]
    end
  end

  private
    
  def set_params
      params.permit(:user_id, :photo, :description, :styles => [], :fashion => [], :sizes => [], :colors => [])
  end

  def unprocessable_entity_response(invalid)
      render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

  def not_found_response
      render json: {error: "User not found"}, status: :not_found
  end
  
end
