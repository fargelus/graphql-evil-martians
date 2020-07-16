# frozen_string_literal: true

class Item < ApplicationRecord
  belongs_to :user

  validates :title, presence: true, on: :create
  validates :description, length: { minimum: 10 }, allow_blank: true
end
