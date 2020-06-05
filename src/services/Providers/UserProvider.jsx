/* eslint-disable react/destructuring-assignment */
import React, { Component, createContext } from 'react';
import { auth, generateUserDocument } from '../FireBase';


export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    user: null,
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);

      this.setState({ user });
    });
  };

  render() {
    const { user } = this.state;

    return (
      <UserContext.Provider value={user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
