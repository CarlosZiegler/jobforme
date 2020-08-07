import React from 'react';

function Topbar() {
  return (
    <header data-testid="topbar" className="topbar">
      <div className="container">
        <a href="/" className="topbar__logo">
          <h1>#SiteDoBem</h1>
        </a>
      </div>
    </header>
  );
}

export default Topbar;
