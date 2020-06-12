import React from 'react';
import { Mutation } from 'react-apollo';
import { AddItemMutation } from './operations.graphql';
import ProcessItemForm from '../ProcessItemForm';
import cs from './styles';
import { LibraryQuery } from '../Library/operations.graphql';


const AddItemForm = () => (
  <Mutation mutation={AddItemMutation}>
    {(addItem, { loading }) => (
      <ProcessItemForm
        buttonText="Add item"
        loading={loading}
        // Update library query after Mutation will be finished
        onProcessItem={({ title, description, imageUrl }) =>
          addItem({
            variables: {
              title,
              description,
              imageUrl
            },

            // adding the second argument to 'addItem' method
            update: (cache, { data: { addItem } }) => {
              const item = addItem.item;
              if (item) {
                const currentItems = cache.readQuery({ query: LibraryQuery });
                cache.writeQuery({
                  query: LibraryQuery,
                  data: {
                    items: [item].concat(currentItems),
                  },
                });
              }
            },
          })
        }
      />
    )}
  </Mutation>
);

export default AddItemForm;
