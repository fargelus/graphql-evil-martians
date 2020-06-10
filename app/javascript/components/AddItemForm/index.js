import React from 'react';
import { Mutation } from 'react-apollo';
import { AddItemMutation } from './operations.graphql';
import ProcessItemForm from '../ProcessItemForm';
import cs from './styles';

const AddItemForm = () => (
  <Mutation mutation={AddItemMutation}>
    {(addItem, { loading }) => (
      <ProcessItemForm
        buttonText="Add item"
        loading={loading}
        onProcessItem={({ title, description, imageUrl }) =>
          addItem({
            variables: {
              title,
              description,
              imageUrl
            }
          })
        }
      />
    )}
  </Mutation>
);

export default AddItemForm;
