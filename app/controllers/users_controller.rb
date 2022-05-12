class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response
      wrap_parameters format: []
  
      def index
          render json: User.all
      end
  
      def me
          user = User.find(session[:user_id])
          render json: user, status: :created, include: [:avatar, :clothing_sets]
      end

      def show
        user = User.find_by(username: params[:id])
        render json: user, status: :created, include: [:avatar, :clothing_sets]
      end
  
      def create
          user = User.create!(user_params)
          session[:user_id] = user.id
          render json: user, status: :created
      end
  
      def update
          user = User.find(session[:user_id])
          user.update!(user_params)
          render json: user
      end
  
      def destroy
          user = User.find(session[:user_id])
          session.delete :user_id
          user.destroy
          head :no_content
      end
  
      private
  
      def user_params
          params.permit(:avatar, :name, :email, :username, :password, :password_confirmation, :sizes => [], :brands => [], :styles => [], :fashion => [])
      end
  
      def unprocessable_entity_response(invalid)
          render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
      end
  
      def not_found_response
          render json: {error: "User not found"}, status: :not_found
      end
  
  end