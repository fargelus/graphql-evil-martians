import React, { useRef } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Me, SignMeIn } from './operations.graphql';
import cs from './styles';


const signOut = () => {
  localStorage.removeItem('mlToken');
  location.reload();
}

const UserInfo = () => {
  return(
    <div className={cs.panel}>
      <Query query={Me}>
        {({ data, loading }) => {
          if (loading) return '...loading';
          if (!data || !data.me) {
            return <SignInUser />
          }

          const { fullName } = data.me;
          return (
            <div className={cs.info}>
              😈 {fullName} &nbsp;
              <button className={cs.button}
                      type="button"
                      onClick={signOut}
                      >Sign Out</button>
            </div>
          );
        }}
      </Query>
    </div>
  );
};

const SignInUser = () => {
  const input = useRef(null);

  return (
    <Mutation
      mutation={SignMeIn}
      update={(cache, { data: { signIn } }) => {
        cache.writeQuery({
          query: Me,
          data: { me: signIn.user }
        });
      }}
      >
      {(signIn, { loading: authenticating, error }) =>
        authenticating ? (
          '...'
        ) : (
          <div className={cs.signIn}>
            <form onSubmit={event => {
              event.preventDefault();
              signIn({
                variables: { email: input.current.value }
              }).then(({ data: {signIn: { token }} }) => {
                if (token) {
                  localStorage.setItem('mlToken', token);
                }
              });
            }}>
              <input
                ref={input}
                type="email"
                className={cs.input}
                placeholder="your email"
              />
              <input type="submit"
                     className={cs.button}
                     value="Sign in"
              />
              {error && <span>{error.message}</span>}
            </form>
          </div>
        )
      }
    </Mutation>
  );
};


export default UserInfo;
