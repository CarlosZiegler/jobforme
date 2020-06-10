/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { UserContext } from '../../services/Providers/UserProvider';
import * as Styles from './styles';

function Topbar(props) {
  const { functionTopbar } = props;
  const user = React.useContext(UserContext);
  return (
    <Styles.TopNav>
      <Styles.Container>
        <div className="logo">
          <a href="/">
            <h1>JobForMe</h1>
          </a>
        </div>
        <div className="menu">
          {user
            ? <span className="topbar-button" onClick={() => functionTopbar()}>Logout</span>
            : (<a href="/login">Login</a>)}
        </div>
      </Styles.Container>
    </Styles.TopNav>
  );
}

export default Topbar;
