import React from 'react';
import { UserContext } from '../../services/Providers/UserProvider';


function Topbar() {
  const user = React.useContext(UserContext);
  return (
    <header data-testid="topbar" className="topbar">
      <div className="container">
        <a href="/" className="topbar__logo">
          <h1>#Jobforme</h1>
        </a>
        {user
          ? <a href="/Login">Painel</a>
          : <a href="/Login">Login</a>}
      </div>
    </header>
  );
}

export default Topbar;
