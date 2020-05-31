# frozen_string_literal: true

module Mutations
  class BaseMutation < GraphQL::Schema::Mutation
    field :sign_in, mutation: Mutations::SignInMutation
  end
end
