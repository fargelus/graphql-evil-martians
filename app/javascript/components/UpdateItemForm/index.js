import React from 'react';
import { Mutation } from 'react-apollo';
import { UpdateItemMutation } from './operations.graphql';
import ProcessItemForm from '../ProcessItemForm';
import cs from './styles';


class UpdateItemForm extends React.Component {
  closeModalOnEscape(ev) {
    if (ev.key == 'Escape') {
      this.props.onClose();
    }
  }

  componentDidMount() {
    this.closeModalOnEscape = this.closeModalOnEscape.bind(this);
    document.addEventListener('keydown', this.closeModalOnEscape);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModalOnEscape);
  }

  render() {
    const {
      id,
      initialTitle,
      initialDescription,
      inititalImageUrl,
      onClose
    } = this.props;
    return (
      <div className={cs.overlay}>
        <div className={cs.content}>
          <Mutation mutation={UpdateItemMutation}>
            {(updateItem, { loading }) => (
              <ProcessItemForm
                inititalImageUrl={inititalImageUrl}
                initialTitle={initialTitle}
                initialDescription={initialDescription}
                buttonText="Update Item"
                loading={loading}
                onProcessItem={({ title, description, imageUrl }) => {
                  updateItem({
                    variables: {
                      id,
                      title,
                      description,
                      imageUrl
                    },

                    // adding the second argument to 'updateItem' method
                    optimisticResponse: {
                      __typename: 'Mutation',
                      updateItem: {
                        __typename: 'UpdateItemMutationPayload',
                        item: {
                          id,
                          __typename: 'Item',
                          title,
                          description,
                          imageUrl
                        }
                      }
                    }
                  });
                  onClose();
                }}
              />
            )}
          </Mutation>
          <button className={cs.close} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
}


export default UpdateItemForm;
