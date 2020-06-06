import React from 'react';
import { UserContext } from '../../services/Providers/UserProvider';
import * as Styles from './styles';

function Topbar() {
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
            ? <a href="/dashboard">PAINEL</a>
            : (<a href="/login">ENTRAR</a>)}
        </div>

      </Styles.Container>
    </Styles.TopNav>

  );
}

export default Topbar;
