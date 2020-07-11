# frozen_string_literal: true

module Mutations
  class AddItemMutation < Mutations::BaseMutation
    argument :attributes, Types::ItemAttributes, required: true

    field :item, Types::ItemType, null: true
    field :errors, [String], null: false

    def resolve(attributes:)
      check_authentication!

      item = Item.new(attributes.merge(user: context[:current_user]))

      if item.save
        MartianLibrarySchema.subscriptions.trigger('itemAdded', {}, item)
        { item: item }
      else
        { errors: item.errors.full_messages }
      end
    end
  end
end
