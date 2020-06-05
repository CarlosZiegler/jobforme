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
            ? <a href="/Dashboard">PAINEL</a>
            : (<a href="/Login">ENTRAR</a>)}
        </div>

      </Styles.Container>
    </Styles.TopNav>

  );
}

export default Topbar;
