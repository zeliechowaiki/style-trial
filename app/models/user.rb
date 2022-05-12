class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true
  # validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :username, uniqueness: true

  has_one_attached :avatar, dependent: :destroy
  has_many :clothing_sets
  has_many :clothing_set_likes

  def liked_accounts
    user_likes = self.clothing_set_likes
    liked_sets = user_likes.map{|like| like.clothing_set}
    liked_sets.map{|set| set.user}.uniq
  end

  def liked_me
    likes = self.clothing_sets.map{|set| set.clothing_set_likes}.flatten
    likes.map{|like| like.user}.uniq
  end

  def liked_sets
    self.clothing_set_likes.map{|like| like.clothing_set}
  end
  
end